import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
	input: 'http://localhost:8000/api/openapi.json',
	output: 'lib/api',
	plugins: [
		{ name: '@hey-api/typescript' },
		{ name: '@hey-api/transformers' },
		{ name: '@tanstack/react-query' },
		{ name: '@hey-api/sdk', transformer: true, asClass: true, classNameBuilder: (name) => `${name}Api` },
		{ name: '@hey-api/client-next', runtimeConfigPath: '../../api-config' },
	],
});
