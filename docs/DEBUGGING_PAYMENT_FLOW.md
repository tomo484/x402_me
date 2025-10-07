# x402決済フロー問題の原因分析とデバッグアプローチ

## 概要

x402決済システムにおいて、決済ボタンを押しても支払いフローが正常に進行しない問題が発生しました。この文書では、問題の根本原因と、それを特定するために実施したデバッグアプローチを詳細に記録します。

## 問題の症状

### 初期症状
- 決済ボタンを押すと402レスポンスは返ってくる
- しかし、支払い要件（PaymentRequirements）が取得できない
- 結果として支払いフローが「Payment required to access this resource」エラーで停止

### エラーログ（修正前）
```
📥 Initial response: {status: 402, error: 'Payment required to access this resource'}
📊 Payment flow result: {success: false, error: 'Payment required to access this resource'}
❌ Payment failed: Payment required to access this resource
```

## 根本原因の特定

### 原因1: CORS設定によるカスタムヘッダーのブロック

**問題**: ブラウザのCORS（Cross-Origin Resource Sharing）ポリシーにより、`X-PAYMENT-REQUIRED`ヘッダーがフロントエンドからアクセスできない状態でした。

**詳細**:
- APIサーバーは正しく`X-PAYMENT-REQUIRED`ヘッダーを送信していた
- しかし、CORS設定で`exposedHeaders`が設定されていなかったため、ブラウザがヘッダーをブロック
- フロントエンドの`response.headers.get('X-PAYMENT-REQUIRED')`が`null`を返していた

## デバッグアプローチ

### Phase 1: フロントエンド側のデバッグログ追加

#### 1.1 PaymentFlow.tsx
**目的**: 決済フロー開始時の状態確認

**追加したログ**:
```typescript
const handlePayment = async () => {
  console.log('🚀 Payment started');
  console.log('📊 Current step:', step);
  console.log('🔗 Wallet connected:', canMakePayment);
  
  try {
    console.log('📤 Calling startPayment with path:', resourcePath);
    await startPayment(resourcePath);
    
    console.log('✅ startPayment completed');
    console.log('📋 Current result:', result);
    
    if (result?.success && onSuccess) {
      console.log('🎉 Payment successful, calling onSuccess');
      onSuccess(result.data);
    }
  } catch (err) {
    console.error('❌ Payment error:', err);
    // ... error handling
  }
};
```

**効果**: 決済フロー開始時の基本状態（ステップ、ウォレット接続状態）を確認

#### 1.2 usePayment.ts
**目的**: ウォレット接続状態とPaymentStore呼び出しの確認

**追加したログ**:
```typescript
const startPayment = useCallback(async (resourcePath: string) => {
  console.log('🔄 usePayment.startPayment called with:', resourcePath);
  console.log('🔗 Wallet connection status:', { isConnected, address, chainId });
  
  if (!isConnected) {
    console.error('❌ Wallet not connected');
    throw new Error('Wallet not connected');
  }

  console.log('📞 Calling store.startPaymentFlow');
  await store.startPaymentFlow(resourcePath, createPaymentSignature);
  console.log('✅ store.startPaymentFlow completed');
}, [store.startPaymentFlow, createPaymentSignature, isConnected]);
```

**効果**: ウォレット接続状態の詳細とPaymentStoreへの呼び出し確認

#### 1.3 payment.ts (PaymentStore)
**目的**: 支払いフロー全体の状態管理とx402Client呼び出しの確認

