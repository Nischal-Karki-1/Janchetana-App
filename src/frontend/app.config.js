module.exports = () => ({
    expo: {
      name: process.env.APP_NAME || 'Janchetana App',
      slug: 'nagarik-app',
      version: '1.0.0',
      extra: {
        eas: {
          projectId: '66b09166-7441-4542-9cf5-017722f24b94',
        },
      },
      platforms: ['ios', 'android'],
      ios: {
        bundleIdentifier: 'com.example.janchetanaapp',
        supportsTablet: true,
      },
      android: {
        config: {
          googleMaps: {
            apiKey: process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyDn05sre7H18k7wo95kG5fQkjQoxKEBvko',
          },
        },
        package: 'com.example.nagarikapp',
        versionCode: 1,
        permissions: ['INTERNET'],
      },
      scheme: 'com.falcx.nagarikapp',
      assetBundlePatterns: ['**/*'],
      splash: {
        image: './assets/pin.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
      icon: process.env.APP_ICON || './assets/logo.png',
    },
  });
  