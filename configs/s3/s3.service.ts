import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class S3Service {
  private s3ConfigOptions: any;
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.s3ConfigOptions = this.configService.get('s3');
    this.s3 = new S3Client({
      region: this.s3ConfigOptions.region,
      credentials: {
        accessKeyId: this.s3ConfigOptions.accessKeyId,
        secretAccessKey: this.s3ConfigOptions.secretAccessKey,
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const extension = path.extname(file.originalname);
    const key = `artworks/${uuid()}${extension}`;
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.s3ConfigOptions.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return `https://${this.s3ConfigOptions.bucket}.s3.${this.s3ConfigOptions.region}.amazonaws.com/${key}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const key = fileUrl.split('.amazonaws.com/')[1];
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.s3ConfigOptions.bucket,
        Key: key,
      }),
    );
  }

  async updateFile(fileUrl: string, file: Express.Multer.File): Promise<string> {
    await this.deleteFile(fileUrl);
    const updatedUrl = await this.uploadFile(file);
    return updatedUrl;
  }
}
