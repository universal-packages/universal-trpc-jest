import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { AnyTRPCRouter } from '@trpc/server'
import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { Server } from 'http'

import './globals'

const DEFAULT_HOST = 'localhost'
const DEFAULT_PORT = 4000 + Number(process.env['JEST_WORKER_ID'])
const DEFAULT_SERVER_PATH = ''
let SERVER_PATH = DEFAULT_SERVER_PATH
let CLIENT_PATH = DEFAULT_SERVER_PATH
let HEADERS: Record<string, string> = {}
let SERVER: Server

beforeAll(async () => {
  if (SERVER) {
    await new Promise<void>((resolve): void => {
      SERVER = SERVER.listen(DEFAULT_PORT, DEFAULT_HOST, resolve)
    })
  }
})

afterAll(async () => {
  if (SERVER) {
    await new Promise<void>((resolve, reject): void => {
      SERVER.close((error) => {
        if (error) reject(error)

        resolve()
      })
    })
  }
})

global.trpcJest = {
  runTrpcServer: async function runTrpcServer<R extends AnyTRPCRouter, C = any>(router: R, context?: C) {
    SERVER = createHTTPServer({ router, basePath: SERVER_PATH, createContext: (ctx) => ({ ...ctx, ...context }) })
  },

  client: function client<R extends AnyTRPCRouter>(router: R) {
    const client = createTRPCClient<typeof router>({
      links: [httpBatchLink({ url: `http://${DEFAULT_HOST}:${DEFAULT_PORT}${CLIENT_PATH}`, transformer: router._def._config.transformer, headers: HEADERS } as any)]
    })

    return client
  },
  setServerPath: function setServerPath(path: string) {
    SERVER_PATH = path
    CLIENT_PATH = `/${path}`
  },
  setClientHeaders: function setHeaders(headers: Record<string, string>) {
    HEADERS = headers
  }
}
