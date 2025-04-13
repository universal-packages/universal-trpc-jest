import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

import '../src'

function createContext() {
  return { session: { userId: '1' } }
}

const trpc = initTRPC.context<typeof createContext>().create({ transformer: superjson })

const appRouter = trpc.router({
  getUser: trpc.procedure.query(({ ctx }) => {
    return { id: ctx.session.userId, name: 'Tim', date: new Date() }
  })
})

trpcJest.runTrpcServer(appRouter, createContext())

describe('trpc-jest', (): void => {
  it('can use client to access the server ran at tio', async (): Promise<void> => {
    expect(await trpcJest.client(appRouter).getUser.query()).toEqual({
      id: '1',
      name: 'Tim',
      date: expect.any(String)
    })
  })
})
