import { existsSync } from 'fs';
import { resolve } from 'path';
import YAML = require('yamljs');
import { Config } from 'configs';

enum Env {
  local = 'local',
  dev = 'dev',
  qa = 'qa',
  prd = 'prd',
}

const _checkConfigFile = (env?: Env): string | undefined => {
  const fileName = `${env ?? Env.local}.yml`;
  // 프로젝트 루트 기준 (node 실행 위치가 프로젝트 루트라고 가정)
  const filePath = resolve(process.cwd(), 'configs', 'conf', fileName);
  // 디버깅용 출력
  // console.log('[config]', filePath);
  return existsSync(filePath) ? filePath : undefined;
};

const _loadConfig = <T = Record<string, any>>(filePath: string | undefined): T => {
  return filePath ? YAML.load(filePath) as T : ({} as T);
};

export default (): Config => {
  const env = Env.local;
  const envConfigFile = _checkConfigFile(env);
  const envConfig = _loadConfig(envConfigFile);
  return envConfig as Config;
};
