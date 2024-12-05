import { createTRPCClient } from '@trpc/client'
import { AnyTRPCRouter } from '@trpc/server'

declare global {
  namespace trpcJest {
    function runTrpcServer<R extends AnyTRPCRouter, C = any>(router: R, context?: C): void
    function client<R extends AnyTRPCRouter>(router: R): ReturnType<typeof createTRPCClient<R>>
  }
}

export {}
