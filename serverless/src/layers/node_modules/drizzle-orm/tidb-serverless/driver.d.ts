import type { Connection } from '@tidbcloud/serverless';
import type { Logger } from "../logger.js";
import { MySqlDatabase } from "../mysql-core/db.js";
import type { DrizzleConfig } from "../utils.js";
import type { TiDBServerlessPreparedQueryHKT, TiDBServerlessQueryResultHKT } from "./session.js";
export interface TiDBServerlessSDriverOptions {
    logger?: Logger;
}
export type TiDBServerlessDatabase<TSchema extends Record<string, unknown> = Record<string, never>> = MySqlDatabase<TiDBServerlessQueryResultHKT, TiDBServerlessPreparedQueryHKT, TSchema>;
export declare function drizzle<TSchema extends Record<string, unknown> = Record<string, never>>(client: Connection, config?: DrizzleConfig<TSchema>): TiDBServerlessDatabase<TSchema>;