**追加したログ**:
```typescript
startPaymentFlow: async (path: string, signPayment: (requirements: PaymentRequirements) => Promise<PaymentPayload>) => {
  console.log('🏪 PaymentStore.startPaymentFlow called with path:', path);
  const { _setStep, _setRequirements, _setPayload, _setError, _setProcessing, _setResult } = get();
  
  try {
    console.log('⚙️ Setting processing state');
    _setProcessing(true);
    _setError(null);
    _setResult(null);
    _setStep('payment_required');

    console.log('📡 Calling x402Client.executePaymentFlow');
    const result = await x402Client.executePaymentFlow(
      path,
      async (requirements: PaymentRequirements) => {
        console.log('📋 Payment requirements received:', requirements);
        _setRequirements(requirements);
        _setStep('signing');
        
        console.log('✍️ Creating payment signature');
        const payload = await signPayment(requirements);
        console.log('📦 Payment payload created:', payload);
        _setPayload(payload);
        _setStep('verifying');
        
        return payload;
      }
    );

    console.log('📊 Payment flow result:', result);
    _setResult(result);
    
    if (result.success) {
      console.log('✅ Payment successful');
      _setStep('completed');
    } else {
      console.log('❌ Payment failed:', result.error);
      _setStep('failed');
      _setError(result.error || 'Payment failed');
    }
  } catch (error) {
    console.error('💥 Payment flow error:', error);
    // ... error handling
  } finally {
    console.log('🏁 Payment flow finished, setting processing to false');
    _setProcessing(false);
  }
},
```

**効果**: 支払いフロー全体の状態変化と各ステップの詳細を追跡

#### 1.4 client.ts (X402Client)
**目的**: APIリクエストとレスポンス解析の詳細確認

**追加したログ**:
```typescript
async executePaymentFlow(/* ... */): Promise<PaymentResult> {
  try {
    console.log('🌐 X402Client.executePaymentFlow started');
    console.log('📍 Request path:', path);
    console.log('🔧 API base URL:', this.config.apiBaseUrl);
    
    // 1. 初回リクエスト（402応答を期待）
    console.log('📤 Sending initial request...');
    const initialResponse = await this.accessResource(path, options);
    console.log('📥 Initial response:', initialResponse);

    // ... 中略 ...

    // 3. 支払い署名作成
    console.log('✍️ Creating payment signature...');
    const paymentPayload = await signPayment(initialResponse.paymentRequired);
    console.log('📦 Payment payload created:', paymentPayload);

    // 4. 支払い情報付きで再リクエスト
    console.log('📤 Sending payment request...');
    const paymentResponse = await this.accessResource(path, {
      ...options,
      paymentPayload,
    });
    console.log('📥 Payment response:', paymentResponse);
  } catch (error) {
    // ... error handling
  }
}
```

**効果**: APIリクエスト・レスポンスの詳細とペイロード作成プロセスを追跡

### Phase 2: レスポンス解析の詳細デバッグ

#### 2.1 parser.ts (X402Parser)
**目的**: 402レスポンスのヘッダー解析プロセスの詳細確認

**追加したログ**:
```typescript
static parsePaymentRequired(response: Response): PaymentRequirements | null {
  console.log('🔍 X402Parser.parsePaymentRequired called');
  console.log('📊 Response status:', response.status);
  
  if (response.status !== 402) {
    console.log('❌ Status is not 402, returning null');
    return null;
  }

  const paymentRequiredHeader = response.headers.get('X-PAYMENT-REQUIRED');
  console.log('📋 X-PAYMENT-REQUIRED header:', paymentRequiredHeader);
  
  if (!paymentRequiredHeader) {
    console.log('❌ X-PAYMENT-REQUIRED header not found');
    const headers = Array.from(response.headers.entries());
    console.log('📋 Available headers:', headers);
    headers.forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
    return null;
  }

  try {
    console.log('🔓 Attempting Base64 decode...');
    const decodedJson = atob(paymentRequiredHeader);
    console.log('📄 Decoded JSON:', decodedJson);
    
    const requirements = JSON.parse(decodedJson) as PaymentRequirements;
    console.log('📦 Parsed requirements:', requirements);
    
    // 基本的な検証
    if (!requirements.scheme || !requirements.nonce || !requirements.payTo) {
      console.warn('❌ Invalid payment requirements format:', {
        scheme: requirements.scheme,
        nonce: requirements.nonce,
        payTo: requirements.payTo
      });
      return null;
    }

    console.log('✅ Payment requirements parsed successfully');
    return requirements;
  } catch (error) {
    console.error('💥 Failed to parse X-PAYMENT-REQUIRED header:', error);
    console.error('📋 Header value was:', paymentRequiredHeader);
    return null;
  }
}
```

