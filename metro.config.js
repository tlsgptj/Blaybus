const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();

  return {
    resolver: {
      assetExts: [...assetExts, 'txt', 'xml'],
      sourceExts: [...sourceExts, 'js', 'jsx', 'ts', 'tsx']
    }
  };
})();
