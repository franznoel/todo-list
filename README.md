# todo-list

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

A simple todo list using Serverless Offline and React

## How To Use

Run the following commands:

```
# Run an image of PgSQL DB server
docker-compose up

# Install the dependencies from package-lock.json
npm ci

# Initialize the database schema
npm run migrate:latest

# Populate data to the PG SQL database
npm run seed:run

# Starts both the REST API server and the React application
npm start
```

Then, you may now access the application, possibly at http://localhost:3000

## API

To access and test the API in Postman, you may import the file Todo.postman_collection.json.

Here are the following APIs

```
# Main page for Todo app
GET http://localhost:3000

# Get all the todo
GET http://localhost:3000/todo

# Create a todo application given that the `description` is supplied in the body as JSON string
POST http://localhost:3000/todo

# Edits the description or the checkbox states of a Todo row.
PUT http://localhost:3000/todo/:todoId

# Delete the Todo
DELETE http://localhost:3000/todo/:todoId
```

## Overview

### How Does It Work?

The `todo-list` application uses Serverless, which runs the server similar to an API Gateway and an S3 Bucket. It is a clone and an iteration of the `serverless-react-boilerplate`

The `serververless.yml` contains all the API services, which serves both the API and the HTML page. It is using `webpack.server.config.js` to compile the `.ts`, `.tsx`, `.js`, and `.jsx` files.

Every time `npm start` is ran, it will run the `serverless-offline` setting from `serverless.yml`. Then, `.webpack` folder is created to be used by Serverless and serve it in http://localhost:3000. Feel free to check the `serverless.yml` file. When the user.

Some additional files and modifications from the `serverless-react-boilerplate` include the following:

### Edited Folder Structure

```
todo-list/
│
├── migrations/
│   └── 20220911185054_todo.ts - Migration file to populate the schema
├── seeds/
│   └── todo.ts - Populates data for the todo table in Postgres DB
└── src/
    ├── api/
    │   ├── handler.ts - Server for the HTML page
    │   └── todo.ts - The controllers or handlers for the `serverless.yml`
    ├── browser/
    │   └── index.tsx - Used when the any changes happens within the Todo page. Additional React Query Provider were added
    ├── server/
    │   └── render.tsx - Used when first load of the Todo page. Additional React Query Provider were added
    ├── interfaces/
    │   └── iTodo.ts - interface for Todo object
    ├── models/
    │   └── pg/
    │       ├── pgKnex.ts - DB adapter using Knex
    │       └── TodoPgModel.ts - Postgres DB calls and contains queries using Knex
    ├── App.tsx - Todo application
    ├── package.json - Added Knex, MUI, dotenv, and ts-node libraries
    ├── knexfile.ts - Configuration for Knex in different environments
    ├── docker-compose.yml - Postgres Server Docker image
    ├── .env.dist - Distribution environment variables for dotenv
    ├── serverless.yml - Changes for the configuration of serving the API Gateway
    ├── Todo.postman_collection.json - Postman file for communicating with API
    ├── tsconfig.json - Path settings and other configurations
    └── webpack.server.config.js - Changes for the configuration of Webpack
```

See details for folder structure of `serverless-react-boilerplate`.

### How the TodoApp Application work

The application is using Material UI. The main features include DataGrid, TextField, Button, and native form.

The application can:

1. Gets all the todo list from the `todo` database table
2. Add a Todo description by using the top form
3. Update a Todo description by double clicking on the description
4. Delete a Todo by clicking on Delete button
5. Use the checkbox to change the Todo status

All actions makes sure that the server persists first before rendering back to the React interface.
