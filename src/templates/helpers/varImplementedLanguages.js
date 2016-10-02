
module.exports = function(PROJ_ROOT) {
  var handlebars = require('gulp-compile-handlebars');
  var path =require('path');
  var lang = require(path.join(PROJ_ROOT, 'src', 'assets', 'js', 'languages.json'));
  var returnString = '[';
  lang.implemented.forEach( function(impLang) {
    returnString += '\'' + impLang + '\',';
  });
  returnString += ']';
  return (new handlebars.Handlebars.SafeString(returnString));
};
