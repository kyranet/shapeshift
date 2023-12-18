import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { defineConfig, type Options } from 'tsup';

const baseOptions: Options = {
	clean: true,
	dts: true,
	entry: ['src/index.ts'],
	minify: false,
	external: ['fast-deep-equal', 'lodash'],
	sourcemap: true,
	target: 'es2020',
	tsconfig: 'src/tsconfig.json',
	keepNames: true,
	treeshake: true,
	esbuildPlugins: [nodeModulesPolyfillPlugin()]
};

export default [
	defineConfig({
		...baseOptions,
		outDir: 'dist/cjs',
		format: 'cjs',
		outExtension: () => ({ js: '.cjs' })
	}),
	defineConfig({
		...baseOptions,
		outDir: 'dist/esm',
		format: 'esm'
	}),
	defineConfig({
		...baseOptions,
		globalName: 'SapphireShapeshift',
		dts: false,
		outDir: 'dist/iife',
		format: 'iife'
	})
];
