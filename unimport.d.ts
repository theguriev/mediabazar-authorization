export {}
declare global {
  const $fetch: typeof import('ofetch').$fetch
  const ModelToken: typeof import('./db/model/token').default
  const ModelUser: typeof import('./db/model/user').default
  const afterAll: typeof import('vitest').afterAll
  const beforeAll: typeof import('vitest').beforeAll
  const describe: typeof import('vitest').describe
  const expect: typeof import('vitest').expect
  const issueAccessToken: typeof import('/Users/gurieveugen/work/mediabazar/server/utils/issueAccessToken').default
  const issueRefreshToken: typeof import('/Users/gurieveugen/work/mediabazar/server/utils/issueRefreshToken').default
  const it: typeof import('vitest').it
  const parse: typeof import('set-cookie-parser').parse
  const passwordHash: typeof import('/Users/gurieveugen/work/mediabazar/server/utils/passwordHash').default
  const schemaToken: typeof import('./db/schema/token').default
  const schemaUser: typeof import('./db/schema/user').default
  const uuidv4: typeof import('uuid').v4
}