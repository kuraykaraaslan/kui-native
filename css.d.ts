// TypeScript otherwise reports side-effect imports of .css files (e.g.
// `import "./global.css"` in app/_layout.tsx) as "Cannot find module or type
// declarations" — NativeWind processes these at build time via Metro, not
// through TS's module system, so no runtime shape needs declaring here.
declare module "*.css";
