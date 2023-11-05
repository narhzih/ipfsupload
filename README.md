# IPFS file upload

This repository demonstrates how to upload a file to an IPFS storage using NodeJs, Typescript, and [Web3Storage](https://web3.storage/docs/)

The Postman documentation can be found [here](https://google.com)

## Requirements

- NodeJs >= 16
- A [Web3Storage API Token](https://web3.storage/docs/#get-an-api-token) 
- Docker

## Initial Setup

To proper setup and run the project, please follow the instructions below

- After cloning the project, cd into the root directory
- Run ```cp .env.example .env```. This command will copy the .env.example file and rename it as `.env`
- Fill the contents of the `.env` with the required values
- Once that is done, you can start the project using `docker-compose up -d` (the api uses port `3000` automatically. You should make sure nothing is running on that port, or simply edit the port)

## Testing

The project contains both a `unit test suite` and an `end-to-end` test suite, all orchestrated using the Jest testing library.

- The unit test suites are written inside the folder that contains the file they're testing, in a `__test__` folder. For example, all the tests  for `*.helper.ts` files are written in the `__test__` folder inside the `helpers` directory. Same pattern goes for the service, and any other unit tests.

- All `e2e` tests are written in the `src/__test__/e2e` directory.
- All the test Config files can be found in `src/__test__/config`

