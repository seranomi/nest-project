import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

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
    const key = `artworks/${uuid()}-${file.originalname}`;
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
}
