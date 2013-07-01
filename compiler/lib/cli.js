var app = module.exports = require('./app'),
    mustache = require('mustache'),
    fs = require('fs');

app.cmd(/([^\s]+) ([^\s]+) (.+) /,function(view,template,output){
  var viewtext = fs.readFileSync(view,'utf-8'),
  temptext = fs.readFileSync(template,'utf-8');
  fs.writeFileSync(output, mustache.render(temptext,JSON.parse(viewtext)));
});