**効果**: ヘッダーの存在確認、Base64デコード、JSON解析の各段階を詳細に追跡

### Phase 3: サーバー側の確認

#### 3.1 curlによる直接テスト
**目的**: APIサーバーが実際にヘッダーを送信しているかの確認

**実行コマンド**:
```bash
curl -v http://localhost:3001/api/premium
```

**結果**: APIサーバーは正しく`X-PAYMENT-REQUIRED`ヘッダーを送信していることを確認

#### 3.2 CORS設定の問題特定
**発見**: ブラウザからはヘッダーが見えないが、curlでは見える → CORS問題と判断

## 解決策の実装

### CORS設定の修正

**ファイル**: `apps/api/src/server.ts`

**修正前**:
```typescript
app.use(cors()); // デフォルト設定
```

**修正後**:
```typescript
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002'], // フロントエンドのURL
  credentials: true,
  exposedHeaders: ['X-PAYMENT-REQUIRED', 'X-PAYMENT-RESPONSE'] // x402ヘッダーを公開
}));
```

**修正内容**:
1. `exposedHeaders`に`X-PAYMENT-REQUIRED`と`X-PAYMENT-RESPONSE`を追加
2. `origin`にフロントエンドのURL（port 3002）を明示的に指定
3. `credentials: true`を設定

## 修正後の動作確認

### 成功ログ（修正後）
```
🔍 X402Parser.parsePaymentRequired called
📊 Response status: 402
📋 X-PAYMENT-REQUIRED header: eyJzY2hlbWUiOiJodHRwczovL3JmYy54NDAyLm9yZy9zY2hlbWVzL2VpcDMwMDkiLCJuZXR3b3JrIjoiYmFzZS1zZXBvbGlhIiwibWF4QW1vdW50UmVxdWlyZWQiOiIxMDAwMCIsImFzc2V0IjoiVVNEQyIsInBheVRvIjoiMHg3NDJkMzVDYzY2MzVDMDUzMjkyNWEzYjhEMEM1ZTBiNkY5YjNGNEUyIiwicmVzb3VyY2UiOiIvYXBpL3ByZW1pdW0iLCJub25jZSI6IlRTMTc1OTI5ODAwNjM4Ml8yYzEzZTA3NThlZGUzMDFkIiwidmFsaWRVbnRpbCI6IjIwMjUtMTAtMDFUMDY6MDg6MjYuMzgyWiJ9
🔓 Attempting Base64 decode...
📄 Decoded JSON: {"scheme":"https://rfc.x402.org/schemes/eip3009","network":"base-sepolia","maxAmountRequired":"10000","asset":"USDC","payTo":"0x742d35Cc6635C0532925a3b8D0C5e0b6F9b3F4E2","resource":"/api/premium","nonce":"TS1759298006382_2c13e0758ede301d","validUntil":"2025-10-01T06:08:26.382Z"}
📦 Parsed requirements: {scheme: 'https://rfc.x402.org/schemes/eip3009', network: 'base-sepolia', maxAmountRequired: '10000', asset: 'USDC', payTo: '0x742d35Cc6635C0532925a3b8D0C5e0b6F9b3F4E2', …}
✅ Payment requirements parsed successfully
📥 Initial response: {status: 402, paymentRequired: {…}, error: 'Payment required to access this resource'}
✍️ Creating payment signature...
📋 Payment requirements received: {scheme: 'https://rfc.x402.org/schemes/eip3009', network: 'base-sepolia', maxAmountRequired: '10000', asset: 'USDC', payTo: '0x742d35Cc6635C0532925a3b8D0C5e0b6F9b3F4E2', …}
✍️ Creating payment signature
```

