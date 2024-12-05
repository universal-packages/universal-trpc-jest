# tRPC Jest

[![npm version](https://badge.fury.io/js/@universal-packages%2Ftrpc-jest.svg)](https://www.npmjs.com/package/@universal-packages/trpc-jest)
[![Testing](https://github.com/universal-packages/universal-trpc-jest/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-trpc-jest/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-trpc-jest/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-trpc-jest)

Jest tooling for trpc. This library does not mock the trpc client nor uses an trpc caller to test your trpc router, it actually servers a test trpc server and actually make the requests to it.

In most cases you should test your router using a caller to test your router function directly, but if you want to tests the whole integration and find useful test your app as if it was the client calling it this is the library for you.

## Install

```shell
npm install @universal-packages/trpc-jest
```

## Setup

Add the following to your `jest.config.js` or where you configure Jest:

```js
module.exports = {
  setupFilesAfterEnv: ['@universal-packages/trpc-jest']
}
```

## Jest Globals

### trpcJest

#### **`trpcJest.runTrpcServer(Router: AnyTRPCRouter)`**

Starts a new trpc server for the given router. Call this at teh top of your file. This will run a server to be used by all test cases.

```js
import { appRouter } from './appRouter'

trpcJest.runTrpcServer(appRouter)

it('should be called', async () => {
  ...
})
```

#### **`trpcJest.client(router: AnyTRPCRouter)`**

Prepares a trpc client for the given router. Call your endpoint functions using this client.

```js
import { appRouter } from './appRouter'

trpcJest.runTrpcServer(appRouter)

it('should be called', async () => {
  const result = await trpcJest.client(appRouter).getUsers.query()
})
```

## Typescript

In order for typescript to see the global types you need to reference the types somewhere in your project, normally `./src/globals.d.ts`.

```ts
/// <reference types="@universal-packages/trpc-jest" />
```

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
