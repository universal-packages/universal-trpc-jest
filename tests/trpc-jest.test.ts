import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

import '../src'

function createContext() {
  return { session: { userId: '1' } }
}

const trpc = initTRPC.context<typeof createContext>().create({ transformer: superjson })

const appRouter = trpc.router({
  getUser: trpc.procedure.query(({ ctx }) => {
    return { id: ctx.session.userId, name: 'Tim', headers: ctx['req'].headers['x-test'], date: new Date() }
  })
})

trpcJest.setServerPath('/trpc')
trpcJest.runTrpcServer(appRouter, createContext())

describe('trpc-jest', (): void => {
  it('can use client to access the server ran at tio', async (): Promise<void> => {
    trpcJest.setClientHeaders({ 'x-test': 'test' })
    expect(await trpcJest.client(appRouter).getUser.query()).toEqual({
      id: '1',
      name: 'Tim',
      date: expect.any(String),
      headers: 'test'
    })
  })
})
