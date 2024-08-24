# ShowPlanner

The ShowPlanner is an application for helping manage the scheduling and rostering of people for a show.

## Requirements

### Swagger

For generating the backend code from the swagger definition file you will need to have `swagger` installed.

```bash
brew tap go-swagger/go-swagger
brew install go-swagger
```

### Mockery

For generating mocks you will need to have `mockery` installed.

```bash
brew install mockery
```

## Backend

### Running the backend

- `cd go-backend`
- `make develop`

This will watch for changes and re-compile the go code as well as regenerate code form the swagger definition

### Generating server code

The backend controller is generated via a swagger definition file. This allows both code generation of the backend controllers as well as a frontend API and types.

[Go Swagger](https://goswagger.io/tutorial/todo-list.html) is used to generate the server via a swagger definition file.

To generate the backend code run `go generate`.
To have it watch for changes and auto-generate run `watch-swagger`

## Frontend

Written in next.js

## Running the frontend

- `yarn dev`
