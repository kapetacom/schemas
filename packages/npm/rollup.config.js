const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const external = require("rollup-plugin-peer-deps-external");
const {dts} = require("rollup-plugin-dts");
const json = require("@rollup/plugin-json");
const bundleSize = require('rollup-plugin-bundle-size');
import sizes from 'rollup-plugin-sizes';
const packageJson = require("./package.json");

module.exports = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        name: packageJson.name,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [external(), resolve(), commonjs(), typescript(), json(), bundleSize(), sizes()],
  },
  {
    input: "dist/esm/types/src/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.(css|less)$/],
    plugins: [dts()],
  },
];
