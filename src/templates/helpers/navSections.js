
module.exports = function(actualLang, PROJ_ROOT, forDropdown) {
  var handlebars = require('gulp-compile-handlebars');
  var path =require('path');
  var languages = require(path.join(PROJ_ROOT, 'src', 'templates', 'i18n', 'header.json'));
  // var imgPath = '/assets/img/flags32/';
  var navItems = [];
  var html = '';
  languages.sections.forEach( function(section) {
    if (forDropdown) {  // for smaller screens
      html = '<a href="javascript:showContent(\'' + section +'\')"';
      html += ' name="menu-item-' + section + '"';
      html += ' class="dropdown-item"';
      html += '  role="button"> <span>' + languages[section][actualLang] + '</span>';
      html += '</a>\n';

    } else {  // for larger screens
      html = '<div class="navLarge-item">';
      html += '<a class="navLarge-link"';
      html += ' href="javascript:showContent(\'' + section +'\')"';
      html += ' name="menu-item-' + section + '"';
      html += ' role="button"> <span>' + languages[section][actualLang] + '</span>';
      html += '</a>';
      html += '</div>';
    }
    navItems.push(html);
  });
  return (new handlebars.Handlebars.SafeString(navItems.join('\n')));
};
