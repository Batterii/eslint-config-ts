const base = require('./base').rules;

// List incompatible base rules to replace with their TypeScript equivalents.
const rules = [
	'camelcase',
	'func-call-spacing',
	'indent',
	'no-extra-parens',
	'no-use-before-define',
	'no-useless-constructor',
	'semi',
];

// Build the replacement rules configuration.
const replacement = {};
for (const rule of rules) {
	// Copy base rule configuration (if any) to its TypeScript equivalent.
	if (base[rule]) replacement[`@typescript-eslint/${rule}`] = base[rule];

	// Disable the base rule.
	replacement[rule] = 'off';
}

// Export the replacement rules.
module.exports = replacement;
