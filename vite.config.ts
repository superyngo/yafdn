import {sveltekit} from "@sveltejs/kit/vite";
import {defineConfig} from "vitest/config";
// import dotenvExpand from "dotenv-expand";
import {loadEnv} from "vite";
// import alias from "@rollup/plugin-alias";

export default defineConfig(
  // ({mode}) => {
  // This check is important!
  // if (mode === "development") {
  //   const env = loadEnv(mode, process.cwd(), "");
  //   dotenvExpand.expand({parsed: env});
  // }

  // return
  {
    plugins: [sveltekit()],
    test: {
      include: ["src/**/*.{test,spec}.{js,ts}"],
    },
    // resolve: {alias: {"/@": path.resolve(__dirname, "src")}},
    // define: {
    // 	'process.env': process.env
    // }
  }
  // }
);
