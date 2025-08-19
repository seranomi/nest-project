import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthConfig } from "configs";
import { AuthService } from "./auth.service";
import { AuthController } from "src/controllers/auth.controller";
import { PassportModule } from "@nestjs/passport";

@Module({
	imports: [
		UserModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const authConfig = configService.get<AuthConfig>('auth');
				if(!authConfig || !authConfig.jwt) {
					throw new Error('JWT 환경변수 미설정');
				}
				return authConfig.jwt;
			},
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService],
})

export class AuthModule {}