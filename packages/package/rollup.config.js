// Import required Rollup plugins
import commonjs from "@rollup/plugin-commonjs"; // Converts CommonJS modules to ES6
import { nodeResolve } from "@rollup/plugin-node-resolve"; // Helps Rollup find node_modules
import typescript from "@rollup/plugin-typescript"; // Adds TypeScript support

export default {
  // Entry point of the application
  input: "src/index.ts",

  // Output configurations for different module formats
  output: [
    {
      // UMD (Universal Module Definition) output
      file: "dist/typescript-library-boilerplate.bundle.js", // Output file path
      format: "umd", // Format suitable for browser and Node.js
      name: "typescript-library-boilerplate", // Global variable name in UMD builds
      sourcemap: true, // Generate source maps for debugging
    },
    {
      // ES Module output
      file: "dist/index.mjs", // Output file path
      format: "es", // Modern ES Module format
      sourcemap: true, // Generate source maps for debugging
    },
    {
      // CommonJS output
      file: "dist/index.cjs", // Output file path
      format: "cjs", // CommonJS format for Node.js
      sourcemap: true, // Generate source maps for debugging
    },
  ],

  // Array of plugins to process the bundle
  plugins: [
    nodeResolve(), // Resolves node_modules imports
    commonjs(), // Converts CommonJS to ES modules
    typescript({
      // TypeScript compilation plugin
      tsconfig: "./tsconfig-esm.json", // Path to TypeScript config file
    }),
  ],

  // External dependencies that shouldn't be bundled
  external: [
    // List libraries to keep external
  ],

  // Custom warning handler function
  onwarn: (warning) => {
    // List of warning codes to suppress
    const skipCodes = [
      "THIS_IS_UNDEFINED", // Suppress undefined 'this' warnings
      "MISSING_GLOBAL_NAME", // Suppress missing global name warnings
    ];
    // If warning is in skip list, don't log it
    if (skipCodes.indexOf(warning.code) !== -1) return;
    // Log all other warnings to console
    console.error(warning);
  },
};
