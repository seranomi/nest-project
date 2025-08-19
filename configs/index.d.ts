import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"

export interface AuthConfig {
	jwt: {
		secret: string;
		signOptions?: {
			expiresIn: string;
		};
	};
}

export type Config = {
	db: MysqlConnectionOptions
}