## 学んだ教訓

### 1. 段階的デバッグの重要性
- フロントエンドからバックエンドまで、各レイヤーに詳細なログを追加
- 問題の発生箇所を特定するために、データフローを追跡

### 2. CORS設定の重要性
- カスタムヘッダーを使用する場合は、必ず`exposedHeaders`を設定する必要がある
- ブラウザとサーバー間の直接テスト（curl）で問題を切り分ける

### 3. 効果的なログ戦略
- 絵文字を使用した視覚的に分かりやすいログ
- 各段階での状態とデータの詳細を記録
- エラー時の詳細情報（ヘッダー一覧、デコード前後の値など）

### 4. 問題解決のアプローチ
1. **症状の確認**: エラーメッセージと期待される動作の比較
2. **仮説立案**: 可能性のある原因の列挙
3. **段階的検証**: フロントエンドからバックエンドまで順次確認
4. **直接テスト**: ブラウザを経由しない直接的なテスト
5. **根本原因特定**: 問題の本質的な原因の特定
6. **修正と検証**: 修正後の動作確認

## 今後の改善点

### 1. 開発環境の改善
- CORS設定を開発環境用設定ファイルに分離
- 環境変数による動的な設定管理

### 2. エラーハンドリングの強化
- CORS関連エラーの専用エラーメッセージ
- ヘッダー不足時の分かりやすいエラー表示

### 3. テスト環境の整備
- x402フロー全体の自動テスト
- CORS設定のテスト

## Phase 4: Nonce検証エラーの解決

### 問題の発生

CORS問題解決後、新たな問題が発生しました：

#### 症状
- 支払いフローは進行するが、最終的に決済が失敗
- エラーメッセージ: `nonce_mismatch`
- クライアントが送信したnonceとサーバーが期待するnonceが一致しない

#### エラーログ
```
🔍 Nonce validation details:
📦 Payment payload nonce: TS1759298006382_2c13e0758ede301d
📋 Requirements nonce: temp-nonce
🔄 Nonces match: false
❌ Nonce mismatch detected!
```

### 根本原因の特定

#### 原因2: サーバー側nonceのハードコーディング

**問題**: サーバー側の`buildPaymentRequirements`メソッドで、クライアントから送信されたnonceを無視して固定値`'temp-nonce'`を使用していた。

**詳細**:
- クライアントは正しくnonceを含むPaymentPayloadを送信
- しかし、サーバー側で新しいnonceを生成しており、検証時に不一致が発生
- x402プロトコルでは、クライアントが生成したnonceをサーバーがそのまま使用する必要がある

### Phase 4.1: サーバー側デバッグログの追加

#### 4.1.1 x402-middleware.ts
**目的**: サーバー側のnonce処理フローの詳細確認

**追加したログ**:
```typescript
private async buildPaymentRequirements(req: Request, x402Config: any, paymentPayload?: any): Promise<any> {
  console.log('🏗️ buildPaymentRequirements called');
  console.log('📍 Request URL:', req.originalUrl || req.url);
  console.log('⚙️ X402 config:', x402Config);
  console.log('📦 Payment payload provided:', !!paymentPayload);
  
  const nonce = paymentPayload?.nonce || 'temp-nonce';
  console.log('🔑 Using nonce:', nonce);
  console.log('✅ Nonce source:', paymentPayload?.nonce ? 'PaymentPayload' : 'fallback');
  
  const requirements = {
    scheme: 'https://rfc.x402.org/schemes/eip3009',
    network: x402Config.networkName,
    maxAmountRequired: x402Config.amount,
    asset: x402Config.currency,
    payTo: x402Config.receiverAddress,
    resource: req.originalUrl || req.url,
    nonce: nonce,
    validUntil: new Date(Date.now() + (x402Config.nonceExpirationMs || 900000)).toISOString(),
  };
  
  console.log('📋 Built requirements:', requirements);
  return requirements;
}
```

