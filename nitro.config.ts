import { defineNitroConfig } from "nitropack/config";
import { baseImports } from "./imports";

// https://nitro.build/config
export default defineNitroConfig({
  compatibilityDate: "latest",
  errorHandler: "~/error",
  srcDir: "server",
  runtimeConfig: {
    mongoUri: "mongodb://root:example@localhost:27017/",
    secret: "secret",
  },
  imports: {
    dts: true,
    imports: [...baseImports],
    presets: [
      {
        from: "zod",
        imports: ["z"],
      },
    ],
    dirs: ["./server/composables"],
  },
});
