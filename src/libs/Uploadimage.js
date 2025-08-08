import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME,
} = process.env;

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

class UploadImage {
  async upload(key, base64, mime) {
    try {
      const buffer = Buffer.from(
        base64.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );

      const command = new PutObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentEncoding: "base64",
        ContentType: mime || "image/jpeg",
        ACL: "public-read",
      });

      const result = await s3.send(command);

      return {
        ...result,
        Location: `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`,
        Key: key,
      };

    } catch (error) {
      return { error };
    }
  }
 async delete(key) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: key,
    });

    const response = await s3.send(command);
    return response;
  } catch (error) {
    return { error };
  }
}
 
}

export default new UploadImage();
