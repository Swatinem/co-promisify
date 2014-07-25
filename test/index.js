/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

var expect = require('chai').expect;
var co = require('../build');

describe('co-promisify', function () {
	it('should return a promise', function () {
		expect(co(function* () {})().then).to.be.a('function');
	});
	it('should actually call the fn', function (done) {
		var called = false;
		co(function* () {
			yield setImmediate;
			called = true;
		})().then(function () {
			expect(called).to.be.true;
			done();
		});
	});
	it('should pass in values when returning', function () {
		return co(function* () {
			return 2;
		})().then(function (res) {
			expect(res).to.eql(2);
		});
	});
	it('should reject when throwing', function (done) {
		var err = new Error('foo');
		co(function* () {
			yield setImmediate;
			throw err;
			done(err);
		})().then(function () { done(err); }, function (rej) {
			expect(rej).to.equal(err);
			done();
		});
	});
	it('should pass in arguments', function () {
		return co(function* (arg1) {
			yield setImmediate;
			expect(arg1).to.eql(2);
		})(2);
	});
	it('should pass in fn arguments', function () {
		return co(function* (arg1) {
			yield setImmediate;
			expect(arg1).to.be.a('function');
		})(function () {});
	});
});

