import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/typescript-library-boilerplate.bundle.js',
      format: 'umd',
      name: 'typescript-library-boilerplate',
      sourcemap: true
    },
    {
      file: 'dist/index.mjs',
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig-esm.json'
    })
  ],
  external: [
    // put some third party libraries here
  ],
  onwarn: (warning) => {
    const skipCodes = [
      'THIS_IS_UNDEFINED',
      'MISSING_GLOBAL_NAME'
    ]
    if (skipCodes.indexOf(warning.code) !== -1) return
    console.error(warning)
  }
}
