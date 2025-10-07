
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Payment
 * 決済記録テーブル
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model PaymentNonce
 * nonce管理テーブル（リプレイ防止）
 */
export type PaymentNonce = $Result.DefaultSelection<Prisma.$PaymentNoncePayload>
/**
 * Model RateLimit
 * レート制限テーブル
 */
export type RateLimit = $Result.DefaultSelection<Prisma.$RateLimitPayload>
/**
 * Model AuditLog
 * 監査ログテーブル
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model SystemConfig
 * システム設定テーブル
 */
export type SystemConfig = $Result.DefaultSelection<Prisma.$SystemConfigPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PaymentStatus: {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  SETTLED: 'SETTLED',
  FAILED: 'FAILED',
  EXPIRED: 'EXPIRED',
  REFUNDED: 'REFUNDED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const RateLimitType: {
  IP: 'IP',
  WALLET: 'WALLET'
};

export type RateLimitType = (typeof RateLimitType)[keyof typeof RateLimitType]


export const AuditEventType: {
  PAYMENT_REQUIRED: 'PAYMENT_REQUIRED',
  PAYMENT_RECEIVED: 'PAYMENT_RECEIVED',
  PAYMENT_VERIFIED: 'PAYMENT_VERIFIED',
  PAYMENT_SETTLED: 'PAYMENT_SETTLED',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  NONCE_GENERATED: 'NONCE_GENERATED',
  NONCE_VALIDATED: 'NONCE_VALIDATED',
  RATE_LIMIT_HIT: 'RATE_LIMIT_HIT',
  SECURITY_VIOLATION: 'SECURITY_VIOLATION'
};

export type AuditEventType = (typeof AuditEventType)[keyof typeof AuditEventType]

}

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type RateLimitType = $Enums.RateLimitType

export const RateLimitType: typeof $Enums.RateLimitType

export type AuditEventType = $Enums.AuditEventType

