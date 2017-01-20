'use strict';

exports.seed = function(knex) {
  return knex('beers').del()
    .then(() => {
      return knex('beers')
        .insert([{
          id: 1,
          name: 'Corners Porter',
          style: 'Porter - American',
          abv: 6.6,
          ibu: 65,
          source_rating: 3.83,
          source_count: 172,
          source_id: '/philipsburg-brewing-company-corners-porter/297228',
          photo_url: 'https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png',
          description: 'Rich coffee flavor comes from 5 pounds of fresh course ground coffee from Black Coffee Roasting Co. in Missoula, MT. ',
          brewery_id: 9
        }, {
          id: 2,
          name: 'Space Dust IPA',
          style: 'IPA - American',
          abv: 8.2,
          source_rating: 62,
          source_count: 112025,
          source_id: '/elysian-brewing-company-space-dust-ipa/121023',
          photo_url: 'https://untappd.akamaized.net/site/beer_logos/beer-121023_cca67_sm.jpeg',
          description: 'Space Dust :: A Totally Nebular IPA. Great Western premium two-row, combined with c-15 and Dextri-Pils, give this beer a bright and galactic Milky Way hue. The hopping is pure starglow energy, with Chinook to bitter and late and dry additions of Citra and Amarillo. Space Dust is out of this world, with 62 IBU, and 7.2% ABV.',
          brewery_id: 10
        }, {
          id: 3,
          name: 'Superfuzz Blood Orange Pale',
          style: 'Pale Ale - American',
          abv: 5.4,
          ibu: 40,
          source_rating: 3.7,
          source_count: 44612,
          source_id: '/elysian-brewing-company-superfuzz-blood-orange-pale/360414',
          photo_url: 'https://untappd.akamaized.net/site/beer_logos/beer-360414_3f257_sm.jpeg',
          description: 'Superfuzz Blood Orange Pale :: Call it Orangesploitation. There\'s a new beer in town--Superfuzz Blood Orange Pale--and he\'s sticking it to the Man. Superfuzz is a beer you can get behind, with Pale, Munich and Dextri-Pils malts and German Northern Brewer and Cascade hops to bitter and flavor. But it\'s Citra, Amarillo and blood orange peel and puree that\'ll really get you on your feet. Never dance? We\'ll see about that. With a 5.4% ABV and layer on layer of mystical complexity, Superfuzz is shining, streaming, gleaming, flaxen, waxen.',
          brewery_id: 10
        }, {
          id: 4,
          name: 'Double Barrel Hunahpu\'s',
          style: 'Stout Imperial/Double',
          abv: 11.5,
          source_rating: 4.72,
          source_count: 5863,
          source_id: '/cigar-city-brewing-double-barrel-hunahpu-s/489624',
          photo_url: 'https://untappd.akamaized.net/site/beer_logos/beer-489624_13a45_sm.jpeg',
          description: '50% aged in Rum barrels, 50% aged in Apple Brandy barrels',
          brewery_id: 2
        }, {
          id: 5,
          name: 'King JJJuliusss',
          style: 'IPA Imperial/Double',
          abv: 8.4,
          source_rating: 4.72,
          source_count: 3250,
          source_id: '/tree-house-brewing-company-king-jjjuliusss/1616182',
          photo_url: 'https://untappd.akamaized.net/site/beer_logos/beer-1616182_8d869_sm.jpeg',
          description: 'To continue with our 4th Anniversary celebration, we brewed an extra kettle hop and extra dry hopped version of King Julius! The result is an incredibly intense citrus hop blast unlike anything we\'ve experienced here at Tree House. Mango, orange, and sweet grapefruit are predominant in the aroma with hints of pineapple and blended tropical fruit juice. The taste mirrors the aroma with a juicy mouthfeel and a proper bitterness. Fluffy. This beer challenges the sense and rewards the palate as it warms in the glass. Complex, raw, and beautiful, the amplified King is a beer we are excited to share with you to celebrate four years of Tree House. Thank you!',
          brewery_id: 3
        }, {
          id: 6,
          name: 'Pabst Blue Ribbon',
          style: 'Lager - North American Adjunct',
          abv: 4.6,
          ibu: 10,
          source_rating: 2.77,
          source_count: 238006,
          source_id: '/pabst-brewing-company-pabst-blue-ribbon/3883',
          photo_url: 'https://untappd.akamaized.net/site/beer_logos/beer-3883_a0aa4_sm.jpeg',
          description: 'This is the original Pabst Blue Ribbon Beer. Nature\'s choicest products provide its prized flavor. Only the finest of hops and grains are used. Selected as America\'s Best in 1893.',
          brewery_id: 4
        }, {
          id: 7,
          name: 'Universale Pale',
          style: 'Pale Ale - American',
          abv: 5.6,
          source_rating: 3.61,
          source_count: 9647,
          source_id: '/fremont-brewing-universale-pale/29958',
          photo_url: 'https://untappd.akamaized.net/site/beer_logos/beer-29958_b78fe_sm.jpeg',
          description: 'Fremont is the self-proclaimed “Center of the Universe” and Universale, our flagship product, honors the namesake of our unique location. Universale Pale Ale offers a distinctive Northwest twist on the classic pale ale, using a select blend of pale roasted malt and Old World malts balanced with classic Northwest hops to achieve a heavenly beer of rich malt flavor and hop spice. This is beer. Enjoy.',
          brewery_id: 5
        }, {
          id: 8,
          name: 'Manny\'s Pale Ale',
          style: 'Pale Ale - American',
          abv: 5.4,
          ibu: 38,
          source_rating: 3.62,
          source_count: 26913,
          source_id: '/georgetown-brewing-company-manny-s-pale-ale/6960',
          photo_url: 'https://untappd.akamaized.net/site/beer_logos/beer-6960_4c556_sm.jpeg',
          description: 'A careful selection of Northwest hops, premium barley, and our unique yeast give this ale a rich and complex malty middle with a snappy hop finish. It\'s truly a micro that finishes crisp, clean, and smooth.',
          brewery_id: 6
        }, {
          id: 9,
          name: 'Heady Topper',
          style: 'IPA - Imperial/Double',
          abv: 8,
          ibu: 100,
          source_rating: 4.65,
          source_count: 135162,
          source_id: '/the-alchemist-heady-topper/4691',
          photo_url: 'https://untappd.akamaized.net/site/beer_logos/beer-4691_eb933_sm.jpeg',
          description: 'We love hops – that’s why our flagship Double IPA, Heady Topper, is packed full of them. Heady Topper was designed to showcase the complex flavors and aromas these flowers produce. The Alchemist has been brewing Heady Topper since 2003. This Double IPA is not intended to be the strongest or most bitter DIPA. It is brewed to give you wave after wave of hop flavor without any astringent bitterness. We brew Heady Topper with a proprietary blend of six hops – each imparting its own unique flavor and aroma. Take a big sip of Heady and see what hop flavors you can pick out. Orange? Tropical Fruit? Pink Grapefruit? Pine? Spice? There is just enough malt to give this beer some backbone, but not enough to take the hops away from the center stage.',
          brewery_id: 7
        }, {
          id: 10,
          name: 'Bud Light',
          style: 'Lager - American Light',
          abv: 4.2,
          ibu: 27,
          source_rating: 2.24,
          source_count: 285338,
          source_id: '/anheuser-busch-bud-light/3784',
          photo_url: 'https://untappd.akamaized.net/site/beer_logos/beer-3784_0e2c3_sm.jpeg',
          description: 'Bud Light is brewed using a blend of premium aroma hop varieties, both American-grown and imported, and a combination of barley malts and rice. Its superior drinkability and refreshing flavor makes it the world’s favorite light beer. ',
          brewery_id: 8
        }])
        .then(() => {
          return knex.raw("SELECT setval('beers_id_seq', (SELECT MAX(id) FROM beers));");
        });
    });
};
