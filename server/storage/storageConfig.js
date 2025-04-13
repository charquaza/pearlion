const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
   keyFilename: process.env.GCS_KEY_PATH
});

const bucketName = process.env.GCS_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

module.exports = { storage, bucket };