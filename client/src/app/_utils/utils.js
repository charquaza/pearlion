export function isValidImageType(file) {
   const allowedImageTypes = [
      'image/apng',
      'image/avif',
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/webp'
   ];

   return allowedImageTypes.includes(file.type);
};

export function formatFileSize(number) {
   if (number < 1e3) {
      return `${number} bytes`;
   } else if (number >= 1e3 && number < 1e6) {
      return `${(number / 1e3).toFixed(1)} KB`;
   } else {
      return `${(number / 1e6).toFixed(1)} MB`;
   }
};

export const currencyFormat = new Intl.NumberFormat('en-US', { 
   style: 'currency', currency: 'USD', currencyDisplay: 'symbol',
   maximumFractionDigits: 0 
});