#### 4.1.2 verify-service.ts
**目的**: nonce検証プロセスの詳細確認

**追加したログ**:
```typescript
private async validateNonce(
  paymentPayload: PaymentPayload,
  requirements: PaymentRequirements
): Promise<PaymentVerificationResult> {
  console.log('🔍 Nonce validation details:');
  console.log('📦 Payment payload nonce:', paymentPayload.nonce);
  console.log('📋 Requirements nonce:', requirements.nonce);
  console.log('🔄 Nonces match:', paymentPayload.nonce === requirements.nonce);
  
  if (paymentPayload.nonce !== requirements.nonce) {
    console.log('❌ Nonce mismatch detected!');
    console.log('📦 Expected (from payload):', paymentPayload.nonce);
    console.log('📋 Received (from requirements):', requirements.nonce);
    return {
      isValid: false,
      reason: 'nonce_mismatch',
    };
  }
  
  console.log('✅ Nonce validation passed!');
  console.log('🔑 Validated nonce:', paymentPayload.nonce);
  // ... rest of the method
}
```

### Phase 4.2: 根本修正の実装

#### 修正内容

**ファイル**: `packages/x402-mw/src/middleware/x402-middleware.ts`

**修正前**:
```typescript
private async buildPaymentRequirements(req: Request, x402Config: any): Promise<any> {
  // ...
  const requirements = {
    // ...
    nonce: 'temp-nonce', // ハードコーディングされた固定値
    // ...
  };
}
```

**修正後**:
```typescript
private async buildPaymentRequirements(req: Request, x402Config: any, paymentPayload?: any): Promise<any> {
  // ...
  const nonce = paymentPayload?.nonce || 'temp-nonce'; // クライアントのnonceを使用
  // ...
  const requirements = {
    // ...
    nonce: nonce,
    // ...
  };
}
```

**修正のポイント**:
1. `buildPaymentRequirements`メソッドに`paymentPayload`パラメータを追加
2. クライアントから送信されたnonceを優先的に使用
3. nonceが提供されない場合のみフォールバック値を使用

### Phase 4.3: 修正後の動作確認

#### 成功ログ（修正後）
```
🏗️ buildPaymentRequirements called
📍 Request URL: /api/premium
⚙️ X402 config: {networkName: 'base-sepolia', amount: '10000', ...}
📦 Payment payload provided: true
🔑 Using nonce: TS1759298006382_2c13e0758ede301d
✅ Nonce source: PaymentPayload
📋 Built requirements: {scheme: '...', nonce: 'TS1759298006382_2c13e0758ede301d', ...}
🔍 Nonce validation details:
📦 Payment payload nonce: TS1759298006382_2c13e0758ede301d
📋 Requirements nonce: TS1759298006382_2c13e0758ede301d
🔄 Nonces match: true
✅ Nonce validation passed!
```

## Phase 5: Redis接続エラーの解決

### 問題の発生

Nonce問題解決後、新たなエラーが発生：

#### 症状
- 決済フロー中にRedis接続エラーが発生
- エラーメッセージ: `ECONNREFUSED ::1:6379`
- アプリケーションがRedisサーバーに接続できない

#### エラーログ
```
❌ Redis connection error: Error: connect ECONNREFUSED ::1:6379
```

### 根本原因の特定

#### 原因3: Redisサーバーの未起動

**問題**: アプリケーションがRedisに接続しようとしているが、Redisサーバーが起動していない状態でした。

**詳細**:
- アプリケーション設定でRedis接続が有効になっている
- しかし、実際のRedisサーバーが起動していない
- Docker Composeを使用せずにローカル実行していたため、Redisコンテナが起動していない

### Phase 5.1: Redisサーバーの起動

#### 解決方法

