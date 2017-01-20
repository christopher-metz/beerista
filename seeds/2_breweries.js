'use strict';

exports.seed = function(knex) {
  return knex('breweries').del()
    .then(() => {
      return knex('breweries')
        .insert([{
          id: 1,
          name: 'Goose Island Beer Co.',
          city: 'Chicago',
          state: 'IL',
          description: 'Goose Island Brewing Company began its operation in 1988 under the ownership of beer lover, John Hall. With a mission to prove the great ability of Midwesterners to produce great beers compared to the ones he has traveled to, John established the Goose Island Brewery. With great source of fresh water and along with many devoted craft beer enthusiasts, Goose Island started out its journey in Chicago. The brewery has been producing wide variety of craft beers. Some of their best beers are the Urban Wheat Ale, Honker’s Ale and beers aged in bourbon barrels. In 1999, Goose Island opened its second brewery in Wrigley Field.',
          website: 'http://www.gooseisland.com/'
        }, {
          id: 2,
          name: 'Cigar City Brewing',
          city: 'Tampa',
          state: 'FL',
          description: 'At Cigar City Brewing we make beer we like to drink and toast those who choose to drink with us. Behind all our beer is the philosophy that quality is achieved by giving first rate ingredients to first rate people in a space where they are free to pursue their passion. We acknowledge that what we do at Cigar City Brewing isn’t for everyone, but we welcome all.',
          website: 'http://cigarcitybrewing.com/'
        }, {
          id: 3,
          name: 'Tree House Brewing Company',
          city: 'Monson',
          state: 'MA',
          description: 'Tree House Brewing Company brews a vast array of ales. The offerings vary based on the season, our moods, and innovations discovered in the midst of day in and day out brewing. Our artisan brewery knows no bounds and we are driven by an intense curiosity of ingredients and how they blend together to create something special.',
          website: 'http://www.treehousebrew.com/'
        }, {
          id: 4,
          name: 'Pabst Brewing Company',
          city: 'Woodridge',
          state: 'IL',
          description: 'Tree House Brewing Company brews a vast array of ales. The offerings vary based on the season, our moods, and innovations discovered in the midst of day in and day out brewing. Our artisan brewery knows no bounds and we are driven by an intense curiosity of ingredients and how they blend together to create something special.',
          website: 'http://pabstblueribbon.com/'
        }, {
          id: 5,
          name: 'Fremont Brewing',
          city: 'Seatte',
          state: 'WA',
          description: 'Fremont Brewing was born of our love for our home and history as well as the desire to prove that beer made with the finest local ingredients – organic when possible --, is not the wave of the future but the doorway to beer\'s history. Starting a brewery in the midst of the Great Recession is clearly an act of passion. We invite you to come along with us and enjoy that passion -- because beer matters.',
          website: 'http://www.fremontbrewing.com/'
        }, {
          id: 6,
          name: 'Georgetown Brewing Company',
          city: 'Seatte',
          state: 'WA',
          description: 'Georgetown Brewing Company, a Seattle microbrewery and brewer of Manny\'s Pale Ale. We\'re a draft beer only production brewery, which means that all we do is make beer and fill kegs. Sorry, no brewpub, but we do have a retail shop where you can pick up kegs to go, growlers, and perhaps get a taste of our newest beer before it\'s released. Or you could be social and get out to your favorite local watering hole. If they don\'t have our beer on tap, let us know and we\'ll do our best to pester \'em into submission. Do we bottle? Not yet but we never say never. Right now we\'re focused on doing one thing right... draft beer. Cheers!',
          website: 'http://www.georgetownbeer.com/'
        }, {
          id: 7,
          name: 'The Alchemist',
          city: 'Stowe',
          state: 'VT',
          description: 'Georgetown Brewing Company, a Seattle microbrewery and brewer of Manny\'s Pale Ale. We\'re a draft beer only production brewery, which means that all we do is make beer and fill kegs. Sorry, no brewpub, but we do have a retail shop where you can pick up kegs to go, growlers, and perhaps get a taste of our newest beer before it\'s released. Or you could be social and get out to your favorite local watering hole. If they don\'t have our beer on tap, let us know and we\'ll do our best to pester \'em into submission. Do we bottle? Not yet but we never say never. Right now we\'re focused on doing one thing right... draft beer. Cheers!',
          website: 'http://www.alchemistbeer.com/'
        }, {
          id: 8,
          name: 'Anheuser-Busch',
          city: 'St. Louis',
          state: 'MO',
          description: 'The leading American brewer, bringing people together for more than 160 years.',
          website: 'http://www.anheuser-busch.com/'
        }, {
          id: 9,
          name: 'Philipsburg Brewing Company',
          city: 'Philipsburg',
          state: 'MT',
          description: '',
          website: 'http://www.philipsburgbrew.com/'
        }, {
          id: 10,
          name: 'Elysian Brewing Company',
          city: 'Seattle',
          state: 'WA',
          description: 'Elysian Brewing operates four Seattle restaurants -Elysian Capitol Hill, Elysian Tangletown, Elysian Fields, Elysian Bar, and a full production brewery – Elysian Airport Way, in the Georgetown neighborhood. Known for variety, Elysian has brewed over 350 craft beers since it opened on Capitol Hill in 1996.',
          website: 'http://www.elysianbrewing.com/'
        }])
        .then(() => {
          return knex.raw("SELECT setval('breweries_id_seq', (SELECT MAX(id) FROM breweries));");
        });

    });
};
