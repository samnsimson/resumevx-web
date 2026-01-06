import 'dotenv/config';
import type { CreateClientConfig } from './lib/api/client.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
	...config,
	parseAs: 'auto',
	credentials: 'include',
	baseUrl: 'https://frezume-svc-production.up.railway.app/api',
	headers: { ...config?.headers },
});
