# Bank Node
##  Project Serveless in Typescript
Project with the objective of simulating a bank

## Features

- Create Account
- Deposit amount into an account
- Withdraw amount into an account
- Transfer amount between accounts
- Get Account informations

## Tech

Dillinger uses a number of open source projects to work properly:

- [Node](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [SAM](https://aws.amazon.com/pt/serverless/sam/)
- [DynamoDb](https://aws.amazon.com/pt/dynamodb/)

## Running

Node Bank requires [Node.js](https://nodejs.org/) v14+ to run.

First up the docker with the dynamo:

```sh
docker-compose up
```

To run local with SAM:

```sh
npm install
sam build
sam local start-api
```

Debugging Application with SAM: 

```sh
sam local start-api --template template.yml --debug-port=5858
```

Run Local Without SAM: 

```sh
npm run dev
```
