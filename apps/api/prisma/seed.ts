import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    await prisma.systemConfig.upsert({
        where: { key: 'rate_limit.default'},
        update: {},
    create: {
      key: 'rate_limit.default',
      value: {
        windowMs: 900000,      // 15分
        maxRequests: 100,      // 最大100リクエスト
        skipSuccessful: false,
        skipFailed: false
      },
      description: 'デフォルトレート制限設定'
    }
    });
    
    await prisma.systemConfig.upsert({
        where: { key: 'data_retention.policy' },
    update: {},
    create: {
      key: 'data_retention.policy',
      value: {
        payments: 2592000,     // 30日間保持
        auditLogs: 7776000,    // 90日間保持
        rateLimits: 86400,     // 1日間保持
        nonces: 3600           // 1時間保持
       },
      description: 'データ保持ポリシー（秒）'
     }
    });

    console.log("シードデータの投入が完了しました");
}

main()
.catch((e) => {
    console.error('シードデータ投入エラー', e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
})

