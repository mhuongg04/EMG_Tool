import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import clientS3 from "../configs/s3client";

const createGetPresignedUrl = async (key: any) => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  });
  const url = await getSignedUrl(clientS3, command, {
    expiresIn: 3600,
  });
  return url;
};

const createPutPresignedUrl = async (key: any) => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  });
  const url = await getSignedUrl(clientS3, command, {
    expiresIn: 3600,
  });
  return url;
};

export { createGetPresignedUrl, createPutPresignedUrl };
