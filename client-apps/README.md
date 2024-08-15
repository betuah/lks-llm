This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open ***`http://YOUR_DOMAIN_OR_IP`*** with your browser to see the result. You can point to ***`http://YOUR_DOMAIN_OR_IP/check`*** for check all the API Endpoint, you still need sigin in to get token from cognito to verifying each endpoint with Authorization.

## Environment Variable
```sh
AUTH_SECRET="zUvdxo/BuxpW5xeWLR2Z9j2SPOalJkZzR689L1RNH8Q="
NEXT_PUBLIC_COGNITO_CLIENT_ID=YOUR_COGNITO_APPS_CLIENT_ID
NEXT_PUBLUC_COGNITO_ID_TOKEN_EXPIRED=YOUR_COGNITO_ID_TOKEN_EXPIRED_IN_MINUTES
NEXT_PUBLIC_API_GATEWAY_URL=YOUR_API_GATEWAY_URL
```
