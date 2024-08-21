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
These environment variables must be executed during the build phase, and make sure all environments are set before building or compiling the application. The application should only read environments from the .env file, but never upload the .env file to the Git repository or you will lose the point.

```sh
AUTH_SECRET="GENERATE_RANDOM_STRING_SECRET"
NEXT_PUBLIC_COGNITO_CLIENT_ID=YOUR_COGNITO_APPS_CLIENT_ID
NEXT_PUBLUC_COGNITO_ID_TOKEN_EXPIRED=YOUR_COGNITO_ID_TOKEN_EXPIRED_IN_MINUTES
NEXT_PUBLIC_API_GATEWAY_URL=YOUR_API_GATEWAY_URL
```

To generate random string for auth secret you can use this command:
```sh
openssl rand -base64 16
```
