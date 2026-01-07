import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: { optimizePackageImports: ['@chakra-ui/react'] },
	rewrites: () => [{ source: '/doc/:path*', destination: 'https://resume-vx-dev.s3.us-east-1.amazonaws.com/:path*' }],
};

export default nextConfig;
