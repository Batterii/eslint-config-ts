// Import base Node rules.
const base = require('@batterii/eslint-config-node').rules;

// List incompatible rules to replace with their TypeScript equivalents.
const replacedRules = [
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
for (const rule of replacedRules) {
	// Copy base rule configuration (if any) to its TypeScript equivalent.
	if (base[rule]) replacement[`@typescript-eslint/${rule}`] = base[rule];

	// Disable the base rule.
	replacement[rule] = 'off';
}

module.exports = {
	extends: [
		'@batterii/eslint-config-node',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
	},
	plugins: [
		'@typescript-eslint',
	],
	// Merge any additional Typescript-specific rules with replacement rules.
	rules: Object.assign({}, replacement, {
		'@typescript-eslint/ban-ts-ignore': 'error',
		'@typescript-eslint/explicit-function-return-type': [
			'error',
			{ allowExpressions: true },
		],
		'@typescript-eslint/explicit-member-accessibility': [
			'error',
			{ accessibility: 'no-public' },
		],
		'@typescript-eslint/generic-type-naming': [ 'error', '^T' ],
		'@typescript-eslint/member-naming': [
			'error',
			{ private: '^_' },
		],
		'@typescript-eslint/member-ordering': 'error',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-extraneous-class': 'error',
		'@typescript-eslint/no-for-in-array': 'warn',
		'@typescript-eslint/no-misused-promises': 'error',
		'@typescript-eslint/no-require-imports': 'error',
		'@typescript-eslint/no-type-alias': 'warn',
		'@typescript-eslint/no-unnecessary-qualifier': 'error',
		'@typescript-eslint/no-unnecessary-type-assertion': 'error',
		'@typescript-eslint/prefer-for-of': 'error',
		'@typescript-eslint/prefer-includes': 'error',
		'@typescript-eslint/prefer-regexp-exec': 'error',
		'@typescript-eslint/prefer-string-starts-ends-with': 'error',
		'@typescript-eslint/promise-function-async': [
			'error',
			{ checkArrowFunctions: false },
		],
		'@typescript-eslint/require-await': 'error',
		'@typescript-eslint/restrict-plus-operands': 'error',
		'@typescript-eslint/unbound-method': 'error',
		'@typescript-eslint/unified-signatures': 'error',

		// Dupe class members are needed for overloads, so turn this off.
		'no-dupe-class-members': 'off',
	}),
};
