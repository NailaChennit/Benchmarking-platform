const rp = require('request-promise');
const cheerio = require('cheerio');

const potusParse = function(url) {
  return rp(url)
    .then(function(html) {
      const $ = cheerio.load(html);
      return {
      image:$('img.article-img.wp-post-image').attr('src'),
      text:$('div.columns.small-12.medium-7 div').attr('itemprop', 'articleBody').children('p').text(), 
      title:$('div.row.article-view h2').text(),
      url:url
      };
    })
    .catch(function(err) {
      //handle error
    });
};

module.exports = potusParse;

