function Weather(values) {
  this.values = values;
}

Weather.prototype.test = function() {
    return 'test';
  }

module.exports = Weather;