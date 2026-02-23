import { config } from '@n8n/node-cli/eslint';

export default [
	// include base n8n config first
	...config,

	// ignore patterns
	{
		ignores: [
			'.eslintrc.js',
			'**/*.js',
			'**/node_modules/**',
			'**/dist/**',
			'**//__tests__/**',
			'nodes/Apify/__tests__/**',
		],
	},

	// global rules
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},

	// nodes specific
	{
		files: ['nodes/**/*.ts'],
		rules: {
			'n8n-nodes-base/node-param-default-wrong-for-limit': 'off',
		},
	},
];