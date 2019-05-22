const replaced = require('./replaced');

module.exports = {
	extends: [
		'./base.js',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
	],
	rules: Object.assign({}, replaced, {
		'@typescript-eslint/explicit-member-accessibility': 'no-public',
	}),
};
