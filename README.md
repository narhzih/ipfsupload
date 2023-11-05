# IPFS file upload

This repository demonstrates how to upload a file to an IPFS storage using NodeJs, Typescript, and [Web3Storage](https://web3.storage/docs/)

The Postman documentation can be found [here](https://documenter.getpostman.com/view/8405540/2s9YXfaNdG)

## Requirements

- NodeJs >= 16
- A [Web3Storage API Token](https://web3.storage/docs/#get-an-api-token)
- Docker

## Initial Setup

To properly setup and run the project, please follow the instructions below:

- After cloning the project, cd into the root directory
- Run ```cp .env.example .env```. This command will copy the .env.example file and rename it as `.env`
- Fill the contents of the `.env` with the required values

### Running with Docker

To run the API using Docker

- Once that setup is done is done, you can start the project using `docker-compose up -d` (the api uses port `3000` automatically. You should make sure nothing is running on that port, or simply edit the port)
- If you don't want to use Docker, you can just run `npm install`, which will install all

### Running without Docker

To run the API without docker:

- Run `npm install` to install the necessary dependencies
- Use `npm run start` to run the api, which should start a server on port 3000

## Testing

The project contains both a `unit test suite` and an `end-to-end` test suite, all orchestrated using the Jest testing library.

- The unit test suites are written inside the folder that contains the file they're testing, in a `__test__` folder. For example, all the tests  for `*.helper.ts` files are written in the `__test__` folder inside the `helpers` directory. Same pattern goes for the service, and any other unit tests.

- All `e2e` tests are written in the `src/__test__/e2e` directory.
- All the test Config files can be found in `src/__test__/config`
- Use the commands `npm run test:unit` to run unit tests, `npm run test:e2e` to run e2e tests, and `npm run test` to run all tests.

## Needed improvements

- As much as the API allows the uploads of files > 100MB, it is very slow. It takes up to 2 minutes to get a response back from the server when an upload request
of such file is being made. This can be better improved by using a more robust upload logic, that has a tracking system which users can use to see the current upload progress.
- The Current IPFS storage being used doesn't allow for the easy implementation of handling large files uploads using the currently available libraries. It also isn't easy to write e2e tests around the upload process. This could probably be improved later on by using another IPFS storage
