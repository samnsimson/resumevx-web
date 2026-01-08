import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	experimental: { optimizePackageImports: ['@chakra-ui/react'], authInterrupts: true },
	rewrites: () => [{ source: '/doc/:path*', destination: 'https://resume-vx-dev.s3.us-east-1.amazonaws.com/:path*' }],
};

export default nextConfig;