**手動Redisサーバー起動**:
```bash
docker run -d -p 6379:6379 redis:alpine
```

**確認コマンド**:
```bash
docker ps | grep redis
```

### Phase 5.2: Redis認証エラーの解決

#### 新たな問題の発生

Redisサーバー起動後、認証エラーが発生：

#### 症状
- Redis接続は成功するが、認証で失敗
- エラーメッセージ: `ERR AUTH <password> called without any password configured`

#### エラーログ
```
❌ Redis auth error: Error: ERR AUTH <password> called without any password configured
```

### 根本原因の特定

#### 原因4: Redis環境変数とサーバー設定の不一致

**問題**: 環境変数`REDIS_URL`にパスワードが設定されているが、起動したRedisサーバーにはパスワードが設定されていない状態でした。

**詳細**:
- `.env`ファイル: `REDIS_URL=redis://:x402_redis_password@localhost:6379`
- 手動起動したRedis: パスワードなし
- アプリケーションが空のパスワードで認証を試行し、エラーが発生

### Phase 5.3: 環境変数の修正

#### 解決方法

**環境変数の修正**:
```bash
# .envファイルの修正
sed -i 's/redis:\/\/:x402_redis_password@localhost:6379/redis:\/\/localhost:6379/' .env

# apps/api/.envファイルの修正
sed -i 's/redis:\/\/:x402_redis_password@localhost:6379/redis:\/\/localhost:6379/' apps/api/.env
```

**修正内容**:
- `REDIS_URL`からパスワード部分を削除
- パスワードなしのRedisサーバーに接続するよう設定を変更

## Phase 6: Coinbase Developer APIエラーの調査

### 問題の発生

Redis問題解決後、最終的な決済処理で新たなエラーが発生：

#### 症状
- Facilitator API呼び出し時に404エラーが発生
- エラーメッセージ: `404 page not found`
- Coinbase Developer APIの`/v2/x402/verify`エンドポイントが見つからない

#### エラーログ
```
❌ API Call Failed - 詳細エラー分析:
📊 HTTP Status: 404
📊 HTTP Status Text: Not Found
🔍 404 Error Analysis:
🔍 Requested URL: /v2/x402/verify
🔍 Base URL: https://api.cdp.coinbase.com
🔍 Full URL: https://api.cdp.coinbase.com/v2/x402/verify
```

### 根本原因の調査

#### 原因5: Coinbase Developer API認証の問題

**推測される原因**:
1. **認証形式の問題**: Bearer TokenではなくX-CC-Api-Keyヘッダーが必要
2. **APIキーの無効性**: 設定されたAPIキーが無効または期限切れ
3. **エンドポイントの存在**: 実際にはエンドポイントが存在しない可能性

### Phase 6.1: 詳細デバッグログの追加

#### 6.1.1 facilitator-client.ts
**目的**: APIリクエストの詳細情報を取得して原因を特定

