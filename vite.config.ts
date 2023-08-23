import {sveltekit} from "@sveltejs/kit/vite";
import {defineConfig} from "vitest/config";
import path from "node:path";
import dotenvExpand from "dotenv-expand";
import {loadEnv} from "vite";

export default ({mode}) => {
  // This check is important!
  if (mode === "development") {
    const env = loadEnv(mode, process.cwd(), "");
    dotenvExpand.expand({parsed: env});
  }
  return defineConfig({
    plugins: [sveltekit()],
    test: {
      include: ["src/**/*.{test,spec}.{js,ts}"],
    },
    resolve: {alias: {$md: path.resolve(".", "src/md")}},
    // define: {
    // 	'process.env': process.env
    // }
  });
};
