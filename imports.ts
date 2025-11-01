import { camelCase } from "scule";
import importsHelper from "./importsHelper";

export const baseImports = [
  { name: "$fetch", from: "ofetch" },
  ...(await importsHelper("./db/model")),
  ...(await importsHelper("./db/schema", camelCase)),
  { name: "parse", from: "set-cookie-parser" },
  { name: "createHash", from: "crypto" },
  { name: "SignJWT", from: "jose" },
  { name: "jwtVerify", from: "jose" },
  { name: "EventHandlerRequest", from: "h3", type: true },
  { name: "InferEventInput", from: "h3", type: true },
  { name: "ValidateFunction", from: "h3", type: true },
  { name: "H3Event", from: "h3", type: true },
  { name: "StringValue", from: "ms", type: true },
  { name: "JWTPayload", from: "jose", type: true },
  { name: "Cookie", from: "set-cookie-parser", type: true },
  { name: "v4", as: "uuidv4", from: "uuid" },
  { name: "FetchResponse", from: "ofetch", type: true },
];

export const testImports = [
  { name: "describe", from: "vitest" },
  { name: "it", from: "vitest" },
  { name: "expect", from: "vitest" },
  { name: "beforeAll", from: "vitest" },
  { name: "afterAll", from: "vitest" },
  { name: "parse", from: "set-cookie-parser" },
  ...baseImports,
];
