'use strict';

const fs = require('fs');
const path = require('path');
const { Product, Image, ProductImage } = require('../models/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async t => {
      try {
        const productListPromise = Product.bulkCreate([
          //earrings
          {
            name: 'Blue Earrings',
            description: 'Blue earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
            category: 'earrings', 
            price: 30, 
            quantityInStock: 10, 
            status: 'for sale'
          }, 
          { 
            name: 'Diamond Cluster Earrings', 
            description: 'Diamond Cluster earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
            category: 'earrings', 
            price: 250, 
            quantityInStock: 3, 
            status: 'not for sale'
          }, 
          { 
            name: 'Diamond Earrings', 
            description: 'Diamond earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
            category: 'earrings', 
            price: 500, 
            quantityInStock: 1, 
            status: 'not for sale'
          }, 
          { 
            name: 'Emerald Flower Earrings', 
            description: 'Emerald Flower earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
            category: 'earrings', 
            price: 85, 
            quantityInStock: 2, 
            status: 'for sale'
          }, 
          { 
            name: 'Gold Earrings', 
            description: 'Gold earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
            category: 'earrings', 
            price: 50, 
            quantityInStock: 15, 
            status: 'bestseller'
          }, 
          { 
            name: 'Gold Twist Earrings', 
            description: 'Gold Twist earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
            category: 'earrings', 
            price: 120, 
            quantityInStock: 8, 
            status: 'new'
          }, 
          { 
            name: 'Pearl Circle Earrings', 
            description: 'Pearl Circle earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
            category: 'earrings',
            price: 100, 
            quantityInStock: 14, 
            status: 'not for sale'
          }, 
          { 
            name: 'Pearl Earrings', 
            description: 'Pearl earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
            category: 'earrings',
            price: 50, 
            quantityInStock: 30, 
            status: 'bestseller'
          }, 
          { 
            name: 'Silver Blue Flower Earrings',
            description: 'Silver Blue Flower earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.', 
            category: 'earrings', 
            price: 15, 
            quantityInStock: 9, 
            status: 'bestseller'
          }, 
          { 
            name: 'Turtle Earrings', 
            description: 'Turtle earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
            category: 'earrings',
            price: 90, 
            quantityInStock: 6, 
            status: 'new'
          },
    
          //necklaces
          { 
            name: 'Amethyst Necklace',
            description: 'Amethyst necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.', 
            category: 'necklaces', 
            price: 300, 
            quantityInStock: 4, 
            status: 'not for sale'
          }, 
          { 
            name: 'Emerald Necklace', 
            description: 'Emerald necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
            category: 'necklaces', 
            price: 1000, 
            quantityInStock: 1, 
            status: 'new'
          }, 
          { 
            name: 'Flower Necklace', 
            description: 'Flower necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
            category: 'necklaces', 
            price: 100, 
            quantityInStock: 5, 
            status: 'bestseller'
          }, 
          { 
            name: 'Pearl Necklace', 
            description: 'Pearl necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
            category: 'necklaces', 
            price: 180, 
            quantityInStock: 8, 
            status: 'bestseller'
          }, 
          { 
            name: 'Pink Stone Necklace', 
            description: 'Pink Stone necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
            category: 'necklaces', 
            price: 50, 
            quantityInStock: 10, 
            status: 'not for sale'
          }, 
          { 
            name: 'Rain Drop Necklace',
            description: 'Rain Drop necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.', 
            category: 'necklaces', 
            price: 30, 
            quantityInStock: 7, 
            status: 'for sale'
          }, 
          { 
            name: 'Sapphire Necklace', 
            description: 'Sapphire necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
            category: 'necklaces', 
            price: 1500, 
            quantityInStock: 0, 
            status: 'new'
          }, 
          { 
            name: 'Scorpion Necklace', 
            description: 'Scorpion necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
            category: 'necklaces', 
            price: 150, 
            quantityInStock: 1, 
            status: 'new'
          }, 
          { 
            name: 'Turquoise Stone Necklace',
            description: 'Turquoise Stone necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.', 
            category: 'necklaces', 
            price: 60, 
            quantityInStock: 13, 
            status: 'bestseller'
          }
        ], { returning: true, transaction: t });

        const earImagesDir = path.join(__dirname, '..', 'public/images/earrings');
        const neckImagesDir = path.join(__dirname, '..', 'public/images/necklaces');

        let imageFiles = await Promise.all([ 
          fs.promises.readdir(earImagesDir),
          fs.promises.readdir(neckImagesDir)
        ]);
        imageFiles = imageFiles.flat();

        const imageListPromise = Image.bulkCreate(await Promise.all(imageFiles.map(async file => {
          let productType = file.match(/([a-z]+)(?=-[0-9]+.)/i)[0];
          if (!productType.endsWith('s')) {
            productType += 's';
          }

          const filePath = path.join(__dirname, '..', 'public/images', productType, file);
          return {
            name: file,
            description: file,
            data: await fs.promises.readFile(filePath)
          };
        })), { returning: true, transaction: t });
        
        const [ productList, imageList ] = await Promise.all([ 
          productListPromise, imageListPromise 
        ]);
        
        const productImageList = [];
        for ( //iterate over productList and imageList to get their id's
          let prodIndex = 0, imageIndex = 0; 
          prodIndex < productList.length && imageIndex < imageList.length; 
        ) {
          let product = productList[prodIndex];
          let image = imageList[imageIndex];

          let productImageMatch = true;
          for ( //compare product and image names
            let i = 0, j = 0; 
            i < product.name.length && j < image.name.length; 
            i++, j++
          ) {
            if (product.name[i] === ' ' && image.name[j] === '-') {
              continue;
            }
            if (product.name[i].toLowerCase() !== image.name[j]) {
              productImageMatch = false;
              break;
            }
          }

          if (productImageMatch) {
            let productImageData = {
              product: product.id,
              image: image.id
            };
            productImageList.push(productImageData);

            imageIndex++;
          } else {
            prodIndex++;
          }
        }

        await ProductImage.bulkCreate(productImageList, { transaction: t });
      } catch (err) {
        console.error('Transaction rolled back: ', err);
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async t => {
      const productsDeletePromise = queryInterface.bulkDelete('products', { name: [
          'Blue Earrings', 'Diamond Cluster Earrings', 'Diamond Earrings',
          'Emerald Flower Earrings', 'Gold Earrings', 'Gold Twist Earrings',
          'Pearl Circle Earrings', 'Pearl Earrings', 'Silver Blue Flower Earrings',
          'Turtle Earrings',
          
          'Amethyst Necklace', 'Emerald Necklace', 'Flower Necklace',
          'Pearl Necklace', 'Pink Stone Necklace', 'Rain Drop Necklace',
          'Sapphire Necklace', 'Scorpion Necklace', 'Turquoise Stone Necklace'
        ] 
      }, { transaction: t });

      const earImagesDir = path.join(__dirname, '..', 'public/images/earrings');
      const neckImagesDir = path.join(__dirname, '..', 'public/images/necklaces');

      let imageFiles = await Promise.all([ 
        fs.promises.readdir(earImagesDir),
        fs.promises.readdir(neckImagesDir)
      ]);
      imageFiles = imageFiles.flat();

      const imagesDeletePromise = queryInterface.bulkDelete('images', { name: imageFiles },
        { transaction: t }
      );

      await Promise.all([ productsDeletePromise, imagesDeletePromise ]);
    });
  }
};