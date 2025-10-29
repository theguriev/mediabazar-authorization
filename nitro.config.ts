import { defineNitroConfig } from "nitropack/config";
import { camelCase } from "scule";
import importsHelper from "./importsHelper";

// https://nitro.build/config
export default defineNitroConfig({
  compatibilityDate: "latest",
  srcDir: "server",
  runtimeConfig: {
    mongoUri: "mongodb://root:example@localhost:27017/",
    secret: "secret",
  },
  imports: {
    dts: true,
    imports: [
      ...(await importsHelper("./db/model")),
      ...(await importsHelper("./db/schema", camelCase)),
      { name: "parse", from: "set-cookie-parser" },
      { name: "v4", from: "uuid" },
      { name: "createHash", from: "crypto" },
      { name: "SignJWT", from: "jose" },
      { name: "jwtVerify", from: "jose" },
      { name: "EventHandlerRequest", from: "h3", type: true },
      { name: "H3Event", from: "h3", type: true },
      { name: "StringValue", from: "ms", type: true },
      { name: "JWTPayload", from: "jose", type: true },
    ],
    presets: [
      {
        from: "zod",
        imports: ["z"],
      },
    ],
    dirs: ["./composables"],
  },
});
