import 'dotenv/config';
import type { CreateClientConfig } from './lib/api/client.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
	...config,
	parseAs: 'auto',
	credentials: 'include',
	baseUrl: process.env.API_URL,
	headers: { ...config?.headers },
});