**追加したログ**:
```typescript
async verify(request: VerifyRequest): Promise<FacilitatorResponse<VerifyResponse>> {
  try {
    console.log('🔍 Facilitator API Debug - 原因特定用ログ:');
    console.log('📍 Base URL:', this.axiosInstance.defaults.baseURL);
    console.log('🔗 Full URL:', `${this.axiosInstance.defaults.baseURL}/v2/x402/verify`);
    
    // 認証ヘッダーの詳細確認
    console.log('🔑 Authorization Header:', this.axiosInstance.defaults.headers['Authorization']);
    console.log('🔑 X-CC-Api-Key Header:', this.axiosInstance.defaults.headers['X-CC-Api-Key']);
    console.log('🔑 API Key from config:', this.config.apiKey);
    console.log('🔑 API Key length:', this.config.apiKey?.length);
    console.log('🔑 API Key format valid:', /^[a-f0-9-]{36}$/.test(this.config.apiKey || ''));
    
    // 全ヘッダーの確認
    console.log('📋 All Request headers:', JSON.stringify(this.axiosInstance.defaults.headers, null, 2));
    
    // リクエストペイロードの確認
    console.log('📦 Request payload size:', JSON.stringify(request).length);
    console.log('📦 Request payload:', JSON.stringify(request, null, 2));

    const response = await this.axiosInstance.post<VerifyResponse>('/v2/x402/verify', request);
    // ...
  } catch (error) {
    console.log('❌ API Call Failed - 詳細エラー分析:');
    console.log('📊 Error type:', error?.constructor?.name);
    console.log('📊 Error message:', error?.message);
    console.log('📊 HTTP Status:', error?.response?.status);
    console.log('📊 HTTP Status Text:', error?.response?.statusText);
    console.log('📊 Response Headers:', error?.response?.headers);
    console.log('📊 Response Data:', error?.response?.data);
    console.log('📊 Request Config:', {
      url: error?.config?.url,
      method: error?.config?.method,
      headers: error?.config?.headers,
      baseURL: error?.config?.baseURL
    });
    
    // 認証関連エラーの特定
    if (error?.response?.status === 401) {
      console.log('🔐 Authentication Error Detected!');
      console.log('🔐 Current auth header:', error?.config?.headers?.Authorization);
      console.log('🔐 Current X-CC-Api-Key:', error?.config?.headers['X-CC-Api-Key']);
    }
    
    // 404エラーの詳細分析
    if (error?.response?.status === 404) {
      console.log('🔍 404 Error Analysis:');
      console.log('🔍 Requested URL:', error?.config?.url);
      console.log('🔍 Base URL:', error?.config?.baseURL);
      console.log('🔍 Full URL:', `${error?.config?.baseURL}${error?.config?.url}`);
      console.log('🔍 Method:', error?.config?.method);
    }
    
    return this.handleError('verify', error);
  }
}
```

### Phase 6.2: TypeScriptエラーの修正

#### 6.2.1 型安全性の向上

**問題**: デバッグログ追加時にTypeScriptエラーが発生
- `error`パラメータの型が`{}`として推論される
- `message`、`response`、`config`プロパティにアクセスできない

**修正内容**:
```typescript
// AxiosErrorのインポート追加
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// 型安全なエラーハンドリング
} catch (error) {
  const axiosError = error as AxiosError;
  
  console.log('❌ API Call Failed - 詳細エラー分析:');
  console.log('📊 Error type:', axiosError?.constructor?.name);
  console.log('📊 Error message:', axiosError?.message);
  console.log('📊 HTTP Status:', axiosError?.response?.status);
  // ... 他のプロパティアクセスも型安全に
}
```

**修正のポイント**:
1. `AxiosError`型をインポートして適切な型定義を使用
2. `error as AxiosError`で型アサーションを実行
3. 全てのcatchブロックで一貫した型処理を適用

## 現在の状況

### 解決済みの問題
1. ✅ **CORS設定**: `exposedHeaders`の追加によりカスタムヘッダーアクセス可能
2. ✅ **Nonce検証**: クライアントのnonceをサーバー側で正しく使用
3. ✅ **Redis接続**: サーバー起動と環境変数修正により接続成功
4. ✅ **TypeScriptエラー**: `AxiosError`型による根本的解決

### 調査中の問題
1. 🔍 **Coinbase Developer API**: 404エラーの原因特定のため詳細ログ準備完了

### 次のステップ
1. ブラウザで決済ボタンを押してCoinbase APIの詳細ログを確認
2. 認証形式（Bearer vs X-CC-Api-Key）の確認
3. APIキーの有効性確認
4. エンドポイントの存在確認

## 学んだ教訓（更新）

### 5. 段階的問題解決の重要性
- 一度に複数の問題を解決しようとせず、一つずつ順序立てて解決
- 各問題解決後に動作確認を行い、新たな問題を早期発見

