import { initTRPC } from '@trpc/server'

import '../src'

const trpc = initTRPC.create()
const appRouter = trpc.router({
  getUser: trpc.procedure.query(() => {
    return { id: '1', name: 'Tim' }
  })
})

trpcJest.runTrpcServer(appRouter)

describe('trpc-jest', (): void => {
  it('can use client to access the server ran at tio', async (): Promise<void> => {
    expect(await trpcJest.client(appRouter).getUser.query()).toEqual({
      id: '1',
      name: 'Tim'
    })
  })
})
