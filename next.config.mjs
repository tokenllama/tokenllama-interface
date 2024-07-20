/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tokens.pancakeswap.finance'
            },
            {
                protocol: 'https',
                hostname: 'assets.coingecko.com'
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'polygonscan.com'
            },
            {
                protocol: 'https',
                hostname: 'www.dropbox.com'
            },
            {
                protocol: 'https',
                hostname: 'github.com'
            },
            {
                protocol: 'https',
                hostname: 's2.coinmarketcap.com'
            },
            {
                protocol: 'https',
                hostname: 'etherscan.io'
            },
        ]
    }
};

export default nextConfig;
