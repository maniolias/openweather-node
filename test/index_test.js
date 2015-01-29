'use strict';

var API = require('../lib/'),
	chai = require('chai'),
	expect = chai.expect,
	config = require('../lib/config.js');

chai.should();
	
describe('Main', function() {
	beforeEach(function() {
		API.default();
	});

	describe('#config', function() {
		it('should change the culture', function(done) {
			config.lang.should.equal('en');
			API.setCulture('fr');
			config.lang.should.equal('fr');
			done();
		});

		it('should change the forecsast type', function(done) {
			config.forecastType.should.equal('');
			API.setForecastType('daily');
			config.forecastType.should.equal('daily');
			done();
		});

		it('should set the APPID', function(done) {
			config.APPID.should.equal('');
			API.setAPPID('Best APPID ever');
			config.APPID.should.equal('Best APPID ever');
			done();
		});

		it('should reset default settings', function(done) {
			config.lang.should.equal('en');
			API.setCulture('fr');
			config.lang.should.equal('fr');

			config.forecastType.should.equal('');
			API.setForecastType('daily');
			config.forecastType.should.equal('daily');

			config.APPID.should.equal('');
			API.setAPPID('Best APPID ever');
			config.APPID.should.equal('Best APPID ever');

			API.default();
			config.lang.should.equal('en');
			config.forecastType.should.equal('');
			config.APPID.should.equal('');

			done();
		});
	});

	describe('#query', function() {
		it('should get the weather for lyon with name', function(done) {
			API.now('Lyon', function(err, data) {
				expect(err).to.not.exist;
				expect(data).to.exist;
				expect(data).to.have.keys(['type', 'values']);
				done();
			});
		});

		it('should get the weather for lyon with id', function(done) {
			API.now(2996944, function(err, data) {
				expect(err).to.not.exist;
				expect(data).to.exist;
				expect(data).to.have.keys(['type', 'values']);
				done();
			});
		});

		it('should get the weather for lyon with coordinates', function(done) {
			API.now([45.75,4.85], function(err, data) {
				expect(err).to.not.exist;
				expect(data).to.exist;
				expect(data).to.have.keys(['type', 'values']);
				done();
			});
		});
	});
});