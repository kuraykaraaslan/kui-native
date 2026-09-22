const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// inlineRem: NativeWind defaults to 14px per rem on native; KuiReact (the web)
// uses the browser's 16px, so every rem-based size (p-4, w-72, text-sm...) came
// out 12.5% smaller on device. 16 makes native sizes match the web 1:1.
module.exports = withNativeWind(config, { input: "./global.css", inlineRem: 16 });
