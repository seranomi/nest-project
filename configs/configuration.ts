import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import YAML = require('yamljs');
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

enum Env {
  local = 'local',
  dev = 'dev',
  qa = 'qa',
  prd = 'prd',
}

/** 1) .env 로드 + expand */
const envPath = resolve(process.cwd(), '.env');
const envResult = dotenv.config({ path: envPath });
dotenvExpand.expand(envResult);
if (envResult.error) {
  console.warn('[config] .env load error:', envResult.error.message);
} else {
  console.log('[config] .env loaded from', envPath);
}

/** 2) ${VAR} 치환 (기본값 문법 ${VAR:-default} 지원) */
const interpolate = (text: string): string =>
  text.replace(/\$\{([A-Z0-9_]+)(:-([^}]*))?\}/gi, (_m, key: string, _d: string, def: string | undefined) => {
    const val = process.env[key];
    return (val ?? (def ?? '')).toString();
  });

const configPath = (env?: Env): string => {
  const fileName = `${env ?? Env.local}.yml`;
  return resolve(process.cwd(), 'configs', 'conf', fileName);
};

const loadYaml = (filePath: string) => {
  if (!existsSync(filePath)) {
    console.warn('[config] YAML not found:', filePath);
    return {};
  }
  const raw = readFileSync(filePath, 'utf8');
  const expanded = interpolate(raw);

  try {
    return YAML.parse(expanded) ?? {};
  } catch (e: any) {
    console.error('[config] YAML parse error:', e.message);
    throw e;
  }
};

export default () => {
  const env = (process.env.APP_ENV as Env) ?? Env.local;
  const filePath = configPath(env);
  const cfg: any = loadYaml(filePath);

  // ---- 여기서부터 검증 & 보정 ----
  // db.type 읽기 (당신 YAML은 db 아래에 존재)
  const db = cfg?.db ?? {};
  const finalType = (db?.type ?? process.env.DB_TYPE ?? '').toString().trim();

  console.log('[config] resolved DB_TYPE =', finalType || '(empty)');

  if (!finalType) {
    throw new Error('Missing required config: type (DB_TYPE)');
  }

  const supported = [
    'mysql','mariadb','postgres','sqlite','better-sqlite3','mongodb',
    'cockroachdb','mssql','oracle','aurora-mysql','aurora-postgres','sqljs','sap','spanner'
  ];
  if (!supported.includes(finalType)) {
    throw new Error(`Unsupported DB driver: ${finalType}`);
  }

  // 숫자 보정
  const portNum = Number(db?.port);
  cfg.db = {
    ...db,
    type: finalType,
    port: Number.isFinite(portNum) ? portNum : undefined,
  };

  return cfg; // { db: {...}, auth: {...}, s3: {...}, openai: {...} }
};
