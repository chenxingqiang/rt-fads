/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['mermaid'],
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        os: false,
        util: false,
        assert: false,
        url: false,
        buffer: require.resolve('buffer/'),
        process: require.resolve('process/browser')
      }
    }

    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader'],
    })

    config.ignoreWarnings = [/Failed to parse source map/]

    return config
  },
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['mermaid']
  }
}

module.exports = nextConfig
