var flatiron = require('flatiron'),
    path = require('path'),
    app = module.exports = flatiron.app;


app.use(flatiron.plugins.cli, {
  source: path.join(__dirname, 'lib', 'commands')
});

app.start();
