const nextConfig = {
    reactCompiler: true,
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.giphy.com'
            }
        ]
    }
};

export default nextConfig;
