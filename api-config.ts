import type { CreateClientConfig } from './lib/api/client.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
	...config,
	credentials: 'include',
	baseUrl: 'http://localhost:8000/api',
	parseAs: 'auto',
	headers: { ...config?.headers },
});
