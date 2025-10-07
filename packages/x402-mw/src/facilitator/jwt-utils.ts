import { generateJwt } from '@coinbase/cdp-sdk/auth';

/**
 * CDP API用JWT署名ユーティリティ（公式SDK使用）
 */
export class CDPJwtUtils {
  /**
   * Coinbase CDP公式SDKを使用してJWTを生成
   */
  static async generateJWT(
    apiKeyId: string, 
    apiSecret: string, 
    requestMethod: string = 'POST',
    requestPath: string = '/platform/v2/x402/verify'
  ): Promise<string> {
    console.log('🔐 CDP SDK JWT Generation started');
    console.log('🔑 API Key ID length:', apiKeyId?.length);
    console.log('🔑 API Secret length:', apiSecret?.length);
    console.log('🌐 Request method:', requestMethod);
    console.log('📍 Request path:', requestPath);
    
    try {
      const jwt = await generateJwt({
        apiKeyId: apiKeyId,
        apiKeySecret: apiSecret,
        requestMethod: requestMethod,
        requestHost: 'api.cdp.coinbase.com',
        requestPath: requestPath,
        expiresIn: 120, // 2分間（CDP推奨）
      });
      
      console.log('✅ CDP SDK JWT generated successfully');
      console.log('📏 JWT length:', jwt.length);
      console.log('🔤 JWT format check:', jwt.includes('.'));
      console.log('🧩 JWT parts count:', jwt.split('.').length);
      console.log('📝 JWT preview:', jwt.substring(0, 50) + '...');
      
      return jwt;
    } catch (error) {
      console.error('❌ CDP SDK JWT generation failed:', error);
      throw new Error(`CDP SDK JWT generation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
