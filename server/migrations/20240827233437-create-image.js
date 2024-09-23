'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('images', {
         id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
         },
         product: {
            type: Sequelize.UUID,
            references: {
               model: 'products',
               key: 'id'
            },
            allowNull: true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
         },
         review: {
            type: Sequelize.UUID,
            references: {
               model: 'reviews',
               key: 'id'
            },
            allowNull: true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
         },
         name: {
            type: Sequelize.STRING(200),
            allowNull: false,
            unique: true
         },
         description: {
            type: Sequelize.TEXT,
            allowNull: false
         },
         data: {
            type: Sequelize.BLOB,
            allowNull: false
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
         }
      });

      // Add CHECK constraint
      // make sure product and review are not both defined 
      await queryInterface.sequelize.query(
         `
            ALTER TABLE "images"
            ADD CONSTRAINT "check_product_or_review"
            CHECK (
               ("product" IS NOT NULL AND "review" IS NULL) OR 
               ("product" IS NULL AND "review" IS NOT NULL)
            );
         `
      );
   },
   
   async down(queryInterface, Sequelize) {
      await queryInterface.sequelize.query(
         `
            ALTER TABLE "images"
            DROP CONSTRAINT "check_product_or_review";
         `
      );

      await queryInterface.dropTable('images');
   }
};