import type { Connection } from '@tidbcloud/serverless';
import type { Logger } from "../logger.cjs";
import { MySqlDatabase } from "../mysql-core/db.cjs";
import type { DrizzleConfig } from "../utils.cjs";
import type { TiDBServerlessPreparedQueryHKT, TiDBServerlessQueryResultHKT } from "./session.cjs";
export interface TiDBServerlessSDriverOptions {
    logger?: Logger;
}
export type TiDBServerlessDatabase<TSchema extends Record<string, unknown> = Record<string, never>> = MySqlDatabase<TiDBServerlessQueryResultHKT, TiDBServerlessPreparedQueryHKT, TSchema>;
export declare function drizzle<TSchema extends Record<string, unknown> = Record<string, never>>(client: Connection, config?: DrizzleConfig<TSchema>): TiDBServerlessDatabase<TSchema>;
