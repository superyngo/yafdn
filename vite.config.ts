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
        $generated: path.resolve(".", "src/lib/components/qwer/generated"),
        $stores: path.resolve(".", "src/lib/components/qwer/stores"),
        $i18n: path.resolve(".", "src/lib/components/qwer/i18n"),
        $config: path.resolve(".", "src/lib/components/qwer/user/config"),
        $assets: path.resolve(".", "src/lib/components/qwer/user/assets"),
        $custom: path.resolve(".", "src/lib/components/qwer/user/custom"),
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
