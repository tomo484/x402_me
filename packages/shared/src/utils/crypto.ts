import { randomBytes, createHash, timingSafeEqual } from 'crypto';

/**
 * セキュアなランダムnonceを生成
 */
export function generateNonce(length: number = 32): string {
  return randomBytes(length / 2).toString('hex');
}

/**
 * ランダムなJWTシークレットを生成
 */
export function generateJwtSecret(): string {
  return randomBytes(64).toString('base64');
}

/**
 * SHA256ハッシュを生成
 */
export function sha256(data: string): string {
  return createHash('sha256').update(data, 'utf8').digest('hex');
}

/**
 * タイミング攻撃に安全な文字列比較
 */
export function safeStringCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  const bufferA = Buffer.from(a, 'utf8');
  const bufferB = Buffer.from(b, 'utf8');
  
  return timingSafeEqual(bufferA, bufferB);
}

/**
 * Base64エンコード/デコード
 */
export const base64 = {
  encode: (data: string): string => Buffer.from(data, 'utf8').toString('base64'),
  decode: (data: string): string => Buffer.from(data, 'base64').toString('utf8'),
  urlEncode: (data: string): string => 
    Buffer.from(data, 'utf8').toString('base64url'),
  urlDecode: (data: string): string => 
    Buffer.from(data, 'base64url').toString('utf8'),
};

/**
 * UUIDv4生成（シンプル版）
 */
export function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
} 