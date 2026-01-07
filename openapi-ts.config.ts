import { config } from 'dotenv';
import { defineConfig } from '@hey-api/openapi-ts';

const nodeEnv = process.env.NODE_ENV || 'development';
if (nodeEnv === 'production') config({ path: '.env.production' });
else config({ path: '.env.local' });

const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL or API_URL is not set');

export default defineConfig({
	input: `${apiUrl}/openapi.json`,
	output: 'lib/api',
	plugins: [
		{ name: '@hey-api/typescript' },
		{ name: '@hey-api/transformers' },
		{ name: '@tanstack/react-query' },
		{ name: '@hey-api/sdk', transformer: true, asClass: true, classNameBuilder: (name) => `${name}Api` },
		{ name: '@hey-api/client-next', runtimeConfigPath: '../../api-config' },
	],
});
