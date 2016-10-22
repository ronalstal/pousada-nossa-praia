
module.exports = function(actualLang, PROJ_ROOT, forDropdown) {
  var handlebars = require('gulp-compile-handlebars');
  var path =require('path');
  var languages = require(path.join(PROJ_ROOT, 'src', 'templates', 'i18n', 'header.json'));
  var imgPath = '/assets/img/flags32/';
  var flags = [];
  languages.implemented.forEach( function(lang) {
    if (lang !== actualLang) {
    var title = languages.lang[lang].title[lang] + ' (' +
                languages.lang[lang].title[actualLang] + ')';
    var html = '<a href="/' + lang + '/index.html"';
    if (forDropdown) {
      html += ' class="btn btn-lg dropdown-item" role="button"';
    }
    html += '';
    html += '>\n  <img src="' + imgPath + lang + '.png" title="' + title + '" />\n';
    if (forDropdown) {
      html += '<span>' + title + '</span>';
    }
    html += '</a>\n';
    flags.push(html);
  }
  });
  return (new handlebars.Handlebars.SafeString(flags.join('\n')));
};
