import {sveltekit} from "@sveltejs/kit/vite";
import {defineConfig} from "vitest/config";
import path from "node:path";
import dotenvExpand from "dotenv-expand";
import {loadEnv} from "vite";

export default ({mode}) => {
  // This check is important!
  console.log(mode);
  if (mode === "development") {
    const env = loadEnv(mode, process.cwd(), "");
    dotenvExpand.expand({parsed: env});
  }
  return defineConfig({
    plugins: [sveltekit()],
    test: {
      include: ["src/**/*.{test,spec}.{js,ts}"],
    },
    resolve: {
      alias: {
        $md: path.resolve(".", "src/md"),
        $QWER: path.resolve(".", "QWER"),
        $generated: path.resolve(".", "src/generated"),
        $stores: path.resolve(".", "src/lib/stores"),
        $i18n: path.resolve(".", "src/i18n"),
        $config: path.resolve(".", "user/config"),
        $assets: path.resolve(".", "user/assets"),
        $custom: path.resolve(".", "user/custom"),
        $static: path.resolve(".", "static"),
      },
    },
    server: {
      fs: {
        allow: [".."],
      },
    },
    // define: {
    // 	'process.env': process.env
    // }
  });
};
