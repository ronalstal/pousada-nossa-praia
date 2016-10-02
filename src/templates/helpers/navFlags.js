
module.exports = function(actualLang, PROJ_ROOT) {
  var handlebars = require('gulp-compile-handlebars');
  var path =require('path');
  var languages = require(path.join(PROJ_ROOT, 'src', 'assets', 'js', 'languages.json'));
  var imgPath = '/static/img/flags32/';
  var flags = [];
  languages.implemented.forEach( function(lang) {
    var title = languages.lang[actualLang].title[lang];
    var html = '<a href="/' + lang + '/index.html">\n';
    html += '  <img src="' + imgPath + lang + '.png" title="' + title + '" />\n';
    html += '</a>\n';
    flags.push(html);
  });
  return (new handlebars.Handlebars.SafeString(flags.join('\n')));
};
