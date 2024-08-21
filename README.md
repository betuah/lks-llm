# English Chat Apps
This is an AI assistant application designed specifically for learning English. It aims to provide a comprehensive and interactive learning experience for users who want to improve their English language skills. The application uses advanced AI technologies to facilitate engaging and effective language learning through various interactive features.

## TechStack

English Chat App System uses a number of technology stack to work properly:
- [Node.js](https://nodejs.org/) - Runtime for the lambda function
- [NextJS](https://nextjs.org/) - Progressive, incrementally-adoptable JavaScript framework
- [API Gateway](https://aws.amazon.com/api-gateway/) - Fully managed service for creating, publishing, maintaining, monitoring, and securing APIs at any scale.
- [Amazon Cognito](https://aws.amazon.com/pm/cognito/) - User authentication, authorization, and user management service for web and mobile apps
- [PostgresQL](https://www.postgresql.org) - Powerful, open-source, relational database.

<hr>

## Font-End Setup
The root folder for Front-End projects is **client-apps**.
### Front-End Environment Variable
These environment variables must be executed during the build phase, and make sure all environments are set before building or compiling the application. The application should only read environments from the .env file, but never upload the .env file to the Git repository or you will lose the point.
```sh
AUTH_SECRET="GENERATE_RANDOM_STRING_SECRET"
AUTH_URL="YOUR_AMPLIFY_URL" # http://AMPLIFY_URL
NEXT_PUBLIC_COGNITO_CLIENT_ID="YOUR_COGNITO_APPS_CLIENT_ID"
NEXT_PUBLUC_COGNITO_ID_TOKEN_EXPIRED="YOUR_COGNITO_ID_TOKEN_EXPIRED_IN_MINUTES" # 10
NEXT_PUBLIC_API_GATEWAY_URL="YOUR_API_GATEWAY_URL"
```

#### Generate Random String
To generate random string for auth secret you can use this command:
```sh
openssl rand -base64 16
```

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

You can use **check page** (`http://FRONTEND_HOST/check`) to check connection to backend endpoint, you need to sign in to access this endpoint.
<hr>

## Backend Setup

### API Endpoint
You can read API Endpoint spesification for `/conversations` on **API Gateway** in Document detail.

### Lambda Source Code
You can use all Lambda requirements in `/serverless/src`.

### LLM Worker setup
All configurations for the LLM Workers should be managed using an Ansible playbook for automated configuration. You can use the Ansible playbook located at `/serverless/playbook.yml` to automate the configuration of all LLM Workers. Be sure to adjust the necessary variables within the playbook file `efs_ip: "YOUR_EFS_IP"`.

In your AWS environment, you can execute this playbook using AWS Systems Manager (SSM) to automate the configuration process.

<hr>

## **LLM API Endpoint**
> ### List Models
```sh
GET /api/tags
```
List models that are available in LLM server. **Example Request** :
```sh
curl http://SERVER_HOST:11434/api/tags
```

> ### Pull Models
```sh
POST /api/pull
```
Download a model from the library. Cancelled pulls are resumed from where they left off, and multiple calls will share the same download progress.

#### Parameters
- `name`: name of the model to pull
- `insecure`: (optional) allow insecure connections to the library. Only use this if you are pulling from your own library during development.
- `stream`: (optional) if `false` the response will be returned as a single response object, rather than a stream of objects
#### Example Request
```sh
curl http://SERVER_HOST:11434/api/pull -d '{
  "name": "orca-mini"
}'
```

> ### Generate Embedding
```sh
POST /api/embed
```
Generate embeddings from a model

#### Parameters
- `model`: name of model to generate embeddings from
- `input`: text or list of text to generate embeddings for

#### Example Request
```sh
curl http://SERVER_HOST:11434/api/embed -d '{
  "model": "nomic-embed-text",
  "input": "Why is the sky blue?"
}'
```

> ### Chat Stream
```sh
POST /api/chat
```
Generate the next message in a chat with a provided model. This is a streaming endpoint, so there will be a series of responses. Streaming can be disabled using "stream": false. The final response object will include statistics and additional data from the request.

#### Parameters
- `model`: name of model
- `messages` : the messages of the chat, this can be used to keep a chat memory
- `stream` : if `false` the response will be returned as a single response object, rather than a stream of objects
The `message` object has the following fields:
- `role`: the role of the message, either `system`, `user`, `assistant`
- `content`: the content of the message

#### Example Request
```sh
curl http://SERVER_HOST:11434/api/chat -d '{
  "model": "orca-mini",
  "messages": [
    {
      "role": "user",
      "content": "why is the sky blue?"
    }
  ]
}'
```

> ### Generate a Completion
```sh
POST /api/generate
```
Generate a response for a given prompt with a provided model. This is a streaming endpoint, so there will be a series of responses. The final response object will include statistics and additional data from the request.

#### Parameters
- `model`: name of model
- `prompt` : the prompt to generate a response
- `stream` : if `false` the response will be returned as a single response object, rather than a stream of objects

#### Example Request
POST Request
```sh
curl http://localhost:11434/api/generate -d '{
  "model": "orca-mini",
  "prompt": "Why is the sky blue?"
}'
```