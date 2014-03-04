function Weather(values) {
  this.values = JSON.parse(values);
}

Weather.prototype.test = function() {
    return 'test';
  }

module.exports = Weather;