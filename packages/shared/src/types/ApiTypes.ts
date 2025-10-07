import { z } from 'zod';

// ======================================================================
// API Request/Response Types
// ======================================================================

/**
 * 基本APIレスポンス
 */
export const BaseApiResponseSchema = z.object({
  success: z.boolean(),
  timestamp: z.string().datetime(),
  message: z.string().optional(),
});

export type BaseApiResponse = z.infer<typeof BaseApiResponseSchema>;

/**
 * エラーAPIレスポンス
 */
export const ErrorApiResponseSchema = BaseApiResponseSchema.extend({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.any()).optional(),
  }),
});

export type ErrorApiResponse = z.infer<typeof ErrorApiResponseSchema>;

/**
 * ヘルスチェックレスポンス
 */
export const HealthCheckResponseSchema = z.object({
  status: z.enum(['healthy', 'unhealthy']),
  timestamp: z.string().datetime(),
  uptime: z.number().optional(),
  environment: z.string().optional(),
  version: z.string().optional(),
  services: z.record(z.string()).optional(),
});

export type HealthCheckResponse = z.infer<typeof HealthCheckResponseSchema>;

/**
 * ページネーション設定
 */
export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type Pagination = z.infer<typeof PaginationSchema>;

/**
 * ページネーション付きレスポンス
 */
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  BaseApiResponseSchema.extend({
    success: z.literal(true),
    data: z.array(dataSchema),
    pagination: z.object({
      page: z.number().int(),
      limit: z.number().int(),
      total: z.number().int(),
      pages: z.number().int(),
      hasNext: z.boolean(),
      hasPrev: z.boolean(),
    }),
  });

/**
 * CSV エクスポートリクエスト
 */
export const CsvExportRequestSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  currency: z.string().optional(),
  includeRefunds: z.boolean().default(false),
});

export type CsvExportRequest = z.infer<typeof CsvExportRequestSchema>; 