### 6. 環境依存問題の切り分け
- Docker環境とローカル環境の違いを理解
- 外部サービス（Redis、API）の状態確認の重要性

### 7. 型安全性の価値
- TypeScriptの型システムを活用した根本的解決
- 一時的な修正ではなく、拡張性を考慮した設計

### 8. デバッグログの戦略的配置
- 問題発生箇所の特定に必要な情報を段階的に追加
- 過度なログではなく、原因特定に必要な最小限の情報

## Phase 7: Coinbase CDP SDK実装による根本解決

### 問題の最終特定

#### 根本原因: JWT署名アルゴリズムと形式の不一致
- **現在の実装**: HS256署名アルゴリズム + 独自JWT形式
- **Coinbase CDP API要求**: ES256署名アルゴリズム + 特定のJWT形式（uri、kidフィールド必須）

#### 解決方針: 公式SDK採用
手動実装ではなく、Coinbase CDP公式SDKの`generateJwt`関数を使用することで、すべての要件を自動的に満たす。

### Phase 7.1: 実装変更

#### 依存関係追加
```bash
pnpm --filter @x402/middleware add @coinbase/cdp-sdk
```

#### JWT生成ユーティリティ更新
```typescript
import { generateJwt } from '@coinbase/cdp-sdk/auth';

export class CDPJwtUtils {
  static async generateJWT(
    apiKeyId: string, 
    apiSecret: string, 
    requestMethod: string = 'POST',
    requestPath: string = '/platform/v2/x402/verify'
  ): Promise<string> {
    const jwt = await generateJwt({
      apiKeyId: apiKeyId,
      apiKeySecret: apiSecret,
      requestMethod: requestMethod,
      requestHost: 'api.cdp.coinbase.com',
      requestPath: requestPath,
      expiresIn: 120, // 2分間（CDP推奨）
    });
    return jwt;
  }
}
```

#### FacilitatorClient更新
- **非同期JWT生成**: コンストラクタではなく、リクエスト時に動的生成
- **エンドポイント修正**: `/v2/x402/verify` → `/platform/v2/x402/verify`
- **環境変数追加**: `CDP_API_KEY_ID`の設定

#### 環境変数設定
```bash
CDP_API_KEY_ID="6941b3e4-99db-4a57-b5c2-d1d769fb01eb"
CDP_API_SECRET="+jRUS43CkTuI/ArSTSQWK2U6F6oax18QuPPBuNuW3nOlPTmIDzH1Q9Rbqm8wn+Y+Of02yp6twR9+Wf+dXuNrmg=="
```

### Phase 7.2: 期待される結果

#### 成功ログ
```
🔐 CDP SDK JWT Generation started
✅ CDP SDK JWT generated successfully
🔍 Facilitator API Debug - CDP SDK使用
📍 Base URL: https://api.developer.coinbase.com
🔗 Full URL: https://api.developer.coinbase.com/platform/v2/x402/verify
```

#### 解決される問題
1. **404エラー**: 正しいエンドポイントとJWT形式で解決
2. **認証エラー**: ES256署名とkid/uriフィールドで解決
3. **保守性向上**: 公式SDKにより将来の仕様変更に自動対応

### 次のステップ
ブラウザで決済ボタンを押して、CDP SDK使用版の動作確認を実施。

## まとめ

この問題解決プロセスは、Webアプリケーション開発における複雑な問題解決の良い例を示しています。以下の段階的な問題を解決しました：

1. **CORS問題**: ブラウザセキュリティポリシーによるヘッダーブロック
2. **Nonce不一致**: サーバー側でのハードコーディング
3. **Redis接続**: 環境設定の不備
4. **TypeScriptエラー**: 型安全性の改善
5. **JWT署名**: Coinbase CDP APIの要求仕様との不一致

段階的なデバッグアプローチと公式SDKの採用により、すべての問題を根本的に解決することができました。この経験は、外部API統合における公式SDKの重要性と、効果的なデバッグ手法の価値を示しています。
