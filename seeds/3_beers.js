'use strict';

exports.seed = function(knex) {
  return knex('beers').del()
    .then(() => {
      return knex('beers')
        .insert([{
          id: 1,
          name: 'Rare Bourbon County Brand Stout',
          style: 'Stout - American Imperial/Double',
          abv: 13,
          ibu: 60,
          source_rating: 4.75,
          source_count: 6479,
          source_id: '/goose-island-beer-co-rare-bourbon-county-brand-stout/11024',
          photo_url: 'https://untappd.akamaized.net/site/beer_logos/beer-RareBourbonCountyStout_11024.jpeg',
          description: 'Aged 2 years in 23-year old Pappy Van Winkle Bourbon Barrels. A true rarity—savor and share it only with those you hold dear, as it will never be made again.',
          brewery_id: 1
        }, {
          id: 2,
          name: 'Proprietor\'s Bourbon County Brand Stout',
          style: 'Stout - American Imperial/Double',
          abv: 13.2,
          source_rating: 4.74,
          source_count: 10442,
          source_id: '/goose-island-beer-co-proprietor-s-bourbon-county-brand-stout-2014/860942',
          photo_url: 'https://untappd.akamaized.net/site/beer_logos/beer-860942_16c40_sm.jpeg',
          description: 'Proprietor’s Bourbon County Brand Stout is meant to show our immense gratitude to our neighbors here in Chicago – the loyal and adventurous fans whose support helped bring Bourbon County Brand Stout to towering new heights. 2014 variant - Made in Rye barrels with Cassia Bark, Cocoa Nibs, Panela and Coconut Water',
          brewery_id: 1
        }, {
          id: 3,
          name: 'Bourbon County Brand Stout Vanilla Rye',
          style: 'Stout - American Imperial/Double',
          abv: 13.6,
          ibu: 35,
          source_rating: 4.72,
          source_count: 20694,
          source_id: '/goose-island-beer-co-bourbon-county-brand-stout-vanilla-rye-2014/776678',
          photo_url: 'https://untappd.akamaized.net/site/beer_logos/beer-776678_4e793_sm.jpeg',
          description: 'First brewed for the legendary festival of Wood and Barrel Aged Beer in Chicago, drinkers enjoyed this Bourbon County Variant so much we bottled it the next year (2010). People flocked to stores to get their hands on a bottle and have this one of a kind barrel aged stout. Over the past few years we have heard our fans express their love for this version and we are extremely proud to bring it back in 2014. This year\'s version features a little twist of aging the stout in Rye Whiskey Barrels with a mix of Mexican and Madagascar vanilla beans!',
          brewery_id: 1
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