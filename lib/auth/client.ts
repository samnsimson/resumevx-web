import { auth } from '@repo/auth';
import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields, usernameClient, emailOTPClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	basePath: '/api/auth',
	baseURL: 'http://localhost:3000',
	plugins: [inferAdditionalFields<typeof auth>(), usernameClient(), emailOTPClient()],
});