export const AuditEventType: typeof $Enums.AuditEventType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Payments
 * const payments = await prisma.payment.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Payments
   * const payments = await prisma.payment.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs>;

  /**
   * `prisma.paymentNonce`: Exposes CRUD operations for the **PaymentNonce** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentNonces
    * const paymentNonces = await prisma.paymentNonce.findMany()
    * ```
    */
  get paymentNonce(): Prisma.PaymentNonceDelegate<ExtArgs>;

  /**
   * `prisma.rateLimit`: Exposes CRUD operations for the **RateLimit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RateLimits
    * const rateLimits = await prisma.rateLimit.findMany()
    * ```
    */
  get rateLimit(): Prisma.RateLimitDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.systemConfig`: Exposes CRUD operations for the **SystemConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemConfigs
    * const systemConfigs = await prisma.systemConfig.findMany()
    * ```
    */
  get systemConfig(): Prisma.SystemConfigDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Payment: 'Payment',
    PaymentNonce: 'PaymentNonce',
    RateLimit: 'RateLimit',
    AuditLog: 'AuditLog',
    SystemConfig: 'SystemConfig'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "payment" | "paymentNonce" | "rateLimit" | "auditLog" | "systemConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      PaymentNonce: {
        payload: Prisma.$PaymentNoncePayload<ExtArgs>
        fields: Prisma.PaymentNonceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentNonceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentNoncePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentNonceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentNoncePayload>
          }
          findFirst: {
            args: Prisma.PaymentNonceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentNoncePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentNonceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentNoncePayload>
          }
          findMany: {
            args: Prisma.PaymentNonceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentNoncePayload>[]
          }
          create: {
            args: Prisma.PaymentNonceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentNoncePayload>
          }
          createMany: {
            args: Prisma.PaymentNonceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentNonceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentNoncePayload>[]
          }
          delete: {
            args: Prisma.PaymentNonceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentNoncePayload>
          }
          update: {
            args: Prisma.PaymentNonceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentNoncePayload>
          }
          deleteMany: {
            args: Prisma.PaymentNonceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentNonceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentNonceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentNoncePayload>
          }
          aggregate: {
            args: Prisma.PaymentNonceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentNonce>
          }
          groupBy: {
            args: Prisma.PaymentNonceGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentNonceGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentNonceCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentNonceCountAggregateOutputType> | number
          }
        }
      }
      RateLimit: {
        payload: Prisma.$RateLimitPayload<ExtArgs>
        fields: Prisma.RateLimitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RateLimitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RateLimitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          findFirst: {
            args: Prisma.RateLimitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RateLimitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          findMany: {
            args: Prisma.RateLimitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>[]
          }
          create: {
            args: Prisma.RateLimitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          createMany: {
            args: Prisma.RateLimitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RateLimitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>[]
          }
          delete: {
            args: Prisma.RateLimitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          update: {
            args: Prisma.RateLimitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          deleteMany: {
            args: Prisma.RateLimitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RateLimitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RateLimitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitPayload>
          }
          aggregate: {
            args: Prisma.RateLimitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRateLimit>
          }
          groupBy: {
            args: Prisma.RateLimitGroupByArgs<ExtArgs>
            result: $Utils.Optional<RateLimitGroupByOutputType>[]
          }
          count: {
            args: Prisma.RateLimitCountArgs<ExtArgs>
            result: $Utils.Optional<RateLimitCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      SystemConfig: {
        payload: Prisma.$SystemConfigPayload<ExtArgs>
        fields: Prisma.SystemConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          findFirst: {
            args: Prisma.SystemConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          findMany: {
            args: Prisma.SystemConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          create: {
            args: Prisma.SystemConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          createMany: {
            args: Prisma.SystemConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          delete: {
            args: Prisma.SystemConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          update: {
            args: Prisma.SystemConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          deleteMany: {
            args: Prisma.SystemConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SystemConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          aggregate: {
            args: Prisma.SystemConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemConfig>
          }
          groupBy: {
            args: Prisma.SystemConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemConfigCountArgs<ExtArgs>
            result: $Utils.Optional<SystemConfigCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PaymentCountOutputType
   */

  export type PaymentCountOutputType = {
    auditLogs: number
  }

  export type PaymentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | PaymentCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * PaymentCountOutputType without action
   */
  export type PaymentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentCountOutputType
     */
    select?: PaymentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PaymentCountOutputType without action
   */
  export type PaymentCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    decimals: number | null
    chainId: number | null
    blockNumber: number | null
  }

  export type PaymentSumAggregateOutputType = {
    decimals: number | null
    chainId: number | null
    blockNumber: bigint | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    txHash: string | null
    fromAddress: string | null
    toAddress: string | null
    amount: string | null
    currency: string | null
    decimals: number | null
    resource: string | null
    nonce: string | null
    networkName: string | null
    chainId: number | null
    blockNumber: bigint | null
    blockHash: string | null
    status: $Enums.PaymentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    settledAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    txHash: string | null
    fromAddress: string | null
    toAddress: string | null
    amount: string | null
    currency: string | null
    decimals: number | null
    resource: string | null
    nonce: string | null
    networkName: string | null
    chainId: number | null
    blockNumber: bigint | null
    blockHash: string | null
    status: $Enums.PaymentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    settledAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    txHash: number
    fromAddress: number
    toAddress: number
    amount: number
    currency: number
    decimals: number
    resource: number
    nonce: number
    networkName: number
    chainId: number
    blockNumber: number
    blockHash: number
    status: number
    createdAt: number
    updatedAt: number
    settledAt: number
    metadata: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    decimals?: true
    chainId?: true
    blockNumber?: true
  }

  export type PaymentSumAggregateInputType = {
    decimals?: true
    chainId?: true
    blockNumber?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    txHash?: true
    fromAddress?: true
    toAddress?: true
    amount?: true
    currency?: true
    decimals?: true
    resource?: true
    nonce?: true
    networkName?: true
    chainId?: true
    blockNumber?: true
    blockHash?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    settledAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    txHash?: true
    fromAddress?: true
    toAddress?: true
    amount?: true
    currency?: true
    decimals?: true
    resource?: true
    nonce?: true
    networkName?: true
    chainId?: true
    blockNumber?: true
    blockHash?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    settledAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    txHash?: true
    fromAddress?: true
    toAddress?: true
    amount?: true
    currency?: true
    decimals?: true
    resource?: true
    nonce?: true
    networkName?: true
    chainId?: true
    blockNumber?: true
    blockHash?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    settledAt?: true
    metadata?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    txHash: string
    fromAddress: string
    toAddress: string
    amount: string
    currency: string
    decimals: number
    resource: string
    nonce: string
    networkName: string
    chainId: number
    blockNumber: bigint | null
    blockHash: string | null
    status: $Enums.PaymentStatus
    createdAt: Date
    updatedAt: Date
    settledAt: Date | null
    metadata: JsonValue | null
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    txHash?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    amount?: boolean
    currency?: boolean
    decimals?: boolean
    resource?: boolean
    nonce?: boolean
    networkName?: boolean
    chainId?: boolean
    blockNumber?: boolean
    blockHash?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    settledAt?: boolean
    metadata?: boolean
    auditLogs?: boolean | Payment$auditLogsArgs<ExtArgs>
    _count?: boolean | PaymentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    txHash?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    amount?: boolean
    currency?: boolean
    decimals?: boolean
    resource?: boolean
    nonce?: boolean
    networkName?: boolean
    chainId?: boolean
    blockNumber?: boolean
    blockHash?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    settledAt?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    txHash?: boolean
    fromAddress?: boolean
    toAddress?: boolean
    amount?: boolean
    currency?: boolean
    decimals?: boolean
    resource?: boolean
    nonce?: boolean
    networkName?: boolean
    chainId?: boolean
    blockNumber?: boolean
    blockHash?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    settledAt?: boolean
    metadata?: boolean
  }

  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | Payment$auditLogsArgs<ExtArgs>
    _count?: boolean | PaymentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      txHash: string
      fromAddress: string
      toAddress: string
      amount: string
      currency: string
      decimals: number
      resource: string
      nonce: string
      networkName: string
      chainId: number
      blockNumber: bigint | null
      blockHash: string | null
      status: $Enums.PaymentStatus
      createdAt: Date
      updatedAt: Date
      settledAt: Date | null
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auditLogs<T extends Payment$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Payment$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */ 
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly txHash: FieldRef<"Payment", 'String'>
    readonly fromAddress: FieldRef<"Payment", 'String'>
    readonly toAddress: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'String'>
    readonly currency: FieldRef<"Payment", 'String'>
    readonly decimals: FieldRef<"Payment", 'Int'>
    readonly resource: FieldRef<"Payment", 'String'>
    readonly nonce: FieldRef<"Payment", 'String'>
    readonly networkName: FieldRef<"Payment", 'String'>
    readonly chainId: FieldRef<"Payment", 'Int'>
    readonly blockNumber: FieldRef<"Payment", 'BigInt'>
    readonly blockHash: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
    readonly settledAt: FieldRef<"Payment", 'DateTime'>
    readonly metadata: FieldRef<"Payment", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment.auditLogs
   */
  export type Payment$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model PaymentNonce
   */

  export type AggregatePaymentNonce = {
    _count: PaymentNonceCountAggregateOutputType | null
    _min: PaymentNonceMinAggregateOutputType | null
    _max: PaymentNonceMaxAggregateOutputType | null
  }

  export type PaymentNonceMinAggregateOutputType = {
    id: string | null
    value: string | null
    resource: string | null
    used: boolean | null
    createdAt: Date | null
    expiresAt: Date | null
    usedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
  }

  export type PaymentNonceMaxAggregateOutputType = {
    id: string | null
    value: string | null
    resource: string | null
    used: boolean | null
    createdAt: Date | null
    expiresAt: Date | null
    usedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
  }

  export type PaymentNonceCountAggregateOutputType = {
    id: number
    value: number
    resource: number
    used: number
    createdAt: number
    expiresAt: number
    usedAt: number
    ipAddress: number
    userAgent: number
    _all: number
  }


  export type PaymentNonceMinAggregateInputType = {
    id?: true
    value?: true
    resource?: true
    used?: true
    createdAt?: true
    expiresAt?: true
    usedAt?: true
    ipAddress?: true
    userAgent?: true
  }

  export type PaymentNonceMaxAggregateInputType = {
    id?: true
    value?: true
    resource?: true
    used?: true
    createdAt?: true
    expiresAt?: true
    usedAt?: true
    ipAddress?: true
    userAgent?: true
  }

  export type PaymentNonceCountAggregateInputType = {
    id?: true
    value?: true
    resource?: true
    used?: true
    createdAt?: true
    expiresAt?: true
    usedAt?: true
    ipAddress?: true
    userAgent?: true
    _all?: true
  }

  export type PaymentNonceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentNonce to aggregate.
     */
    where?: PaymentNonceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentNonces to fetch.
     */
    orderBy?: PaymentNonceOrderByWithRelationInput | PaymentNonceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentNonceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentNonces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentNonces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentNonces
    **/
    _count?: true | PaymentNonceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentNonceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentNonceMaxAggregateInputType
  }

  export type GetPaymentNonceAggregateType<T extends PaymentNonceAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentNonce]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentNonce[P]>
      : GetScalarType<T[P], AggregatePaymentNonce[P]>
  }




  export type PaymentNonceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentNonceWhereInput
    orderBy?: PaymentNonceOrderByWithAggregationInput | PaymentNonceOrderByWithAggregationInput[]
    by: PaymentNonceScalarFieldEnum[] | PaymentNonceScalarFieldEnum
    having?: PaymentNonceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentNonceCountAggregateInputType | true
    _min?: PaymentNonceMinAggregateInputType
    _max?: PaymentNonceMaxAggregateInputType
  }

  export type PaymentNonceGroupByOutputType = {
    id: string
    value: string
    resource: string
    used: boolean
    createdAt: Date
    expiresAt: Date
    usedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    _count: PaymentNonceCountAggregateOutputType | null
    _min: PaymentNonceMinAggregateOutputType | null
    _max: PaymentNonceMaxAggregateOutputType | null
  }

  type GetPaymentNonceGroupByPayload<T extends PaymentNonceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentNonceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentNonceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentNonceGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentNonceGroupByOutputType[P]>
        }
      >
    >


  export type PaymentNonceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    resource?: boolean
    used?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
  }, ExtArgs["result"]["paymentNonce"]>

  export type PaymentNonceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    resource?: boolean
    used?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
  }, ExtArgs["result"]["paymentNonce"]>

  export type PaymentNonceSelectScalar = {
    id?: boolean
    value?: boolean
    resource?: boolean
    used?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
  }


  export type $PaymentNoncePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentNonce"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      value: string
      resource: string
      used: boolean
      createdAt: Date
      expiresAt: Date
      usedAt: Date | null
      ipAddress: string | null
      userAgent: string | null
    }, ExtArgs["result"]["paymentNonce"]>
    composites: {}
  }

  type PaymentNonceGetPayload<S extends boolean | null | undefined | PaymentNonceDefaultArgs> = $Result.GetResult<Prisma.$PaymentNoncePayload, S>

  type PaymentNonceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaymentNonceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaymentNonceCountAggregateInputType | true
    }

  export interface PaymentNonceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentNonce'], meta: { name: 'PaymentNonce' } }
    /**
     * Find zero or one PaymentNonce that matches the filter.
     * @param {PaymentNonceFindUniqueArgs} args - Arguments to find a PaymentNonce
     * @example
     * // Get one PaymentNonce
     * const paymentNonce = await prisma.paymentNonce.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentNonceFindUniqueArgs>(args: SelectSubset<T, PaymentNonceFindUniqueArgs<ExtArgs>>): Prisma__PaymentNonceClient<$Result.GetResult<Prisma.$PaymentNoncePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PaymentNonce that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaymentNonceFindUniqueOrThrowArgs} args - Arguments to find a PaymentNonce
     * @example
     * // Get one PaymentNonce
     * const paymentNonce = await prisma.paymentNonce.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentNonceFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentNonceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentNonceClient<$Result.GetResult<Prisma.$PaymentNoncePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PaymentNonce that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentNonceFindFirstArgs} args - Arguments to find a PaymentNonce
     * @example
     * // Get one PaymentNonce
     * const paymentNonce = await prisma.paymentNonce.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentNonceFindFirstArgs>(args?: SelectSubset<T, PaymentNonceFindFirstArgs<ExtArgs>>): Prisma__PaymentNonceClient<$Result.GetResult<Prisma.$PaymentNoncePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PaymentNonce that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentNonceFindFirstOrThrowArgs} args - Arguments to find a PaymentNonce
     * @example
     * // Get one PaymentNonce
     * const paymentNonce = await prisma.paymentNonce.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentNonceFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentNonceFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentNonceClient<$Result.GetResult<Prisma.$PaymentNoncePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PaymentNonces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentNonceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentNonces
     * const paymentNonces = await prisma.paymentNonce.findMany()
     * 
     * // Get first 10 PaymentNonces
     * const paymentNonces = await prisma.paymentNonce.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentNonceWithIdOnly = await prisma.paymentNonce.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentNonceFindManyArgs>(args?: SelectSubset<T, PaymentNonceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentNoncePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PaymentNonce.
     * @param {PaymentNonceCreateArgs} args - Arguments to create a PaymentNonce.
     * @example
     * // Create one PaymentNonce
     * const PaymentNonce = await prisma.paymentNonce.create({
     *   data: {
     *     // ... data to create a PaymentNonce
     *   }
     * })
     * 
     */
    create<T extends PaymentNonceCreateArgs>(args: SelectSubset<T, PaymentNonceCreateArgs<ExtArgs>>): Prisma__PaymentNonceClient<$Result.GetResult<Prisma.$PaymentNoncePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PaymentNonces.
     * @param {PaymentNonceCreateManyArgs} args - Arguments to create many PaymentNonces.
     * @example
     * // Create many PaymentNonces
     * const paymentNonce = await prisma.paymentNonce.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentNonceCreateManyArgs>(args?: SelectSubset<T, PaymentNonceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentNonces and returns the data saved in the database.
     * @param {PaymentNonceCreateManyAndReturnArgs} args - Arguments to create many PaymentNonces.
     * @example
     * // Create many PaymentNonces
     * const paymentNonce = await prisma.paymentNonce.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentNonces and only return the `id`
     * const paymentNonceWithIdOnly = await prisma.paymentNonce.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentNonceCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentNonceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentNoncePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PaymentNonce.
     * @param {PaymentNonceDeleteArgs} args - Arguments to delete one PaymentNonce.
     * @example
     * // Delete one PaymentNonce
     * const PaymentNonce = await prisma.paymentNonce.delete({
     *   where: {
     *     // ... filter to delete one PaymentNonce
     *   }
     * })
     * 
     */
    delete<T extends PaymentNonceDeleteArgs>(args: SelectSubset<T, PaymentNonceDeleteArgs<ExtArgs>>): Prisma__PaymentNonceClient<$Result.GetResult<Prisma.$PaymentNoncePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PaymentNonce.
     * @param {PaymentNonceUpdateArgs} args - Arguments to update one PaymentNonce.
     * @example
     * // Update one PaymentNonce
     * const paymentNonce = await prisma.paymentNonce.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentNonceUpdateArgs>(args: SelectSubset<T, PaymentNonceUpdateArgs<ExtArgs>>): Prisma__PaymentNonceClient<$Result.GetResult<Prisma.$PaymentNoncePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PaymentNonces.
     * @param {PaymentNonceDeleteManyArgs} args - Arguments to filter PaymentNonces to delete.
     * @example
     * // Delete a few PaymentNonces
     * const { count } = await prisma.paymentNonce.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentNonceDeleteManyArgs>(args?: SelectSubset<T, PaymentNonceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentNonces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentNonceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentNonces
     * const paymentNonce = await prisma.paymentNonce.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentNonceUpdateManyArgs>(args: SelectSubset<T, PaymentNonceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PaymentNonce.
     * @param {PaymentNonceUpsertArgs} args - Arguments to update or create a PaymentNonce.
     * @example
     * // Update or create a PaymentNonce
     * const paymentNonce = await prisma.paymentNonce.upsert({
     *   create: {
     *     // ... data to create a PaymentNonce
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentNonce we want to update
     *   }
     * })
     */
    upsert<T extends PaymentNonceUpsertArgs>(args: SelectSubset<T, PaymentNonceUpsertArgs<ExtArgs>>): Prisma__PaymentNonceClient<$Result.GetResult<Prisma.$PaymentNoncePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PaymentNonces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentNonceCountArgs} args - Arguments to filter PaymentNonces to count.
     * @example
     * // Count the number of PaymentNonces
     * const count = await prisma.paymentNonce.count({
     *   where: {
     *     // ... the filter for the PaymentNonces we want to count
     *   }
     * })
    **/
    count<T extends PaymentNonceCountArgs>(
      args?: Subset<T, PaymentNonceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentNonceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentNonce.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentNonceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentNonceAggregateArgs>(args: Subset<T, PaymentNonceAggregateArgs>): Prisma.PrismaPromise<GetPaymentNonceAggregateType<T>>

    /**
     * Group by PaymentNonce.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentNonceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentNonceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentNonceGroupByArgs['orderBy'] }
        : { orderBy?: PaymentNonceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentNonceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentNonceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentNonce model
   */
  readonly fields: PaymentNonceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentNonce.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentNonceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PaymentNonce model
   */ 
  interface PaymentNonceFieldRefs {
    readonly id: FieldRef<"PaymentNonce", 'String'>
    readonly value: FieldRef<"PaymentNonce", 'String'>
    readonly resource: FieldRef<"PaymentNonce", 'String'>
    readonly used: FieldRef<"PaymentNonce", 'Boolean'>
    readonly createdAt: FieldRef<"PaymentNonce", 'DateTime'>
    readonly expiresAt: FieldRef<"PaymentNonce", 'DateTime'>
    readonly usedAt: FieldRef<"PaymentNonce", 'DateTime'>
    readonly ipAddress: FieldRef<"PaymentNonce", 'String'>
    readonly userAgent: FieldRef<"PaymentNonce", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PaymentNonce findUnique
   */
  export type PaymentNonceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentNonce
     */
    select?: PaymentNonceSelect<ExtArgs> | null
    /**
     * Filter, which PaymentNonce to fetch.
     */
    where: PaymentNonceWhereUniqueInput
  }

  /**
   * PaymentNonce findUniqueOrThrow
   */
  export type PaymentNonceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentNonce
     */
    select?: PaymentNonceSelect<ExtArgs> | null
    /**
     * Filter, which PaymentNonce to fetch.
     */
    where: PaymentNonceWhereUniqueInput
  }

  /**
   * PaymentNonce findFirst
   */
  export type PaymentNonceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentNonce
     */
    select?: PaymentNonceSelect<ExtArgs> | null
    /**
     * Filter, which PaymentNonce to fetch.
     */
    where?: PaymentNonceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentNonces to fetch.
     */
    orderBy?: PaymentNonceOrderByWithRelationInput | PaymentNonceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentNonces.
     */
    cursor?: PaymentNonceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentNonces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentNonces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentNonces.
     */
    distinct?: PaymentNonceScalarFieldEnum | PaymentNonceScalarFieldEnum[]
  }

  /**
   * PaymentNonce findFirstOrThrow
   */
  export type PaymentNonceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentNonce
     */
    select?: PaymentNonceSelect<ExtArgs> | null
    /**
     * Filter, which PaymentNonce to fetch.
     */
    where?: PaymentNonceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentNonces to fetch.
     */
    orderBy?: PaymentNonceOrderByWithRelationInput | PaymentNonceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentNonces.
     */
    cursor?: PaymentNonceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentNonces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentNonces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentNonces.
     */
    distinct?: PaymentNonceScalarFieldEnum | PaymentNonceScalarFieldEnum[]
  }

  /**
   * PaymentNonce findMany
   */
  export type PaymentNonceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentNonce
     */
    select?: PaymentNonceSelect<ExtArgs> | null
    /**
     * Filter, which PaymentNonces to fetch.
     */
    where?: PaymentNonceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentNonces to fetch.
     */
    orderBy?: PaymentNonceOrderByWithRelationInput | PaymentNonceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentNonces.
     */
    cursor?: PaymentNonceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentNonces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentNonces.
     */
    skip?: number
    distinct?: PaymentNonceScalarFieldEnum | PaymentNonceScalarFieldEnum[]
  }

  /**
   * PaymentNonce create
   */
  export type PaymentNonceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentNonce
     */
    select?: PaymentNonceSelect<ExtArgs> | null
    /**
     * The data needed to create a PaymentNonce.
     */
    data: XOR<PaymentNonceCreateInput, PaymentNonceUncheckedCreateInput>
  }

  /**
   * PaymentNonce createMany
   */
  export type PaymentNonceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentNonces.
     */
    data: PaymentNonceCreateManyInput | PaymentNonceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentNonce createManyAndReturn
   */
  export type PaymentNonceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentNonce
     */
    select?: PaymentNonceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PaymentNonces.
     */
    data: PaymentNonceCreateManyInput | PaymentNonceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentNonce update
   */
  export type PaymentNonceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentNonce
     */
    select?: PaymentNonceSelect<ExtArgs> | null
    /**
     * The data needed to update a PaymentNonce.
     */
    data: XOR<PaymentNonceUpdateInput, PaymentNonceUncheckedUpdateInput>
    /**
     * Choose, which PaymentNonce to update.
     */
    where: PaymentNonceWhereUniqueInput
  }

  /**
   * PaymentNonce updateMany
   */
  export type PaymentNonceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentNonces.
     */
    data: XOR<PaymentNonceUpdateManyMutationInput, PaymentNonceUncheckedUpdateManyInput>
    /**
     * Filter which PaymentNonces to update
     */
    where?: PaymentNonceWhereInput
  }

  /**
   * PaymentNonce upsert
   */
  export type PaymentNonceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentNonce
     */
    select?: PaymentNonceSelect<ExtArgs> | null
    /**
     * The filter to search for the PaymentNonce to update in case it exists.
     */
    where: PaymentNonceWhereUniqueInput
    /**
     * In case the PaymentNonce found by the `where` argument doesn't exist, create a new PaymentNonce with this data.
     */
    create: XOR<PaymentNonceCreateInput, PaymentNonceUncheckedCreateInput>
    /**
     * In case the PaymentNonce was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentNonceUpdateInput, PaymentNonceUncheckedUpdateInput>
  }

  /**
   * PaymentNonce delete
   */
  export type PaymentNonceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentNonce
     */
    select?: PaymentNonceSelect<ExtArgs> | null
    /**
     * Filter which PaymentNonce to delete.
     */
    where: PaymentNonceWhereUniqueInput
  }

  /**
   * PaymentNonce deleteMany
   */
  export type PaymentNonceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentNonces to delete
     */
    where?: PaymentNonceWhereInput
  }

  /**
   * PaymentNonce without action
   */
  export type PaymentNonceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentNonce
     */
    select?: PaymentNonceSelect<ExtArgs> | null
  }


  /**
   * Model RateLimit
   */

  export type AggregateRateLimit = {
    _count: RateLimitCountAggregateOutputType | null
    _avg: RateLimitAvgAggregateOutputType | null
    _sum: RateLimitSumAggregateOutputType | null
    _min: RateLimitMinAggregateOutputType | null
    _max: RateLimitMaxAggregateOutputType | null
  }

  export type RateLimitAvgAggregateOutputType = {
    requestCount: number | null
  }

  export type RateLimitSumAggregateOutputType = {
    requestCount: number | null
  }

  export type RateLimitMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    identifierType: $Enums.RateLimitType | null
    requestCount: number | null
    windowStart: Date | null
    windowEnd: Date | null
    resource: string | null
    blocked: boolean | null
    blockedUntil: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RateLimitMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    identifierType: $Enums.RateLimitType | null
    requestCount: number | null
    windowStart: Date | null
    windowEnd: Date | null
    resource: string | null
    blocked: boolean | null
    blockedUntil: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RateLimitCountAggregateOutputType = {
    id: number
    identifier: number
    identifierType: number
    requestCount: number
    windowStart: number
    windowEnd: number
    resource: number
    blocked: number
    blockedUntil: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RateLimitAvgAggregateInputType = {
    requestCount?: true
  }

  export type RateLimitSumAggregateInputType = {
    requestCount?: true
  }

  export type RateLimitMinAggregateInputType = {
    id?: true
    identifier?: true
    identifierType?: true
    requestCount?: true
    windowStart?: true
    windowEnd?: true
    resource?: true
    blocked?: true
    blockedUntil?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RateLimitMaxAggregateInputType = {
    id?: true
    identifier?: true
    identifierType?: true
    requestCount?: true
    windowStart?: true
    windowEnd?: true
    resource?: true
    blocked?: true
    blockedUntil?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RateLimitCountAggregateInputType = {
    id?: true
    identifier?: true
    identifierType?: true
    requestCount?: true
    windowStart?: true
    windowEnd?: true
    resource?: true
    blocked?: true
    blockedUntil?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RateLimitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RateLimit to aggregate.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RateLimits
    **/
    _count?: true | RateLimitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RateLimitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RateLimitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RateLimitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RateLimitMaxAggregateInputType
  }

  export type GetRateLimitAggregateType<T extends RateLimitAggregateArgs> = {
        [P in keyof T & keyof AggregateRateLimit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRateLimit[P]>
      : GetScalarType<T[P], AggregateRateLimit[P]>
  }




  export type RateLimitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RateLimitWhereInput
    orderBy?: RateLimitOrderByWithAggregationInput | RateLimitOrderByWithAggregationInput[]
    by: RateLimitScalarFieldEnum[] | RateLimitScalarFieldEnum
    having?: RateLimitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RateLimitCountAggregateInputType | true
    _avg?: RateLimitAvgAggregateInputType
    _sum?: RateLimitSumAggregateInputType
    _min?: RateLimitMinAggregateInputType
    _max?: RateLimitMaxAggregateInputType
  }

  export type RateLimitGroupByOutputType = {
    id: string
    identifier: string
    identifierType: $Enums.RateLimitType
    requestCount: number
    windowStart: Date
    windowEnd: Date
    resource: string | null
    blocked: boolean
    blockedUntil: Date | null
    createdAt: Date
    updatedAt: Date
    _count: RateLimitCountAggregateOutputType | null
    _avg: RateLimitAvgAggregateOutputType | null
    _sum: RateLimitSumAggregateOutputType | null
    _min: RateLimitMinAggregateOutputType | null
    _max: RateLimitMaxAggregateOutputType | null
  }

  type GetRateLimitGroupByPayload<T extends RateLimitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RateLimitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RateLimitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RateLimitGroupByOutputType[P]>
            : GetScalarType<T[P], RateLimitGroupByOutputType[P]>
        }
      >
    >


  export type RateLimitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    identifierType?: boolean
    requestCount?: boolean
    windowStart?: boolean
    windowEnd?: boolean
    resource?: boolean
    blocked?: boolean
    blockedUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rateLimit"]>

  export type RateLimitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    identifierType?: boolean
    requestCount?: boolean
    windowStart?: boolean
    windowEnd?: boolean
    resource?: boolean
    blocked?: boolean
    blockedUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rateLimit"]>

  export type RateLimitSelectScalar = {
    id?: boolean
    identifier?: boolean
    identifierType?: boolean
    requestCount?: boolean
    windowStart?: boolean
    windowEnd?: boolean
    resource?: boolean
    blocked?: boolean
    blockedUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $RateLimitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RateLimit"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      identifierType: $Enums.RateLimitType
      requestCount: number
      windowStart: Date
      windowEnd: Date
      resource: string | null
      blocked: boolean
      blockedUntil: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rateLimit"]>
    composites: {}
  }

  type RateLimitGetPayload<S extends boolean | null | undefined | RateLimitDefaultArgs> = $Result.GetResult<Prisma.$RateLimitPayload, S>

  type RateLimitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RateLimitFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RateLimitCountAggregateInputType | true
    }

  export interface RateLimitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RateLimit'], meta: { name: 'RateLimit' } }
    /**
     * Find zero or one RateLimit that matches the filter.
     * @param {RateLimitFindUniqueArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RateLimitFindUniqueArgs>(args: SelectSubset<T, RateLimitFindUniqueArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RateLimit that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RateLimitFindUniqueOrThrowArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RateLimitFindUniqueOrThrowArgs>(args: SelectSubset<T, RateLimitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RateLimit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitFindFirstArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RateLimitFindFirstArgs>(args?: SelectSubset<T, RateLimitFindFirstArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RateLimit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitFindFirstOrThrowArgs} args - Arguments to find a RateLimit
     * @example
     * // Get one RateLimit
     * const rateLimit = await prisma.rateLimit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RateLimitFindFirstOrThrowArgs>(args?: SelectSubset<T, RateLimitFindFirstOrThrowArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RateLimits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RateLimits
     * const rateLimits = await prisma.rateLimit.findMany()
     * 
     * // Get first 10 RateLimits
     * const rateLimits = await prisma.rateLimit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rateLimitWithIdOnly = await prisma.rateLimit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RateLimitFindManyArgs>(args?: SelectSubset<T, RateLimitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RateLimit.
     * @param {RateLimitCreateArgs} args - Arguments to create a RateLimit.
     * @example
     * // Create one RateLimit
     * const RateLimit = await prisma.rateLimit.create({
     *   data: {
     *     // ... data to create a RateLimit
     *   }
     * })
     * 
     */
    create<T extends RateLimitCreateArgs>(args: SelectSubset<T, RateLimitCreateArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RateLimits.
     * @param {RateLimitCreateManyArgs} args - Arguments to create many RateLimits.
     * @example
     * // Create many RateLimits
     * const rateLimit = await prisma.rateLimit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RateLimitCreateManyArgs>(args?: SelectSubset<T, RateLimitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RateLimits and returns the data saved in the database.
     * @param {RateLimitCreateManyAndReturnArgs} args - Arguments to create many RateLimits.
     * @example
     * // Create many RateLimits
     * const rateLimit = await prisma.rateLimit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RateLimits and only return the `id`
     * const rateLimitWithIdOnly = await prisma.rateLimit.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RateLimitCreateManyAndReturnArgs>(args?: SelectSubset<T, RateLimitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RateLimit.
     * @param {RateLimitDeleteArgs} args - Arguments to delete one RateLimit.
     * @example
     * // Delete one RateLimit
     * const RateLimit = await prisma.rateLimit.delete({
     *   where: {
     *     // ... filter to delete one RateLimit
     *   }
     * })
     * 
     */
    delete<T extends RateLimitDeleteArgs>(args: SelectSubset<T, RateLimitDeleteArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RateLimit.
     * @param {RateLimitUpdateArgs} args - Arguments to update one RateLimit.
     * @example
     * // Update one RateLimit
     * const rateLimit = await prisma.rateLimit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RateLimitUpdateArgs>(args: SelectSubset<T, RateLimitUpdateArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RateLimits.
     * @param {RateLimitDeleteManyArgs} args - Arguments to filter RateLimits to delete.
     * @example
     * // Delete a few RateLimits
     * const { count } = await prisma.rateLimit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RateLimitDeleteManyArgs>(args?: SelectSubset<T, RateLimitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RateLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RateLimits
     * const rateLimit = await prisma.rateLimit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RateLimitUpdateManyArgs>(args: SelectSubset<T, RateLimitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RateLimit.
     * @param {RateLimitUpsertArgs} args - Arguments to update or create a RateLimit.
     * @example
     * // Update or create a RateLimit
     * const rateLimit = await prisma.rateLimit.upsert({
     *   create: {
     *     // ... data to create a RateLimit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RateLimit we want to update
     *   }
     * })
     */
    upsert<T extends RateLimitUpsertArgs>(args: SelectSubset<T, RateLimitUpsertArgs<ExtArgs>>): Prisma__RateLimitClient<$Result.GetResult<Prisma.$RateLimitPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RateLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitCountArgs} args - Arguments to filter RateLimits to count.
     * @example
     * // Count the number of RateLimits
     * const count = await prisma.rateLimit.count({
     *   where: {
     *     // ... the filter for the RateLimits we want to count
     *   }
     * })
    **/
    count<T extends RateLimitCountArgs>(
      args?: Subset<T, RateLimitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RateLimitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RateLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RateLimitAggregateArgs>(args: Subset<T, RateLimitAggregateArgs>): Prisma.PrismaPromise<GetRateLimitAggregateType<T>>

    /**
     * Group by RateLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RateLimitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RateLimitGroupByArgs['orderBy'] }
        : { orderBy?: RateLimitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RateLimitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRateLimitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RateLimit model
   */
  readonly fields: RateLimitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RateLimit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RateLimitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RateLimit model
   */ 
  interface RateLimitFieldRefs {
    readonly id: FieldRef<"RateLimit", 'String'>
    readonly identifier: FieldRef<"RateLimit", 'String'>
    readonly identifierType: FieldRef<"RateLimit", 'RateLimitType'>
    readonly requestCount: FieldRef<"RateLimit", 'Int'>
    readonly windowStart: FieldRef<"RateLimit", 'DateTime'>
    readonly windowEnd: FieldRef<"RateLimit", 'DateTime'>
    readonly resource: FieldRef<"RateLimit", 'String'>
    readonly blocked: FieldRef<"RateLimit", 'Boolean'>
    readonly blockedUntil: FieldRef<"RateLimit", 'DateTime'>
    readonly createdAt: FieldRef<"RateLimit", 'DateTime'>
    readonly updatedAt: FieldRef<"RateLimit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RateLimit findUnique
   */
  export type RateLimitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where: RateLimitWhereUniqueInput
  }

  /**
   * RateLimit findUniqueOrThrow
   */
  export type RateLimitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where: RateLimitWhereUniqueInput
  }

  /**
   * RateLimit findFirst
   */
  export type RateLimitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RateLimits.
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RateLimits.
     */
    distinct?: RateLimitScalarFieldEnum | RateLimitScalarFieldEnum[]
  }

  /**
   * RateLimit findFirstOrThrow
   */
  export type RateLimitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Filter, which RateLimit to fetch.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RateLimits.
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RateLimits.
     */
    distinct?: RateLimitScalarFieldEnum | RateLimitScalarFieldEnum[]
  }

  /**
   * RateLimit findMany
   */
  export type RateLimitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Filter, which RateLimits to fetch.
     */
    where?: RateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimits to fetch.
     */
    orderBy?: RateLimitOrderByWithRelationInput | RateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RateLimits.
     */
    cursor?: RateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimits.
     */
    skip?: number
    distinct?: RateLimitScalarFieldEnum | RateLimitScalarFieldEnum[]
  }

  /**
   * RateLimit create
   */
  export type RateLimitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * The data needed to create a RateLimit.
     */
    data: XOR<RateLimitCreateInput, RateLimitUncheckedCreateInput>
  }

  /**
   * RateLimit createMany
   */
  export type RateLimitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RateLimits.
     */
    data: RateLimitCreateManyInput | RateLimitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RateLimit createManyAndReturn
   */
  export type RateLimitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RateLimits.
     */
    data: RateLimitCreateManyInput | RateLimitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RateLimit update
   */
  export type RateLimitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * The data needed to update a RateLimit.
     */
    data: XOR<RateLimitUpdateInput, RateLimitUncheckedUpdateInput>
    /**
     * Choose, which RateLimit to update.
     */
    where: RateLimitWhereUniqueInput
  }

  /**
   * RateLimit updateMany
   */
  export type RateLimitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RateLimits.
     */
    data: XOR<RateLimitUpdateManyMutationInput, RateLimitUncheckedUpdateManyInput>
    /**
     * Filter which RateLimits to update
     */
    where?: RateLimitWhereInput
  }

  /**
   * RateLimit upsert
   */
  export type RateLimitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * The filter to search for the RateLimit to update in case it exists.
     */
    where: RateLimitWhereUniqueInput
    /**
     * In case the RateLimit found by the `where` argument doesn't exist, create a new RateLimit with this data.
     */
    create: XOR<RateLimitCreateInput, RateLimitUncheckedCreateInput>
    /**
     * In case the RateLimit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RateLimitUpdateInput, RateLimitUncheckedUpdateInput>
  }

  /**
   * RateLimit delete
   */
  export type RateLimitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
    /**
     * Filter which RateLimit to delete.
     */
    where: RateLimitWhereUniqueInput
  }

  /**
   * RateLimit deleteMany
   */
  export type RateLimitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RateLimits to delete
     */
    where?: RateLimitWhereInput
  }

  /**
   * RateLimit without action
   */
  export type RateLimitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimit
     */
    select?: RateLimitSelect<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    eventType: $Enums.AuditEventType | null
    paymentId: string | null
    ipAddress: string | null
    userAgent: string | null
    success: boolean | null
    errorCode: string | null
    errorMsg: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    eventType: $Enums.AuditEventType | null
    paymentId: string | null
    ipAddress: string | null
    userAgent: string | null
    success: boolean | null
    errorCode: string | null
    errorMsg: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    eventType: number
    eventData: number
    paymentId: number
    ipAddress: number
    userAgent: number
    success: number
    errorCode: number
    errorMsg: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    eventType?: true
    paymentId?: true
    ipAddress?: true
    userAgent?: true
    success?: true
    errorCode?: true
    errorMsg?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    eventType?: true
    paymentId?: true
    ipAddress?: true
    userAgent?: true
    success?: true
    errorCode?: true
    errorMsg?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    eventType?: true
    eventData?: true
    paymentId?: true
    ipAddress?: true
    userAgent?: true
    success?: true
    errorCode?: true
    errorMsg?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    eventType: $Enums.AuditEventType
    eventData: JsonValue
    paymentId: string | null
    ipAddress: string | null
    userAgent: string | null
    success: boolean
    errorCode: string | null
    errorMsg: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventType?: boolean
    eventData?: boolean
    paymentId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    success?: boolean
    errorCode?: boolean
    errorMsg?: boolean
    createdAt?: boolean
    payment?: boolean | AuditLog$paymentArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventType?: boolean
    eventData?: boolean
    paymentId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    success?: boolean
    errorCode?: boolean
    errorMsg?: boolean
    createdAt?: boolean
    payment?: boolean | AuditLog$paymentArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    eventType?: boolean
    eventData?: boolean
    paymentId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    success?: boolean
    errorCode?: boolean
    errorMsg?: boolean
    createdAt?: boolean
  }

  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | AuditLog$paymentArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | AuditLog$paymentArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      payment: Prisma.$PaymentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventType: $Enums.AuditEventType
      eventData: Prisma.JsonValue
      paymentId: string | null
      ipAddress: string | null
      userAgent: string | null
      success: boolean
      errorCode: string | null
      errorMsg: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payment<T extends AuditLog$paymentArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$paymentArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly eventType: FieldRef<"AuditLog", 'AuditEventType'>
    readonly eventData: FieldRef<"AuditLog", 'Json'>
    readonly paymentId: FieldRef<"AuditLog", 'String'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly success: FieldRef<"AuditLog", 'Boolean'>
    readonly errorCode: FieldRef<"AuditLog", 'String'>
    readonly errorMsg: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog.payment
   */
  export type AuditLog$paymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model SystemConfig
   */

  export type AggregateSystemConfig = {
    _count: SystemConfigCountAggregateOutputType | null
    _avg: SystemConfigAvgAggregateOutputType | null
    _sum: SystemConfigSumAggregateOutputType | null
    _min: SystemConfigMinAggregateOutputType | null
    _max: SystemConfigMaxAggregateOutputType | null
  }

  export type SystemConfigAvgAggregateOutputType = {
    version: number | null
  }

  export type SystemConfigSumAggregateOutputType = {
    version: number | null
  }

  export type SystemConfigMinAggregateOutputType = {
    id: string | null
    key: string | null
    description: string | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemConfigMaxAggregateOutputType = {
    id: string | null
    key: string | null
    description: string | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemConfigCountAggregateOutputType = {
    id: number
    key: number
    value: number
    description: number
    version: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SystemConfigAvgAggregateInputType = {
    version?: true
  }

  export type SystemConfigSumAggregateInputType = {
    version?: true
  }

  export type SystemConfigMinAggregateInputType = {
    id?: true
    key?: true
    description?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemConfigMaxAggregateInputType = {
    id?: true
    key?: true
    description?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemConfigCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    description?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SystemConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemConfig to aggregate.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemConfigs
    **/
    _count?: true | SystemConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SystemConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SystemConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemConfigMaxAggregateInputType
  }

  export type GetSystemConfigAggregateType<T extends SystemConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemConfig[P]>
      : GetScalarType<T[P], AggregateSystemConfig[P]>
  }




  export type SystemConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemConfigWhereInput
    orderBy?: SystemConfigOrderByWithAggregationInput | SystemConfigOrderByWithAggregationInput[]
    by: SystemConfigScalarFieldEnum[] | SystemConfigScalarFieldEnum
    having?: SystemConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemConfigCountAggregateInputType | true
    _avg?: SystemConfigAvgAggregateInputType
    _sum?: SystemConfigSumAggregateInputType
    _min?: SystemConfigMinAggregateInputType
    _max?: SystemConfigMaxAggregateInputType
  }

  export type SystemConfigGroupByOutputType = {
    id: string
    key: string
    value: JsonValue
    description: string | null
    version: number
    createdAt: Date
    updatedAt: Date
    _count: SystemConfigCountAggregateOutputType | null
    _avg: SystemConfigAvgAggregateOutputType | null
    _sum: SystemConfigSumAggregateOutputType | null
    _min: SystemConfigMinAggregateOutputType | null
    _max: SystemConfigMaxAggregateOutputType | null
  }

  type GetSystemConfigGroupByPayload<T extends SystemConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemConfigGroupByOutputType[P]>
            : GetScalarType<T[P], SystemConfigGroupByOutputType[P]>
        }
      >
    >


  export type SystemConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $SystemConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: Prisma.JsonValue
      description: string | null
      version: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["systemConfig"]>
    composites: {}
  }

  type SystemConfigGetPayload<S extends boolean | null | undefined | SystemConfigDefaultArgs> = $Result.GetResult<Prisma.$SystemConfigPayload, S>

  type SystemConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SystemConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SystemConfigCountAggregateInputType | true
    }

  export interface SystemConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemConfig'], meta: { name: 'SystemConfig' } }
    /**
     * Find zero or one SystemConfig that matches the filter.
     * @param {SystemConfigFindUniqueArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemConfigFindUniqueArgs>(args: SelectSubset<T, SystemConfigFindUniqueArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SystemConfig that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SystemConfigFindUniqueOrThrowArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SystemConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindFirstArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemConfigFindFirstArgs>(args?: SelectSubset<T, SystemConfigFindFirstArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SystemConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindFirstOrThrowArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SystemConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemConfigs
     * const systemConfigs = await prisma.systemConfig.findMany()
     * 
     * // Get first 10 SystemConfigs
     * const systemConfigs = await prisma.systemConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemConfigFindManyArgs>(args?: SelectSubset<T, SystemConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SystemConfig.
     * @param {SystemConfigCreateArgs} args - Arguments to create a SystemConfig.
     * @example
     * // Create one SystemConfig
     * const SystemConfig = await prisma.systemConfig.create({
     *   data: {
     *     // ... data to create a SystemConfig
     *   }
     * })
     * 
     */
    create<T extends SystemConfigCreateArgs>(args: SelectSubset<T, SystemConfigCreateArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SystemConfigs.
     * @param {SystemConfigCreateManyArgs} args - Arguments to create many SystemConfigs.
     * @example
     * // Create many SystemConfigs
     * const systemConfig = await prisma.systemConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemConfigCreateManyArgs>(args?: SelectSubset<T, SystemConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemConfigs and returns the data saved in the database.
     * @param {SystemConfigCreateManyAndReturnArgs} args - Arguments to create many SystemConfigs.
     * @example
     * // Create many SystemConfigs
     * const systemConfig = await prisma.systemConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemConfigs and only return the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SystemConfig.
     * @param {SystemConfigDeleteArgs} args - Arguments to delete one SystemConfig.
     * @example
     * // Delete one SystemConfig
     * const SystemConfig = await prisma.systemConfig.delete({
     *   where: {
     *     // ... filter to delete one SystemConfig
     *   }
     * })
     * 
     */
    delete<T extends SystemConfigDeleteArgs>(args: SelectSubset<T, SystemConfigDeleteArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SystemConfig.
     * @param {SystemConfigUpdateArgs} args - Arguments to update one SystemConfig.
     * @example
     * // Update one SystemConfig
     * const systemConfig = await prisma.systemConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemConfigUpdateArgs>(args: SelectSubset<T, SystemConfigUpdateArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SystemConfigs.
     * @param {SystemConfigDeleteManyArgs} args - Arguments to filter SystemConfigs to delete.
     * @example
     * // Delete a few SystemConfigs
     * const { count } = await prisma.systemConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemConfigDeleteManyArgs>(args?: SelectSubset<T, SystemConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemConfigs
     * const systemConfig = await prisma.systemConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemConfigUpdateManyArgs>(args: SelectSubset<T, SystemConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SystemConfig.
     * @param {SystemConfigUpsertArgs} args - Arguments to update or create a SystemConfig.
     * @example
     * // Update or create a SystemConfig
     * const systemConfig = await prisma.systemConfig.upsert({
     *   create: {
     *     // ... data to create a SystemConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemConfig we want to update
     *   }
     * })
     */
    upsert<T extends SystemConfigUpsertArgs>(args: SelectSubset<T, SystemConfigUpsertArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SystemConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigCountArgs} args - Arguments to filter SystemConfigs to count.
     * @example
     * // Count the number of SystemConfigs
     * const count = await prisma.systemConfig.count({
     *   where: {
     *     // ... the filter for the SystemConfigs we want to count
     *   }
     * })
    **/
    count<T extends SystemConfigCountArgs>(
      args?: Subset<T, SystemConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemConfigAggregateArgs>(args: Subset<T, SystemConfigAggregateArgs>): Prisma.PrismaPromise<GetSystemConfigAggregateType<T>>

    /**
     * Group by SystemConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemConfigGroupByArgs['orderBy'] }
        : { orderBy?: SystemConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemConfig model
   */
  readonly fields: SystemConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemConfig model
   */ 
  interface SystemConfigFieldRefs {
    readonly id: FieldRef<"SystemConfig", 'String'>
    readonly key: FieldRef<"SystemConfig", 'String'>
    readonly value: FieldRef<"SystemConfig", 'Json'>
    readonly description: FieldRef<"SystemConfig", 'String'>
    readonly version: FieldRef<"SystemConfig", 'Int'>
    readonly createdAt: FieldRef<"SystemConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"SystemConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemConfig findUnique
   */
  export type SystemConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig findUniqueOrThrow
   */
  export type SystemConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig findFirst
   */
  export type SystemConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemConfigs.
     */
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig findFirstOrThrow
   */
  export type SystemConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemConfigs.
     */
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig findMany
   */
  export type SystemConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Filter, which SystemConfigs to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig create
   */
  export type SystemConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * The data needed to create a SystemConfig.
     */
    data: XOR<SystemConfigCreateInput, SystemConfigUncheckedCreateInput>
  }

  /**
   * SystemConfig createMany
   */
  export type SystemConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemConfigs.
     */
    data: SystemConfigCreateManyInput | SystemConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemConfig createManyAndReturn
   */
  export type SystemConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SystemConfigs.
     */
    data: SystemConfigCreateManyInput | SystemConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemConfig update
   */
  export type SystemConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * The data needed to update a SystemConfig.
     */
    data: XOR<SystemConfigUpdateInput, SystemConfigUncheckedUpdateInput>
    /**
     * Choose, which SystemConfig to update.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig updateMany
   */
  export type SystemConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemConfigs.
     */
    data: XOR<SystemConfigUpdateManyMutationInput, SystemConfigUncheckedUpdateManyInput>
    /**
     * Filter which SystemConfigs to update
     */
    where?: SystemConfigWhereInput
  }

  /**
   * SystemConfig upsert
   */
  export type SystemConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * The filter to search for the SystemConfig to update in case it exists.
     */
    where: SystemConfigWhereUniqueInput
    /**
     * In case the SystemConfig found by the `where` argument doesn't exist, create a new SystemConfig with this data.
     */
    create: XOR<SystemConfigCreateInput, SystemConfigUncheckedCreateInput>
    /**
     * In case the SystemConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemConfigUpdateInput, SystemConfigUncheckedUpdateInput>
  }

  /**
   * SystemConfig delete
   */
  export type SystemConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Filter which SystemConfig to delete.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig deleteMany
   */
  export type SystemConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemConfigs to delete
     */
    where?: SystemConfigWhereInput
  }

  /**
   * SystemConfig without action
   */
  export type SystemConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    txHash: 'txHash',
    fromAddress: 'fromAddress',
    toAddress: 'toAddress',
    amount: 'amount',
    currency: 'currency',
    decimals: 'decimals',
    resource: 'resource',
    nonce: 'nonce',
    networkName: 'networkName',
    chainId: 'chainId',
    blockNumber: 'blockNumber',
    blockHash: 'blockHash',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    settledAt: 'settledAt',
    metadata: 'metadata'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const PaymentNonceScalarFieldEnum: {
    id: 'id',
    value: 'value',
    resource: 'resource',
    used: 'used',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent'
  };

  export type PaymentNonceScalarFieldEnum = (typeof PaymentNonceScalarFieldEnum)[keyof typeof PaymentNonceScalarFieldEnum]


  export const RateLimitScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    identifierType: 'identifierType',
    requestCount: 'requestCount',
    windowStart: 'windowStart',
    windowEnd: 'windowEnd',
    resource: 'resource',
    blocked: 'blocked',
    blockedUntil: 'blockedUntil',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RateLimitScalarFieldEnum = (typeof RateLimitScalarFieldEnum)[keyof typeof RateLimitScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    eventType: 'eventType',
    eventData: 'eventData',
    paymentId: 'paymentId',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    success: 'success',
    errorCode: 'errorCode',
    errorMsg: 'errorMsg',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SystemConfigScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    description: 'description',
    version: 'version',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SystemConfigScalarFieldEnum = (typeof SystemConfigScalarFieldEnum)[keyof typeof SystemConfigScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'RateLimitType'
   */
  export type EnumRateLimitTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RateLimitType'>
    


  /**
   * Reference to a field of type 'RateLimitType[]'
   */
  export type ListEnumRateLimitTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RateLimitType[]'>
    


  /**
   * Reference to a field of type 'AuditEventType'
   */
  export type EnumAuditEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditEventType'>
    


  /**
   * Reference to a field of type 'AuditEventType[]'
   */
  export type ListEnumAuditEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditEventType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: UuidFilter<"Payment"> | string
    txHash?: StringFilter<"Payment"> | string
    fromAddress?: StringFilter<"Payment"> | string
    toAddress?: StringFilter<"Payment"> | string
    amount?: StringFilter<"Payment"> | string
    currency?: StringFilter<"Payment"> | string
    decimals?: IntFilter<"Payment"> | number
    resource?: StringFilter<"Payment"> | string
    nonce?: StringFilter<"Payment"> | string
    networkName?: StringFilter<"Payment"> | string
    chainId?: IntFilter<"Payment"> | number
    blockNumber?: BigIntNullableFilter<"Payment"> | bigint | number | null
    blockHash?: StringNullableFilter<"Payment"> | string | null
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    settledAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    metadata?: JsonNullableFilter<"Payment">
    auditLogs?: AuditLogListRelationFilter
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    txHash?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    decimals?: SortOrder
    resource?: SortOrder
    nonce?: SortOrder
    networkName?: SortOrder
    chainId?: SortOrder
    blockNumber?: SortOrderInput | SortOrder
    blockHash?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settledAt?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    txHash?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    fromAddress?: StringFilter<"Payment"> | string
    toAddress?: StringFilter<"Payment"> | string
    amount?: StringFilter<"Payment"> | string
    currency?: StringFilter<"Payment"> | string
    decimals?: IntFilter<"Payment"> | number
    resource?: StringFilter<"Payment"> | string
    nonce?: StringFilter<"Payment"> | string
    networkName?: StringFilter<"Payment"> | string
    chainId?: IntFilter<"Payment"> | number
    blockNumber?: BigIntNullableFilter<"Payment"> | bigint | number | null
    blockHash?: StringNullableFilter<"Payment"> | string | null
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    settledAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    metadata?: JsonNullableFilter<"Payment">
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "txHash">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    txHash?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    decimals?: SortOrder
    resource?: SortOrder
    nonce?: SortOrder
    networkName?: SortOrder
    chainId?: SortOrder
    blockNumber?: SortOrderInput | SortOrder
    blockHash?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settledAt?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Payment"> | string
    txHash?: StringWithAggregatesFilter<"Payment"> | string
    fromAddress?: StringWithAggregatesFilter<"Payment"> | string
    toAddress?: StringWithAggregatesFilter<"Payment"> | string
    amount?: StringWithAggregatesFilter<"Payment"> | string
    currency?: StringWithAggregatesFilter<"Payment"> | string
    decimals?: IntWithAggregatesFilter<"Payment"> | number
    resource?: StringWithAggregatesFilter<"Payment"> | string
    nonce?: StringWithAggregatesFilter<"Payment"> | string
    networkName?: StringWithAggregatesFilter<"Payment"> | string
    chainId?: IntWithAggregatesFilter<"Payment"> | number
    blockNumber?: BigIntNullableWithAggregatesFilter<"Payment"> | bigint | number | null
    blockHash?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    settledAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Payment">
  }

  export type PaymentNonceWhereInput = {
    AND?: PaymentNonceWhereInput | PaymentNonceWhereInput[]
    OR?: PaymentNonceWhereInput[]
    NOT?: PaymentNonceWhereInput | PaymentNonceWhereInput[]
    id?: UuidFilter<"PaymentNonce"> | string
    value?: StringFilter<"PaymentNonce"> | string
    resource?: StringFilter<"PaymentNonce"> | string
    used?: BoolFilter<"PaymentNonce"> | boolean
    createdAt?: DateTimeFilter<"PaymentNonce"> | Date | string
    expiresAt?: DateTimeFilter<"PaymentNonce"> | Date | string
    usedAt?: DateTimeNullableFilter<"PaymentNonce"> | Date | string | null
    ipAddress?: StringNullableFilter<"PaymentNonce"> | string | null
    userAgent?: StringNullableFilter<"PaymentNonce"> | string | null
  }

  export type PaymentNonceOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
    resource?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
  }

  export type PaymentNonceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    value?: string
    AND?: PaymentNonceWhereInput | PaymentNonceWhereInput[]
    OR?: PaymentNonceWhereInput[]
    NOT?: PaymentNonceWhereInput | PaymentNonceWhereInput[]
    resource?: StringFilter<"PaymentNonce"> | string
    used?: BoolFilter<"PaymentNonce"> | boolean
    createdAt?: DateTimeFilter<"PaymentNonce"> | Date | string
    expiresAt?: DateTimeFilter<"PaymentNonce"> | Date | string
    usedAt?: DateTimeNullableFilter<"PaymentNonce"> | Date | string | null
    ipAddress?: StringNullableFilter<"PaymentNonce"> | string | null
    userAgent?: StringNullableFilter<"PaymentNonce"> | string | null
  }, "id" | "value">

  export type PaymentNonceOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    resource?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    _count?: PaymentNonceCountOrderByAggregateInput
    _max?: PaymentNonceMaxOrderByAggregateInput
    _min?: PaymentNonceMinOrderByAggregateInput
  }

  export type PaymentNonceScalarWhereWithAggregatesInput = {
    AND?: PaymentNonceScalarWhereWithAggregatesInput | PaymentNonceScalarWhereWithAggregatesInput[]
    OR?: PaymentNonceScalarWhereWithAggregatesInput[]
    NOT?: PaymentNonceScalarWhereWithAggregatesInput | PaymentNonceScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PaymentNonce"> | string
    value?: StringWithAggregatesFilter<"PaymentNonce"> | string
    resource?: StringWithAggregatesFilter<"PaymentNonce"> | string
    used?: BoolWithAggregatesFilter<"PaymentNonce"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PaymentNonce"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"PaymentNonce"> | Date | string
    usedAt?: DateTimeNullableWithAggregatesFilter<"PaymentNonce"> | Date | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"PaymentNonce"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"PaymentNonce"> | string | null
  }

  export type RateLimitWhereInput = {
    AND?: RateLimitWhereInput | RateLimitWhereInput[]
    OR?: RateLimitWhereInput[]
    NOT?: RateLimitWhereInput | RateLimitWhereInput[]
    id?: UuidFilter<"RateLimit"> | string
    identifier?: StringFilter<"RateLimit"> | string
    identifierType?: EnumRateLimitTypeFilter<"RateLimit"> | $Enums.RateLimitType
    requestCount?: IntFilter<"RateLimit"> | number
    windowStart?: DateTimeFilter<"RateLimit"> | Date | string
    windowEnd?: DateTimeFilter<"RateLimit"> | Date | string
    resource?: StringNullableFilter<"RateLimit"> | string | null
    blocked?: BoolFilter<"RateLimit"> | boolean
    blockedUntil?: DateTimeNullableFilter<"RateLimit"> | Date | string | null
    createdAt?: DateTimeFilter<"RateLimit"> | Date | string
    updatedAt?: DateTimeFilter<"RateLimit"> | Date | string
  }

  export type RateLimitOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    identifierType?: SortOrder
    requestCount?: SortOrder
    windowStart?: SortOrder
    windowEnd?: SortOrder
    resource?: SortOrderInput | SortOrder
    blocked?: SortOrder
    blockedUntil?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateLimitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    unique_rate_limit?: RateLimitUnique_rate_limitCompoundUniqueInput
    AND?: RateLimitWhereInput | RateLimitWhereInput[]
    OR?: RateLimitWhereInput[]
    NOT?: RateLimitWhereInput | RateLimitWhereInput[]
    identifier?: StringFilter<"RateLimit"> | string
    identifierType?: EnumRateLimitTypeFilter<"RateLimit"> | $Enums.RateLimitType
    requestCount?: IntFilter<"RateLimit"> | number
    windowStart?: DateTimeFilter<"RateLimit"> | Date | string
    windowEnd?: DateTimeFilter<"RateLimit"> | Date | string
    resource?: StringNullableFilter<"RateLimit"> | string | null
    blocked?: BoolFilter<"RateLimit"> | boolean
    blockedUntil?: DateTimeNullableFilter<"RateLimit"> | Date | string | null
    createdAt?: DateTimeFilter<"RateLimit"> | Date | string
    updatedAt?: DateTimeFilter<"RateLimit"> | Date | string
  }, "id" | "unique_rate_limit">

  export type RateLimitOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    identifierType?: SortOrder
    requestCount?: SortOrder
    windowStart?: SortOrder
    windowEnd?: SortOrder
    resource?: SortOrderInput | SortOrder
    blocked?: SortOrder
    blockedUntil?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RateLimitCountOrderByAggregateInput
    _avg?: RateLimitAvgOrderByAggregateInput
    _max?: RateLimitMaxOrderByAggregateInput
    _min?: RateLimitMinOrderByAggregateInput
    _sum?: RateLimitSumOrderByAggregateInput
  }

  export type RateLimitScalarWhereWithAggregatesInput = {
    AND?: RateLimitScalarWhereWithAggregatesInput | RateLimitScalarWhereWithAggregatesInput[]
    OR?: RateLimitScalarWhereWithAggregatesInput[]
    NOT?: RateLimitScalarWhereWithAggregatesInput | RateLimitScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"RateLimit"> | string
    identifier?: StringWithAggregatesFilter<"RateLimit"> | string
    identifierType?: EnumRateLimitTypeWithAggregatesFilter<"RateLimit"> | $Enums.RateLimitType
    requestCount?: IntWithAggregatesFilter<"RateLimit"> | number
    windowStart?: DateTimeWithAggregatesFilter<"RateLimit"> | Date | string
    windowEnd?: DateTimeWithAggregatesFilter<"RateLimit"> | Date | string
    resource?: StringNullableWithAggregatesFilter<"RateLimit"> | string | null
    blocked?: BoolWithAggregatesFilter<"RateLimit"> | boolean
    blockedUntil?: DateTimeNullableWithAggregatesFilter<"RateLimit"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RateLimit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RateLimit"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: UuidFilter<"AuditLog"> | string
    eventType?: EnumAuditEventTypeFilter<"AuditLog"> | $Enums.AuditEventType
    eventData?: JsonFilter<"AuditLog">
    paymentId?: UuidNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    success?: BoolFilter<"AuditLog"> | boolean
    errorCode?: StringNullableFilter<"AuditLog"> | string | null
    errorMsg?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    payment?: XOR<PaymentNullableRelationFilter, PaymentWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    eventType?: SortOrder
    eventData?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    success?: SortOrder
    errorCode?: SortOrderInput | SortOrder
    errorMsg?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    payment?: PaymentOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    eventType?: EnumAuditEventTypeFilter<"AuditLog"> | $Enums.AuditEventType
    eventData?: JsonFilter<"AuditLog">
    paymentId?: UuidNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    success?: BoolFilter<"AuditLog"> | boolean
    errorCode?: StringNullableFilter<"AuditLog"> | string | null
    errorMsg?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    payment?: XOR<PaymentNullableRelationFilter, PaymentWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    eventType?: SortOrder
    eventData?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    success?: SortOrder
    errorCode?: SortOrderInput | SortOrder
    errorMsg?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"AuditLog"> | string
    eventType?: EnumAuditEventTypeWithAggregatesFilter<"AuditLog"> | $Enums.AuditEventType
    eventData?: JsonWithAggregatesFilter<"AuditLog">
    paymentId?: UuidNullableWithAggregatesFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    success?: BoolWithAggregatesFilter<"AuditLog"> | boolean
    errorCode?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    errorMsg?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type SystemConfigWhereInput = {
    AND?: SystemConfigWhereInput | SystemConfigWhereInput[]
    OR?: SystemConfigWhereInput[]
    NOT?: SystemConfigWhereInput | SystemConfigWhereInput[]
    id?: UuidFilter<"SystemConfig"> | string
    key?: StringFilter<"SystemConfig"> | string
    value?: JsonFilter<"SystemConfig">
    description?: StringNullableFilter<"SystemConfig"> | string | null
    version?: IntFilter<"SystemConfig"> | number
    createdAt?: DateTimeFilter<"SystemConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SystemConfig"> | Date | string
  }

  export type SystemConfigOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: SystemConfigWhereInput | SystemConfigWhereInput[]
    OR?: SystemConfigWhereInput[]
    NOT?: SystemConfigWhereInput | SystemConfigWhereInput[]
    value?: JsonFilter<"SystemConfig">
    description?: StringNullableFilter<"SystemConfig"> | string | null
    version?: IntFilter<"SystemConfig"> | number
    createdAt?: DateTimeFilter<"SystemConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SystemConfig"> | Date | string
  }, "id" | "key">

  export type SystemConfigOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SystemConfigCountOrderByAggregateInput
    _avg?: SystemConfigAvgOrderByAggregateInput
    _max?: SystemConfigMaxOrderByAggregateInput
    _min?: SystemConfigMinOrderByAggregateInput
    _sum?: SystemConfigSumOrderByAggregateInput
  }

  export type SystemConfigScalarWhereWithAggregatesInput = {
    AND?: SystemConfigScalarWhereWithAggregatesInput | SystemConfigScalarWhereWithAggregatesInput[]
    OR?: SystemConfigScalarWhereWithAggregatesInput[]
    NOT?: SystemConfigScalarWhereWithAggregatesInput | SystemConfigScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"SystemConfig"> | string
    key?: StringWithAggregatesFilter<"SystemConfig"> | string
    value?: JsonWithAggregatesFilter<"SystemConfig">
    description?: StringNullableWithAggregatesFilter<"SystemConfig"> | string | null
    version?: IntWithAggregatesFilter<"SystemConfig"> | number
    createdAt?: DateTimeWithAggregatesFilter<"SystemConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SystemConfig"> | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    txHash: string
    fromAddress: string
    toAddress: string
    amount: string
    currency: string
    decimals: number
    resource: string
    nonce: string
    networkName: string
    chainId: number
    blockNumber?: bigint | number | null
    blockHash?: string | null
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    settledAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    auditLogs?: AuditLogCreateNestedManyWithoutPaymentInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    txHash: string
    fromAddress: string
    toAddress: string
    amount: string
    currency: string
    decimals: number
    resource: string
    nonce: string
    networkName: string
    chainId: number
    blockNumber?: bigint | number | null
    blockHash?: string | null
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    settledAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutPaymentInput
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: StringFieldUpdateOperationsInput | string
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    resource?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    networkName?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    auditLogs?: AuditLogUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: StringFieldUpdateOperationsInput | string
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    resource?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    networkName?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    auditLogs?: AuditLogUncheckedUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentCreateManyInput = {
    id?: string
    txHash: string
    fromAddress: string
    toAddress: string
    amount: string
    currency: string
    decimals: number
    resource: string
    nonce: string
    networkName: string
    chainId: number
    blockNumber?: bigint | number | null
    blockHash?: string | null
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    settledAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: StringFieldUpdateOperationsInput | string
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    resource?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    networkName?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: StringFieldUpdateOperationsInput | string
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    resource?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    networkName?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type PaymentNonceCreateInput = {
    id?: string
    value: string
    resource: string
    used?: boolean
    createdAt?: Date | string
    expiresAt: Date | string
    usedAt?: Date | string | null
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type PaymentNonceUncheckedCreateInput = {
    id?: string
    value: string
    resource: string
    used?: boolean
    createdAt?: Date | string
    expiresAt: Date | string
    usedAt?: Date | string | null
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type PaymentNonceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentNonceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentNonceCreateManyInput = {
    id?: string
    value: string
    resource: string
    used?: boolean
    createdAt?: Date | string
    expiresAt: Date | string
    usedAt?: Date | string | null
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type PaymentNonceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentNonceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RateLimitCreateInput = {
    id?: string
    identifier: string
    identifierType: $Enums.RateLimitType
    requestCount?: number
    windowStart: Date | string
    windowEnd: Date | string
    resource?: string | null
    blocked?: boolean
    blockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RateLimitUncheckedCreateInput = {
    id?: string
    identifier: string
    identifierType: $Enums.RateLimitType
    requestCount?: number
    windowStart: Date | string
    windowEnd: Date | string
    resource?: string | null
    blocked?: boolean
    blockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RateLimitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    identifierType?: EnumRateLimitTypeFieldUpdateOperationsInput | $Enums.RateLimitType
    requestCount?: IntFieldUpdateOperationsInput | number
    windowStart?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: BoolFieldUpdateOperationsInput | boolean
    blockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    identifierType?: EnumRateLimitTypeFieldUpdateOperationsInput | $Enums.RateLimitType
    requestCount?: IntFieldUpdateOperationsInput | number
    windowStart?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: BoolFieldUpdateOperationsInput | boolean
    blockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitCreateManyInput = {
    id?: string
    identifier: string
    identifierType: $Enums.RateLimitType
    requestCount?: number
    windowStart: Date | string
    windowEnd: Date | string
    resource?: string | null
    blocked?: boolean
    blockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RateLimitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    identifierType?: EnumRateLimitTypeFieldUpdateOperationsInput | $Enums.RateLimitType
    requestCount?: IntFieldUpdateOperationsInput | number
    windowStart?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: BoolFieldUpdateOperationsInput | boolean
    blockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    identifierType?: EnumRateLimitTypeFieldUpdateOperationsInput | $Enums.RateLimitType
    requestCount?: IntFieldUpdateOperationsInput | number
    windowStart?: DateTimeFieldUpdateOperationsInput | Date | string
    windowEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    resource?: NullableStringFieldUpdateOperationsInput | string | null
    blocked?: BoolFieldUpdateOperationsInput | boolean
    blockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    eventType: $Enums.AuditEventType
    eventData: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    success?: boolean
    errorCode?: string | null
    errorMsg?: string | null
    createdAt?: Date | string
    payment?: PaymentCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    eventType: $Enums.AuditEventType
    eventData: JsonNullValueInput | InputJsonValue
    paymentId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    success?: boolean
    errorCode?: string | null
    errorMsg?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType
    eventData?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType
    eventData?: JsonNullValueInput | InputJsonValue
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    eventType: $Enums.AuditEventType
    eventData: JsonNullValueInput | InputJsonValue
    paymentId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    success?: boolean
    errorCode?: string | null
    errorMsg?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType
    eventData?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType
    eventData?: JsonNullValueInput | InputJsonValue
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigCreateInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    description?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemConfigUncheckedCreateInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    description?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigCreateManyInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    description?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    txHash?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    decimals?: SortOrder
    resource?: SortOrder
    nonce?: SortOrder
    networkName?: SortOrder
    chainId?: SortOrder
    blockNumber?: SortOrder
    blockHash?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settledAt?: SortOrder
    metadata?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    decimals?: SortOrder
    chainId?: SortOrder
    blockNumber?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    txHash?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    decimals?: SortOrder
    resource?: SortOrder
    nonce?: SortOrder
    networkName?: SortOrder
    chainId?: SortOrder
    blockNumber?: SortOrder
    blockHash?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settledAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    txHash?: SortOrder
    fromAddress?: SortOrder
    toAddress?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    decimals?: SortOrder
    resource?: SortOrder
    nonce?: SortOrder
    networkName?: SortOrder
    chainId?: SortOrder
    blockNumber?: SortOrder
    blockHash?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settledAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    decimals?: SortOrder
    chainId?: SortOrder
    blockNumber?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PaymentNonceCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    resource?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
  }

  export type PaymentNonceMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    resource?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
  }

  export type PaymentNonceMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    resource?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumRateLimitTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RateLimitType | EnumRateLimitTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RateLimitType[] | ListEnumRateLimitTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RateLimitType[] | ListEnumRateLimitTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRateLimitTypeFilter<$PrismaModel> | $Enums.RateLimitType
  }

  export type RateLimitUnique_rate_limitCompoundUniqueInput = {
    identifier: string
    identifierType: $Enums.RateLimitType
    resource: string
  }

  export type RateLimitCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    identifierType?: SortOrder
    requestCount?: SortOrder
    windowStart?: SortOrder
    windowEnd?: SortOrder
    resource?: SortOrder
    blocked?: SortOrder
    blockedUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateLimitAvgOrderByAggregateInput = {
    requestCount?: SortOrder
  }

  export type RateLimitMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    identifierType?: SortOrder
    requestCount?: SortOrder
    windowStart?: SortOrder
    windowEnd?: SortOrder
    resource?: SortOrder
    blocked?: SortOrder
    blockedUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateLimitMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    identifierType?: SortOrder
    requestCount?: SortOrder
    windowStart?: SortOrder
    windowEnd?: SortOrder
    resource?: SortOrder
    blocked?: SortOrder
    blockedUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RateLimitSumOrderByAggregateInput = {
    requestCount?: SortOrder
  }

  export type EnumRateLimitTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RateLimitType | EnumRateLimitTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RateLimitType[] | ListEnumRateLimitTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RateLimitType[] | ListEnumRateLimitTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRateLimitTypeWithAggregatesFilter<$PrismaModel> | $Enums.RateLimitType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRateLimitTypeFilter<$PrismaModel>
    _max?: NestedEnumRateLimitTypeFilter<$PrismaModel>
  }

  export type EnumAuditEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditEventType | EnumAuditEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuditEventType[] | ListEnumAuditEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditEventType[] | ListEnumAuditEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditEventTypeFilter<$PrismaModel> | $Enums.AuditEventType
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type PaymentNullableRelationFilter = {
    is?: PaymentWhereInput | null
    isNot?: PaymentWhereInput | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    eventData?: SortOrder
    paymentId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    success?: SortOrder
    errorCode?: SortOrder
    errorMsg?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    paymentId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    success?: SortOrder
    errorCode?: SortOrder
    errorMsg?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    paymentId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    success?: SortOrder
    errorCode?: SortOrder
    errorMsg?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAuditEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditEventType | EnumAuditEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuditEventType[] | ListEnumAuditEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditEventType[] | ListEnumAuditEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.AuditEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditEventTypeFilter<$PrismaModel>
    _max?: NestedEnumAuditEventTypeFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type SystemConfigCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type SystemConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    description?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    description?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type AuditLogCreateNestedManyWithoutPaymentInput = {
    create?: XOR<AuditLogCreateWithoutPaymentInput, AuditLogUncheckedCreateWithoutPaymentInput> | AuditLogCreateWithoutPaymentInput[] | AuditLogUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPaymentInput | AuditLogCreateOrConnectWithoutPaymentInput[]
    createMany?: AuditLogCreateManyPaymentInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutPaymentInput = {
    create?: XOR<AuditLogCreateWithoutPaymentInput, AuditLogUncheckedCreateWithoutPaymentInput> | AuditLogCreateWithoutPaymentInput[] | AuditLogUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPaymentInput | AuditLogCreateOrConnectWithoutPaymentInput[]
    createMany?: AuditLogCreateManyPaymentInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AuditLogUpdateManyWithoutPaymentNestedInput = {
    create?: XOR<AuditLogCreateWithoutPaymentInput, AuditLogUncheckedCreateWithoutPaymentInput> | AuditLogCreateWithoutPaymentInput[] | AuditLogUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPaymentInput | AuditLogCreateOrConnectWithoutPaymentInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutPaymentInput | AuditLogUpsertWithWhereUniqueWithoutPaymentInput[]
    createMany?: AuditLogCreateManyPaymentInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutPaymentInput | AuditLogUpdateWithWhereUniqueWithoutPaymentInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutPaymentInput | AuditLogUpdateManyWithWhereWithoutPaymentInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutPaymentNestedInput = {
    create?: XOR<AuditLogCreateWithoutPaymentInput, AuditLogUncheckedCreateWithoutPaymentInput> | AuditLogCreateWithoutPaymentInput[] | AuditLogUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPaymentInput | AuditLogCreateOrConnectWithoutPaymentInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutPaymentInput | AuditLogUpsertWithWhereUniqueWithoutPaymentInput[]
    createMany?: AuditLogCreateManyPaymentInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutPaymentInput | AuditLogUpdateWithWhereUniqueWithoutPaymentInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutPaymentInput | AuditLogUpdateManyWithWhereWithoutPaymentInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumRateLimitTypeFieldUpdateOperationsInput = {
    set?: $Enums.RateLimitType
  }

  export type PaymentCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<PaymentCreateWithoutAuditLogsInput, PaymentUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutAuditLogsInput
    connect?: PaymentWhereUniqueInput
  }

  export type EnumAuditEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.AuditEventType
  }

  export type PaymentUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<PaymentCreateWithoutAuditLogsInput, PaymentUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutAuditLogsInput
    upsert?: PaymentUpsertWithoutAuditLogsInput
    disconnect?: PaymentWhereInput | boolean
    delete?: PaymentWhereInput | boolean
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutAuditLogsInput, PaymentUpdateWithoutAuditLogsInput>, PaymentUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumRateLimitTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RateLimitType | EnumRateLimitTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RateLimitType[] | ListEnumRateLimitTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RateLimitType[] | ListEnumRateLimitTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRateLimitTypeFilter<$PrismaModel> | $Enums.RateLimitType
  }

  export type NestedEnumRateLimitTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RateLimitType | EnumRateLimitTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RateLimitType[] | ListEnumRateLimitTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RateLimitType[] | ListEnumRateLimitTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRateLimitTypeWithAggregatesFilter<$PrismaModel> | $Enums.RateLimitType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRateLimitTypeFilter<$PrismaModel>
    _max?: NestedEnumRateLimitTypeFilter<$PrismaModel>
  }

  export type NestedEnumAuditEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditEventType | EnumAuditEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuditEventType[] | ListEnumAuditEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditEventType[] | ListEnumAuditEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditEventTypeFilter<$PrismaModel> | $Enums.AuditEventType
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumAuditEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditEventType | EnumAuditEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AuditEventType[] | ListEnumAuditEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditEventType[] | ListEnumAuditEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.AuditEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditEventTypeFilter<$PrismaModel>
    _max?: NestedEnumAuditEventTypeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type AuditLogCreateWithoutPaymentInput = {
    id?: string
    eventType: $Enums.AuditEventType
    eventData: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    success?: boolean
    errorCode?: string | null
    errorMsg?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutPaymentInput = {
    id?: string
    eventType: $Enums.AuditEventType
    eventData: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    success?: boolean
    errorCode?: string | null
    errorMsg?: string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutPaymentInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutPaymentInput, AuditLogUncheckedCreateWithoutPaymentInput>
  }

  export type AuditLogCreateManyPaymentInputEnvelope = {
    data: AuditLogCreateManyPaymentInput | AuditLogCreateManyPaymentInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogUpsertWithWhereUniqueWithoutPaymentInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutPaymentInput, AuditLogUncheckedUpdateWithoutPaymentInput>
    create: XOR<AuditLogCreateWithoutPaymentInput, AuditLogUncheckedCreateWithoutPaymentInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutPaymentInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutPaymentInput, AuditLogUncheckedUpdateWithoutPaymentInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutPaymentInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutPaymentInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: UuidFilter<"AuditLog"> | string
    eventType?: EnumAuditEventTypeFilter<"AuditLog"> | $Enums.AuditEventType
    eventData?: JsonFilter<"AuditLog">
    paymentId?: UuidNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    success?: BoolFilter<"AuditLog"> | boolean
    errorCode?: StringNullableFilter<"AuditLog"> | string | null
    errorMsg?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type PaymentCreateWithoutAuditLogsInput = {
    id?: string
    txHash: string
    fromAddress: string
    toAddress: string
    amount: string
    currency: string
    decimals: number
    resource: string
    nonce: string
    networkName: string
    chainId: number
    blockNumber?: bigint | number | null
    blockHash?: string | null
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    settledAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type PaymentUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    txHash: string
    fromAddress: string
    toAddress: string
    amount: string
    currency: string
    decimals: number
    resource: string
    nonce: string
    networkName: string
    chainId: number
    blockNumber?: bigint | number | null
    blockHash?: string | null
    status?: $Enums.PaymentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    settledAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type PaymentCreateOrConnectWithoutAuditLogsInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutAuditLogsInput, PaymentUncheckedCreateWithoutAuditLogsInput>
  }

  export type PaymentUpsertWithoutAuditLogsInput = {
    update: XOR<PaymentUpdateWithoutAuditLogsInput, PaymentUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<PaymentCreateWithoutAuditLogsInput, PaymentUncheckedCreateWithoutAuditLogsInput>
    where?: PaymentWhereInput
  }

  export type PaymentUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: PaymentWhereInput
    data: XOR<PaymentUpdateWithoutAuditLogsInput, PaymentUncheckedUpdateWithoutAuditLogsInput>
  }

  export type PaymentUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: StringFieldUpdateOperationsInput | string
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    resource?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    networkName?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type PaymentUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: StringFieldUpdateOperationsInput | string
    fromAddress?: StringFieldUpdateOperationsInput | string
    toAddress?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    resource?: StringFieldUpdateOperationsInput | string
    nonce?: StringFieldUpdateOperationsInput | string
    networkName?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    blockHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AuditLogCreateManyPaymentInput = {
    id?: string
    eventType: $Enums.AuditEventType
    eventData: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    success?: boolean
    errorCode?: string | null
    errorMsg?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType
    eventData?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType
    eventData?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: EnumAuditEventTypeFieldUpdateOperationsInput | $Enums.AuditEventType
    eventData?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PaymentCountOutputTypeDefaultArgs instead
     */
    export type PaymentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaymentDefaultArgs instead
     */
    export type PaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaymentNonceDefaultArgs instead
     */
    export type PaymentNonceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentNonceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RateLimitDefaultArgs instead
     */
    export type RateLimitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RateLimitDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SystemConfigDefaultArgs instead
     */
    export type SystemConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SystemConfigDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}