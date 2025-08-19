import { Module } from "@nestjs/common";
import { MysqlService } from "configs/mysql/mysql.service";


@Module({
	providers: [MysqlService],
	exports: [MysqlService],
})
export class MysqlModule {}