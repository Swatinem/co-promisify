/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

import co from 'visionmedia/co@3';
var slice = Array.prototype.slice;

export default promisify;

function promisify(gen) {
	return function () {
		var args = slice.call(arguments);
		return new Promise((resolve, reject) => {
			args.push((err, res) => err ? reject(err) : resolve(res));
			co(gen).apply(this, args);
		});
	}
}

