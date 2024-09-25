'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('reviews', {
         id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
         },
         client: {
            type: Sequelize.UUID,
            references: {
               model: 'users',
               key: 'id'
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
         },
         product: {
            type: Sequelize.UUID,
            references: {
               model: 'products',
               key: 'id'
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
         },
         rating: {
            type: Sequelize.INTEGER,
            allowNull: false
         },
         review: {
            type: Sequelize.TEXT,
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

      //Create function to update products count
      await queryInterface.sequelize.query(`
         CREATE FUNCTION update_reviews_count_rating() RETURNS TRIGGER AS $$
         BEGIN
            IF TG_OP = 'INSERT' THEN
               UPDATE "products"
               SET "reviewCount" = "reviewCount" + 1, "ratingSum" = "ratingSum" + NEW."rating"
               WHERE id = NEW."product";
            ELSIF TG_OP = 'DELETE' THEN
               UPDATE "products"
               SET "reviewCount" = "reviewCount" - 1, "ratingSum" = "ratingSum" - OLD."rating"
               WHERE id = OLD."product";
            ELSIF TG_OP = 'UPDATE' THEN
               IF NEW."product" != OLD."product" THEN
                  UPDATE "products"
                  SET "reviewCount" = "reviewCount" - 1, "ratingSum" = "ratingSum" - OLD."rating"
                  WHERE id = OLD."product";
                  
                  UPDATE "products"
                  SET "reviewCount" = "reviewCount" + 1, "ratingSum" = "ratingSum" + NEW."rating"
                  WHERE id = NEW."product";
               ELSE 
                  IF NEW."rating" != OLD."rating" THEN
                     UPDATE "products"
                     SET "ratingSum" = "ratingSum" - OLD."rating" + NEW."rating"
                     WHERE id = NEW."product";
                  END IF;
               END IF;
            END IF;
            RETURN NEW;
         END;
         $$ LANGUAGE plpgsql;
      `);

      //Create trigger to call the function on insert, update, or delete
      await queryInterface.sequelize.query(`
         CREATE TRIGGER update_reviews_count_rating_trigger
         AFTER INSERT OR DELETE OR UPDATE ON "reviews"
         FOR EACH ROW EXECUTE FUNCTION update_reviews_count_rating();
      `);
   },
   
   async down(queryInterface, Sequelize) {
      await queryInterface.sequelize.query(`
         DROP TRIGGER IF EXISTS update_reviews_count_rating_trigger ON "reviews";
      `);

      await queryInterface.sequelize.query(`
         DROP FUNCTION IF EXISTS update_reviews_count_rating;
      `);

      await queryInterface.dropTable('reviews');
   }
};