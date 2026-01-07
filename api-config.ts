import 'dotenv/config';
import type { CreateClientConfig } from './lib/api/client.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
	...config,
	parseAs: 'auto',
	credentials: 'include',
	baseUrl: process.env.NEXT_PUBLIC_API_URL || process.env.API_URL,
	headers: { ...config?.headers },
});
