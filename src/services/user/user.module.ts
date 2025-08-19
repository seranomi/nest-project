import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/models/entities/user.entity";
import { UserService } from "./user.service";
import { UserController } from "src/controllers/user.controller";

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}