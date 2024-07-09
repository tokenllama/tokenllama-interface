/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tokens.pancakeswap.finance'
            }
        ]
    }
};

export default nextConfig;
