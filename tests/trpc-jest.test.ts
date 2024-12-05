import { initTRPC } from '@trpc/server'

import '../src'

function createContext() {
  return { session: { userId: '1' } }
}

const trpc = initTRPC.context<typeof createContext>().create()

const appRouter = trpc.router({
  getUser: trpc.procedure.query(({ ctx }) => {
    return { id: ctx.session.userId, name: 'Tim' }
  })
})

trpcJest.runTrpcServer(appRouter, createContext())

describe('trpc-jest', (): void => {
  it('can use client to access the server ran at tio', async (): Promise<void> => {
    expect(await trpcJest.client(appRouter).getUser.query()).toEqual({
      id: '1',
      name: 'Tim'
    })
  })
})
