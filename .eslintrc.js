module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true
	},
	plugins: ['import', 'compat', 'node'],
	extends: [
		'plugin:vue/base',
		'airbnb-base/legacy',
	],
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module',
		ecmaVersion: 9,
		ecmaFeatures: {
			sourceType: 'module',
		},
		allowImportExportEverywhere: true
	},
	rules: {
		'compat/compat': 1,
		'node/no-deprecated-api': 2,
		'node/no-extraneous-require': 2,
		'node/no-missing-require': 2,
		'import/no-unresolved': [2, {commonjs: true, amd: true}],
		'import/named': 2,
		'import/namespace': 2,
		'import/default': 2,
		'import/export': 2,
		'no-console': 0,
		'curly': 0,
		'no-return-assign': 0,
		"indent": [2, "tab"],
		"no-tabs": 0,
		'global-require':0,
		"semi": [2, "always"]
	}
};
