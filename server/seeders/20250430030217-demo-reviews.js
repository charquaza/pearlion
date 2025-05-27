'use strict';

const Review = require('../models/index').Review;

const userIds = {
  bbaggins: '31679d96-c690-4cad-b2b4-633de76bdde9',
  bwalker: 'fc6f7f0c-23de-4643-add2-d85c0da84507',
  gcurious: '3e2faafc-b69a-4278-a2a8-1a5032a180d5',
  jdoe: '6ac58f8e-3468-4b87-b757-bcc3866badb2',
  nprice: 'c41b0804-34bc-4884-b772-146758207c85',
  mjane: '45904509-7b3a-47c3-a593-c2a20fbbf028',
  nkim: '9b9c322a-4a7a-4587-8982-3db1c042ed52',
  ccarter: 'd9e716e3-9ed6-4c33-ace5-c3d9687c916f',
  srodriguez: '564a3bf6-9943-4b43-921f-c7c2424fd420',
  kgold: 'f447835f-a1a7-4233-a192-bbab511c39b8'
};

const productIds = {
  'Blue Earrings': '951c7963-05cb-467c-99f5-12981e493641',
  'Diamond Cluster Earrings': 'e4a753b1-3895-4abf-99d5-a6cfd96d7350',
  'Diamond Earrings': 'c408ae50-bc4b-475a-adcf-26c1eb62d26c',
  'Emerald Flower Earrings': '97b1ee41-118c-452d-89cb-9d3c8a196576',
  'Gold Earrings': '37300553-5307-4d8c-a72c-0c651e54a46a',
  'Gold Twist Earrings': '50422f63-685f-42b2-912e-bcd30f7ead37',
  'Pearl Circle Earrings': 'ddf64a21-5af5-466a-8004-48cee7d44f05',
  'Pearl Earrings': '9a232097-1921-40ee-a5d7-e2f97cf014b5',
  'Silver Blue Flower Earrings': '5a0adfb1-aea8-4c60-89e5-22b997ee4d07',
  'Amethyst Necklace': '1d72e54e-10a6-4436-9481-281fc568492e',
  'Emerald Necklace': 'ea344f48-6814-45ff-b85b-5b8e8de13fe0',
  'Flower Necklace': 'cf1061f4-9480-4615-a072-8377642ddf3a',
  'Pearl Necklace': '8d4191fc-3297-4dba-89ec-9b4b3d3b964b',
  'Pink Stone Necklace': 'df40b0ce-cb0f-4925-ad85-f10aac0ab3df',
  'Sapphire Necklace': '3a731835-0789-489c-94d2-5b00c923fe53',
  'Scorpion Necklace': '20667c5d-6757-4802-bd41-e59b7610fcc2',
  'Turquoise Stone Necklace': '916566fe-b3fe-4831-bf5d-ec7abf1ec27b',
  'Turtle Earrings': '52816d1d-b756-41bf-ba26-afeae351b9d9',
  'Rain Drop Necklace': 'e9a23177-ecc3-40d9-9341-5783574cf5a6'
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      //gold earrings
      {
        client: userIds.bbaggins,
        product: productIds['Gold Earrings'],
        rating: '5',
        review: 'These hoops are just as amazing as the studs I got last year'
      },
      {
        client: userIds.bwalker,
        product: productIds['Gold Earrings'],
        rating: '5',
        review: 'Bought these for my granddaughter. She smiled real big when she opened the box, so I\'d say they were a good buy.'
      },
      {
        client: userIds.gcurious,
        product: productIds['Gold Earrings'],
        rating: '5',
        review: 'I wasn\'t sure if hoops would hold up on the trail, but these are super lightweight and stayed put through a 10-mile hike.'
      },
      {
        client: userIds.jdoe,
        product: productIds['Gold Earrings'],
        rating: '5',
        review: 'They\'re nice and not too flashy. I like that I can wear them every day and they\'re not heavy.'
      },
      {
        client: userIds.nprice,
        product: productIds['Gold Earrings'],
        rating: '4',
        review: 'They\'re simple and shiny, and my friend said they look good on me, so I guess I did okay!'
      },
      {
        client: userIds.mjane,
        product: productIds['Gold Earrings'],
        rating: '1',
        review: 'They looked cheap in person and one hoop wouldn\'t even close properly. Definitely not worth the hype or the money.'
      },
      {
        client: userIds.nkim,
        product: productIds['Gold Earrings'],
        rating: '3',
        review: 'The clasp feels a little flimsy, so I\'m not sure how long they\'ll last.'
      },
      {
        client: userIds.ccarter,
        product: productIds['Gold Earrings'],
        rating: '5',
        review: 'I bought these hoops as a gift for my sister, and she absolutely loved them. '
      },
      {
        client: userIds.srodriguez,
        product: productIds['Gold Earrings'],
        rating: '5',
        review: 'These hoops are professional enough for the classroom but still stylish.'
      },
      {
        client: userIds.kgold,
        product: productIds['Gold Earrings'],
        rating: '5',
        review: 'These gold hoops are EVERYTHING! They\'re the perfect size, super shiny, and go with literally every outfit I own.'
      },

      //pearl earrings
      {
        client: userIds.bbaggins,
        product: productIds['Pearl Earrings'],
        rating: '5',
        review: 'I was shocked when these came out, and I am in LOVE!! Can\'t wait for them to release more pearl jewelry!'
      },
      {
        client: userIds.bwalker,
        product: productIds['Pearl Earrings'],
        rating: '5',
        review: 'Got these for my wife on our anniversary. She said they\'re \'just lovely\'—which means I did good.'
      },
      {
        client: userIds.gcurious,
        product: productIds['Pearl Earrings'],
        rating: '5',
        review: 'They add a quiet polish without feeling fussy. Easy to pack and surprisingly durable.'
      },
      {
        client: userIds.jdoe,
        product: productIds['Pearl Earrings'],
        rating: '5',
        review: 'I like that they go with everything—jeans, dress, whatever. No fuss.'
      },
      {
        client: userIds.nprice,
        product: productIds['Pearl Earrings'],
        rating: '4',
        review: 'I don\'t know much about pearls, but these looked nice and not too big.'
      },
      {
        client: userIds.mjane,
        product: productIds['Pearl Earrings'],
        rating: '3',
        review: 'This is my second purchase, and I think the photos looked better. The pearls are real but not as big as I thought they would be.'
      },
      {
        client: userIds.nkim,
        product: productIds['Pearl Earrings'],
        rating: '4',
        review: 'I like the heart accent that connects the pearl to the hoop but I think it is too much. They should have kept it simple with just the pearl'
      },
      {
        client: userIds.ccarter,
        product: productIds['Pearl Earrings'],
        rating: '5',
        review: 'These look so cute and dainty. I especially love how they incorporated the heart into this earring. '
      },
      {
        client: userIds.srodriguez,
        product: productIds['Pearl Earrings'],
        rating: '5',
        review: 'These pearl studs are perfect for work—understated and elegant. I\'ve worn them with slacks and dresses and they always feel appropriate. Also comfortable for all-day wear.'
      },
      {
        client: userIds.kgold,
        product: productIds['Pearl Earrings'],
        rating: '5',
        review: 'I am so excited to try these out tomorrow. The shiny pearl goes so well with the fine gold!'
      },

      //silver blue flower earrings
      {
        client: userIds.bbaggins,
        product: productIds['Silver Blue Flower Earrings'],
        rating: '5',
        review: 'great quality and fast shipping. I\'ll definitely be back for more!'
      },
      {
        client: userIds.bwalker,
        product: productIds['Silver Blue Flower Earrings'],
        rating: '5',
        review: 'Came on time and looked pretty.'
      },
      {
        client: userIds.gcurious,
        product: productIds['Silver Blue Flower Earrings'],
        rating: '5',
        review: 'they look great in summit selfies! Rugged enough for the wild, stylish enough for town.'
      },
      {
        client: userIds.jdoe,
        product: productIds['Silver Blue Flower Earrings'],
        rating: '5',
        review: 'Just what I was looking for. They\'re small, classic, and easy to wear.'
      },
      {
        client: userIds.nprice,
        product: productIds['Silver Blue Flower Earrings'],
        rating: '5',
        review: 'I\'m not really into jewelry, but I got these because they looked nice in the photos.'
      },
      {
        client: userIds.mjane,
        product: productIds['Silver Blue Flower Earrings'],
        rating: '3',
        review: 'Not exactly what I was going for, so kind of disappointed. I think the blue is okay though'
      },
      {
        client: userIds.nkim,
        product: productIds['Silver Blue Flower Earrings'],
        rating: '5',
        review: 'The earrings look beautiful and feel lightweight, which I love.'
      },
      {
        client: userIds.ccarter,
        product: productIds['Silver Blue Flower Earrings'],
        rating: '5',
        review: 'Thank you for the beautiful packaging and quick delivery.'
      },
      {
        client: userIds.srodriguez,
        product: productIds['Silver Blue Flower Earrings'],
        rating: '5',
        review: 'These don\'t distract or dangle too much, and I\'ve worn them all day without discomfort.'
      },
      {
        client: userIds.kgold,
        product: productIds['Silver Blue Flower Earrings'],
        rating: '5',
        review: 'I\'ve gotten so many compliments already!!! Highly recommend!!'
      },

      //flower necklace
      {
        client: userIds.bbaggins,
        product: productIds['Flower Necklace'],
        rating: '5',
        review: 'I\'ve bought earrings from this shop before and so had to try their necklaces, and they never disappoint!'
      },
      {
        client: userIds.bwalker,
        product: productIds['Flower Necklace'],
        rating: '5',
        review: 'Nice and classy without being over the top.'
      },
      {
        client: userIds.gcurious,
        product: productIds['Flower Necklace'],
        rating: '5',
        review: 'The finishes are nice so I liked that they didn\'t snag on my hiking gear'
      },
      {
        client: userIds.jdoe,
        product: productIds['Flower Necklace'],
        rating: '4',
        review: 'I think the flower would have been cuter if it were a smaller size'
      },
      {
        client: userIds.nprice,
        product: productIds['Flower Necklace'],
        rating: '5',
        review: 'They feel a bit fancy, but still simple enough to wear with anything. Happy with the buy.'
      },
      {
        client: userIds.mjane,
        product: productIds['Flower Necklace'],
        rating: '2',
        review: 'I think they should change the flower design. This one seems a bit too fake'
      },
      {
        client: userIds.nkim,
        product: productIds['Flower Necklace'],
        rating: '5',
        review: 'I get lots of compliments when I wear these. Seems like very high quality material they are using'
      },
      {
        client: userIds.ccarter,
        product: productIds['Flower Necklace'],
        rating: '5',
        review: 'My third purchase, and I am grateful for stores like this that truely DELIVER!'
      },
      {
        client: userIds.srodriguez,
        product: productIds['Flower Necklace'],
        rating: '5',
        review: 'My students love seeing me with these necklaces!'
      },
      {
        client: userIds.kgold,
        product: productIds['Flower Necklace'],
        rating: '5',
        review: 'In awe of how beautiful these are!'
      },

      //pearl necklace
      {
        client: userIds.bbaggins,
        product: productIds['Pearl Necklace'],
        rating: '5',
        review: 'The pearls are definitely high quality and elevates my look all the time!!'
      },
      {
        client: userIds.bwalker,
        product: productIds['Pearl Necklace'],
        rating: '5',
        review: 'My wife seems to put these on everyday'
      },
      {
        client: userIds.gcurious,
        product: productIds['Pearl Necklace'],
        rating: '5',
        review: 'Didn\'t think pearls were my thing, but I brought these on a trip and wore them for a nice dinner after a day of climbing. '
      },
      {
        client: userIds.jdoe,
        product: productIds['Pearl Necklace'],
        rating: '5',
        review: 'I like the simple design.'
      },
      {
        client: userIds.nprice,
        product: productIds['Pearl Necklace'],
        rating: '5',
        review: 'I hope these are real pearls!'
      },
      {
        client: userIds.mjane,
        product: productIds['Pearl Necklace'],
        rating: '4',
        review: 'Honestly, these aren\'t bad. Make sure to check the sizing description because I think they need to be wider'
      },
      {
        client: userIds.nkim,
        product: productIds['Pearl Necklace'],
        rating: '5',
        review: 'These seem great for the price! The gold fiinishing between the pearls are really nice'
      },
      {
        client: userIds.ccarter,
        product: productIds['Pearl Necklace'],
        rating: '5',
        review: 'These are so so beautiful and I love wearing these on a daily basis'
      },
      {
        client: userIds.srodriguez,
        product: productIds['Pearl Necklace'],
        rating: '5',
        review: 'Very happy with the purchase.'
      },
      {
        client: userIds.kgold,
        product: productIds['Pearl Necklace'],
        rating: '5',
        review: 'Can\'t wait to wear these to work tomorrow!'
      },

      //turquoise stone necklace
      {
        client: userIds.bbaggins,
        product: productIds['Turquoise Stone Necklace'],
        rating: '5',
        review: 'The color of the stone is everything! Makes my face shine too'
      },
      {
        client: userIds.bwalker,
        product: productIds['Turquoise Stone Necklace'],
        rating: '5',
        review: 'I got these for myself, reminds me of costa rica oceans!'
      },
      {
        client: userIds.gcurious,
        product: productIds['Turquoise Stone Necklace'],
        rating: '5',
        review: 'The stone is so mysterious and elegant at the same time. I love wearing these to my trips'
      },
      {
        client: userIds.jdoe,
        product: productIds['Turquoise Stone Necklace'],
        rating: '5',
        review: 'These definitely can contribute as accent pieces to your daily fashion'
      },
      {
        client: userIds.nprice,
        product: productIds['Turquoise Stone Necklace'],
        rating: '5',
        review: 'The necklace is so prettty and I love wearing these everyday. Not too heavy! '
      },
      {
        client: userIds.mjane,
        product: productIds['Turquoise Stone Necklace'],
        rating: '2',
        review: 'The color is not what I expected. Probably will return'
      },
      {
        client: userIds.nkim,
        product: productIds['Turquoise Stone Necklace'],
        rating: '4',
        review: 'I believe it would have been better if they provided us with the opportunity to choose the exact stone that we want for our necklace'
      },
      {
        client: userIds.ccarter,
        product: productIds['Turquoise Stone Necklace'],
        rating: '5',
        review: 'I pair this with my black dress and everybody compliments how it brings attention to my face!'
      },
      {
        client: userIds.srodriguez,
        product: productIds['Turquoise Stone Necklace'],
        rating: '5',
        review: 'I gave this to another fellow teacher for her birthday and she really liked them'
      },
      {
        client: userIds.kgold,
        product: productIds['Turquoise Stone Necklace'],
        rating: '5',
        review: 'I got this for my grandma, hope she likes them!!'
      },

      //scorpion necklace
      {
        client: userIds.mjane,
        product: productIds['Scorpion Necklace'],
        rating: '1',
        review: 'EwwWw!!!!! who came up with this????'
      },

      //blue earrings
      {
        client: userIds.bbaggins,
        product: productIds['Blue Earrings'],
        rating: '5',
        review: 'these are beautiful! I love the color and the design. They are perfect for everyday wear and add a nice pop of color to my outfits.'
      },
      {
        client: userIds.gcurious,
        product: productIds['Blue Earrings'],
        rating: '5',
        review: 'not the best for active wear, but for eveyday use, these are perfect! I love the way they look and feel.'
      },
      {
        client: userIds.mjane,
        product: productIds['Blue Earrings'],
        rating: '3',
        review: 'bought these cuz they were on SALE, but still too expensive :('
      },
      {
        client: userIds.srodriguez,
        product: productIds['Blue Earrings'],
        rating: '5',
        review: 'bought a couple to gift to my friends!'
      },
      {
        client: userIds.kgold,
        product: productIds['Blue Earrings'],
        rating: '5',
        review: 'perfect'
      },

      //emerald flower earrings
      {
        client: userIds.bbaggins,
        product: productIds['Emerald Flower Earrings'],
        rating: '5',
        review: 'dainty and elegant'
      },
      {
        client: userIds.nprice,
        product: productIds['Emerald Flower Earrings'],
        rating: '5',
        review: 'guess emeralds are expensive, which is why these are so pricey, but they are worth it!'
      },

      //rain drop necklace
      {
        client: userIds.bbaggins,
        product: productIds['Rain Drop Necklace'],
        rating: '5',
        review: 'so cute and pretty at the same time'
      },
      {
        client: userIds.bwalker,
        product: productIds['Rain Drop Necklace'],
        rating: '5',
        review: 'perfect for rainy days!'
      },
      {
        client: userIds.nprice,
        product: productIds['Rain Drop Necklace'],
        rating: '5',
        review: 'not sure what the material is, but i like it'
      },
      {
        client: userIds.mjane,
        product: productIds['Rain Drop Necklace'],
        rating: '4',
        review: 'I was expecting a real rain drop, but it ws just another stone. cant complain tho, its really nice looking'
      },

      //pearl circle earrings
      {
        client: userIds.bbaggins,
        product: productIds['Pearl Circle Earrings'],
        rating: '5',
        review: 'so cute and pretty at the same time'
      },
      {
        client: userIds.bwalker,
        product: productIds['Pearl Circle Earrings'],
        rating: '5',
        review: 'Looks like a twist on their classic Pearl Earrings. love the new look'
      },
      {
        client: userIds.nprice,
        product: productIds['Pearl Circle Earrings'],
        rating: '5',
        review: 'i like them, very elegant indeed'
      },

      //amethyst necklace
      {
        client: userIds.bbaggins,
        product: productIds['Amethyst Necklace'],
        rating: '5',
        review: 'the stone is so beautiful and the color is perfect'
      },
      {
        client: userIds.mjane,
        product: productIds['Amethyst Necklace'],
        rating: '1',
        review: 'what even is amethyst and why is it so expensive??? looks like a ripoff'
      },

      //pink stone necklace
      {
        client: userIds.nkim,
        product: productIds['Pink Stone Necklace'],
        rating: '5',
        review: 'I love the subtle mix of pink and white - a perfect balance of colors'
      },
      {
        client: userIds.nprice,
        product: productIds['Pink Stone Necklace'],
        rating: '5',
        review: 'i don\'t know where they got this stone, wonder if I can find them in the river?'
      },

      //diamond cluster earrings
      {
        client: userIds.bbaggins,
        product: productIds['Diamond Cluster Earrings'],
        rating: '5',
        review: 'I love the color options they provide. bought the silver ones, and thinking of getting the rose gold too'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reviews', { 
      client: Object.values(userIds)
    });
  }
};
