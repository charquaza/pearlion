const multer = require('multer');

exports.imageUpload = multer({
   storage: multer.memoryStorage(),
   fileFilter: (req, file, cb) => {
      const allowedImageTypes = [
         'image/apng',
         'image/avif',
         'image/gif',
         'image/jpeg',
         'image/png',
         'image/svg+xml',
         'image/webp'
      ];

      if (allowedImageTypes.includes(file.mimetype)) {
         cb(null, true); 
      } else {
         cb(new Error('Invalid file type: please submit an image of the following types - APNG, AVIF, GIF, JPEG, PNG, SVG, WebP'), false);
      }
   }
});
