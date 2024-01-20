// Code generated by go-swagger; DO NOT EDIT.

package restapi

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"encoding/json"
)

var (
	// SwaggerJSON embedded version of the swagger document used at generation time
	SwaggerJSON json.RawMessage
	// FlatSwaggerJSON embedded flattened version of the swagger document used at generation time
	FlatSwaggerJSON json.RawMessage
)

func init() {
	SwaggerJSON = json.RawMessage([]byte(`{
  "schemes": [
    "http"
  ],
  "swagger": "2.0",
  "info": {
    "description": "API description in Markdown.",
    "title": "Showplanner backend",
    "version": "1.0.0"
  },
  "host": "localhost:8080",
  "basePath": "/v1",
  "paths": {
    "/availabilities": {
      "post": {
        "produces": [
          "application/json"
        ],
        "summary": "Create or update availability",
        "parameters": [
          {
            "description": "The availability to create or update",
            "name": "availability",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/AvailabilityDTO"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/AvailabilityDTO"
            }
          },
          "401": {
            "$ref": "#/responses/Error"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/events": {
      "post": {
        "consumes": [
          "application/json"
        ],
        "summary": "Creates an event",
        "parameters": [
          {
            "description": "The show to create",
            "name": "event",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/CreateEventDTO"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/EventDTO"
            }
          },
          "400": {
            "$ref": "#/responses/Error"
          },
          "500": {
            "$ref": "#/responses/Error"
          }
        }
      }
    },
    "/events/{id}": {
      "post": {
        "produces": [
          "application/json"
        ],
        "summary": "Update event",
        "parameters": [
          {
            "type": "number",
            "description": "Id of event update",
            "name": "id",
            "in": "path",
            "required": true
          },
          {
            "description": "The show to create",
            "name": "event",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/CreateEventDTO"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Show",
            "schema": {
              "$ref": "#/definitions/ShowDTO"
            }
          },
          "401": {
            "$ref": "#/responses/Error"
          },
          "404": {
            "$ref": "#/responses/Error"
          }
        }
      },
      "delete": {
        "produces": [
          "application/json"
        ],
        "summary": "Delete's an event",
        "parameters": [
          {
            "type": "number",
            "description": "Id of event to delete",
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": ""
          },
          "401": {
            "$ref": "#/responses/Error"
          },
          "404": {
            "$ref": "#/responses/Error"
          },
          "500": {
            "$ref": "#/responses/Error"
          }
        }
      }
    },
    "/me": {
      "get": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Details about logged in user",
            "schema": {
              "$ref": "#/definitions/MeDetailsDTO"
            }
          },
          "404": {
            "description": "Not found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      },
      "post": {
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "description": "The availability to create or update",
            "name": "personalDetails",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/PersonUpdateDTO"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "401": {
            "$ref": "#/responses/Error"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/public/health": {
      "get": {
        "description": "Healthcheck endpoint",
        "produces": [
          "application/json"
        ],
        "summary": "Healthcheck",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/HealthCheck"
            }
          }
        }
      }
    },
    "/public/schedule": {
      "get": {
        "produces": [
          "application/json"
        ],
        "summary": "Returns a list of events.",
        "parameters": [
          {
            "type": "string",
            "description": "ID of the show to get events from",
            "name": "showSlug",
            "in": "query",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "object",
              "properties": {
                "events": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/EventPublicDTO"
                  }
                },
                "showName": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "$ref": "#/responses/Error"
          }
        }
      }
    },
    "/schedule": {
      "get": {
        "produces": [
          "application/json"
        ],
        "summary": "Returns a list of events.",
        "parameters": [
          {
            "type": "integer",
            "description": "ID of the show to get events from",
            "name": "showId",
            "in": "query",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/ScheduleEventDTO"
              }
            }
          },
          "401": {
            "$ref": "#/responses/Error"
          },
          "500": {
            "$ref": "#/responses/Error"
          }
        }
      }
    },
    "/shows": {
      "get": {
        "produces": [
          "application/json"
        ],
        "summary": "Returns a list of shows",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/ShowDTO"
              }
            }
          },
          "401": {
            "$ref": "#/responses/Error"
          },
          "500": {
            "$ref": "#/responses/Error"
          }
        }
      },
      "post": {
        "consumes": [
          "application/json"
        ],
        "summary": "Creates a show",
        "parameters": [
          {
            "description": "The show to create",
            "name": "show",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/CreateShowDTO"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/ShowDTO"
            }
          },
          "400": {
            "$ref": "#/responses/Error"
          },
          "401": {
            "$ref": "#/responses/Error"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/shows/{showSlug}/summary": {
      "get": {
        "produces": [
          "application/json"
        ],
        "summary": "Return details about a show",
        "parameters": [
          {
            "type": "string",
            "description": "Slug of show",
            "name": "showSlug",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Show",
            "schema": {
              "$ref": "#/definitions/ShowSummaryDTO"
            }
          },
          "401": {
            "$ref": "#/responses/Error"
          },
          "404": {
            "$ref": "#/responses/Error"
          },
          "500": {
            "$ref": "#/responses/Error"
          }
        }
      }
    }
  },
  "definitions": {
    "AvailabilityDTO": {
      "type": "object",
      "required": [
        "eventId",
        "userId",
        "available"
      ],
      "properties": {
        "available": {
          "type": "boolean"
        },
        "eventId": {
          "type": "integer"
        },
        "userId": {
          "type": "string"
        }
      }
    },
    "CreateEventDTO": {
      "required": [
        "showId",
        "start"
      ],
      "properties": {
        "address": {
          "type": "string",
          "x-nullable": true
        },
        "curtainsUp": {
          "type": "string",
          "format": "date-time",
          "x-nullable": true
        },
        "end": {
          "type": "string",
          "format": "date-time",
          "x-nullable": true
        },
        "name": {
          "type": "string",
          "x-nullable": true
        },
        "shortnote": {
          "type": "string",
          "x-nullable": true
        },
        "showId": {
          "type": "integer"
        },
        "start": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "CreateShowDTO": {
      "required": [
        "name",
        "company",
        "slug"
      ],
      "properties": {
        "company": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "slug": {
          "type": "string"
        }
      }
    },
    "Error": {
      "type": "object",
      "required": [
        "code",
        "message"
      ],
      "properties": {
        "code": {
          "type": "string"
        },
        "message": {
          "type": "string"
        }
      }
    },
    "EventDTO": {
      "required": [
        "id",
        "start"
      ],
      "properties": {
        "address": {
          "type": "string",
          "x-nullable": true
        },
        "curtainsUp": {
          "type": "string",
          "format": "date-time",
          "x-nullable": true
        },
        "end": {
          "type": "string",
          "format": "date-time",
          "x-nullable": true
        },
        "id": {
          "type": "integer"
        },
        "name": {
          "type": "string",
          "x-nullable": true
        },
        "nameRaw": {
          "type": "string",
          "x-nullable": true
        },
        "shortnote": {
          "type": "string",
          "x-nullable": true
        },
        "showId": {
          "type": "integer"
        },
        "start": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "EventPublicDTO": {
      "required": [
        "id",
        "start"
      ],
      "properties": {
        "curtainsUp": {
          "type": "string",
          "format": "date-time",
          "x-nullable": true
        },
        "end": {
          "type": "string",
          "format": "date-time",
          "x-nullable": true
        },
        "id": {
          "type": "integer"
        },
        "name": {
          "type": "string",
          "x-nullable": true
        },
        "nameRaw": {
          "type": "string",
          "x-nullable": true
        },
        "showId": {
          "type": "integer"
        },
        "start": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "HealthCheck": {
      "type": "object",
      "required": [
        "message"
      ],
      "properties": {
        "message": {
          "type": "string"
        }
      }
    },
    "MeDetailsDTO": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        },
        "firstName": {
          "type": "string"
        }
      }
    },
    "PersonUpdateDTO": {
      "type": "object",
      "required": [
        "firstName",
        "lastName",
        "email",
        "phone",
        "dob",
        "allergies",
        "emergencyName",
        "emergencyPhone",
        "emergencyRelationship"
      ],
      "properties": {
        "allergies": {
          "type": "string"
        },
        "dob": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "emergencyName": {
          "type": "string"
        },
        "emergencyPhone": {
          "type": "string"
        },
        "emergencyRelationship": {
          "type": "string"
        },
        "firstName": {
          "type": "string"
        },
        "hearAboutUs": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "previousWork": {
          "type": "string"
        },
        "pronoun": {
          "type": "string"
        },
        "reasonForCrewing": {
          "type": "string"
        },
        "wwc": {
          "type": "string"
        }
      }
    },
    "ScheduleEventDTO": {
      "allOf": [
        {
          "$ref": "#/definitions/EventDTO"
        },
        {
          "type": "object",
          "properties": {
            "availability": {
              "x-nullable": true,
              "$ref": "#/definitions/AvailabilityDTO"
            }
          }
        }
      ]
    },
    "ShowDTO": {
      "required": [
        "id",
        "name",
        "company",
        "slug"
      ],
      "properties": {
        "company": {
          "type": "string"
        },
        "id": {
          "type": "integer"
        },
        "name": {
          "type": "string"
        },
        "slug": {
          "type": "string"
        }
      }
    },
    "ShowSummaryDTO": {
      "required": [
        "id",
        "name",
        "company",
        "slug"
      ],
      "properties": {
        "company": {
          "type": "string"
        },
        "id": {
          "type": "integer"
        },
        "name": {
          "type": "string"
        },
        "slug": {
          "type": "string"
        }
      }
    }
  },
  "responses": {
    "Error": {
      "description": "Error",
      "schema": {
        "$ref": "#/definitions/Error"
      }
    }
  }
}`))
	FlatSwaggerJSON = json.RawMessage([]byte(`{
  "schemes": [
    "http"
  ],
  "swagger": "2.0",
  "info": {
    "description": "API description in Markdown.",
    "title": "Showplanner backend",
    "version": "1.0.0"
  },
  "host": "localhost:8080",
  "basePath": "/v1",
  "paths": {
    "/availabilities": {
      "post": {
        "produces": [
          "application/json"
        ],
        "summary": "Create or update availability",
        "parameters": [
          {
            "description": "The availability to create or update",
            "name": "availability",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/AvailabilityDTO"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/AvailabilityDTO"
            }
          },
          "401": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/events": {
      "post": {
        "consumes": [
          "application/json"
        ],
        "summary": "Creates an event",
        "parameters": [
          {
            "description": "The show to create",
            "name": "event",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/CreateEventDTO"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/EventDTO"
            }
          },
          "400": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/events/{id}": {
      "post": {
        "produces": [
          "application/json"
        ],
        "summary": "Update event",
        "parameters": [
          {
            "type": "number",
            "description": "Id of event update",
            "name": "id",
            "in": "path",
            "required": true
          },
          {
            "description": "The show to create",
            "name": "event",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/CreateEventDTO"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Show",
            "schema": {
              "$ref": "#/definitions/ShowDTO"
            }
          },
          "401": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "404": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "delete": {
        "produces": [
          "application/json"
        ],
        "summary": "Delete's an event",
        "parameters": [
          {
            "type": "number",
            "description": "Id of event to delete",
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": ""
          },
          "401": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "404": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/me": {
      "get": {
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Details about logged in user",
            "schema": {
              "$ref": "#/definitions/MeDetailsDTO"
            }
          },
          "404": {
            "description": "Not found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      },
      "post": {
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "description": "The availability to create or update",
            "name": "personalDetails",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/PersonUpdateDTO"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "401": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/public/health": {
      "get": {
        "description": "Healthcheck endpoint",
        "produces": [
          "application/json"
        ],
        "summary": "Healthcheck",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/HealthCheck"
            }
          }
        }
      }
    },
    "/public/schedule": {
      "get": {
        "produces": [
          "application/json"
        ],
        "summary": "Returns a list of events.",
        "parameters": [
          {
            "type": "string",
            "description": "ID of the show to get events from",
            "name": "showSlug",
            "in": "query",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "object",
              "properties": {
                "events": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/EventPublicDTO"
                  }
                },
                "showName": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/schedule": {
      "get": {
        "produces": [
          "application/json"
        ],
        "summary": "Returns a list of events.",
        "parameters": [
          {
            "type": "integer",
            "description": "ID of the show to get events from",
            "name": "showId",
            "in": "query",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/ScheduleEventDTO"
              }
            }
          },
          "401": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/shows": {
      "get": {
        "produces": [
          "application/json"
        ],
        "summary": "Returns a list of shows",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/ShowDTO"
              }
            }
          },
          "401": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "post": {
        "consumes": [
          "application/json"
        ],
        "summary": "Creates a show",
        "parameters": [
          {
            "description": "The show to create",
            "name": "show",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/CreateShowDTO"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/ShowDTO"
            }
          },
          "400": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "401": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/shows/{showSlug}/summary": {
      "get": {
        "produces": [
          "application/json"
        ],
        "summary": "Return details about a show",
        "parameters": [
          {
            "type": "string",
            "description": "Slug of show",
            "name": "showSlug",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Show",
            "schema": {
              "$ref": "#/definitions/ShowSummaryDTO"
            }
          },
          "401": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "404": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "500": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "AvailabilityDTO": {
      "type": "object",
      "required": [
        "eventId",
        "userId",
        "available"
      ],
      "properties": {
        "available": {
          "type": "boolean"
        },
        "eventId": {
          "type": "integer"
        },
        "userId": {
          "type": "string"
        }
      }
    },
    "CreateEventDTO": {
      "required": [
        "showId",
        "start"
      ],
      "properties": {
        "address": {
          "type": "string",
          "x-nullable": true
        },
        "curtainsUp": {
          "type": "string",
          "format": "date-time",
          "x-nullable": true
        },
        "end": {
          "type": "string",
          "format": "date-time",
          "x-nullable": true
        },
        "name": {
          "type": "string",
          "x-nullable": true
        },
        "shortnote": {
          "type": "string",
          "x-nullable": true
        },
        "showId": {
          "type": "integer"
        },
        "start": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "CreateShowDTO": {
      "required": [
        "name",
        "company",
        "slug"
      ],
      "properties": {
        "company": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "slug": {
          "type": "string"
        }
      }
    },
    "Error": {
      "type": "object",
      "required": [
        "code",
        "message"
      ],
      "properties": {
        "code": {
          "type": "string"
        },
        "message": {
          "type": "string"
        }
      }
    },
    "EventDTO": {
      "required": [
        "id",
        "start"
      ],
      "properties": {
        "address": {
          "type": "string",
          "x-nullable": true
        },
        "curtainsUp": {
          "type": "string",
          "format": "date-time",
          "x-nullable": true
        },
        "end": {
          "type": "string",
          "format": "date-time",
          "x-nullable": true
        },
        "id": {
          "type": "integer"
        },
        "name": {
          "type": "string",
          "x-nullable": true
        },
        "nameRaw": {
          "type": "string",
          "x-nullable": true
        },
        "shortnote": {
          "type": "string",
          "x-nullable": true
        },
        "showId": {
          "type": "integer"
        },
        "start": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "EventPublicDTO": {
      "required": [
        "id",
        "start"
      ],
      "properties": {
        "curtainsUp": {
          "type": "string",
          "format": "date-time",
          "x-nullable": true
        },
        "end": {
          "type": "string",
          "format": "date-time",
          "x-nullable": true
        },
        "id": {
          "type": "integer"
        },
        "name": {
          "type": "string",
          "x-nullable": true
        },
        "nameRaw": {
          "type": "string",
          "x-nullable": true
        },
        "showId": {
          "type": "integer"
        },
        "start": {
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "HealthCheck": {
      "type": "object",
      "required": [
        "message"
      ],
      "properties": {
        "message": {
          "type": "string"
        }
      }
    },
    "MeDetailsDTO": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        },
        "firstName": {
          "type": "string"
        }
      }
    },
    "PersonUpdateDTO": {
      "type": "object",
      "required": [
        "firstName",
        "lastName",
        "email",
        "phone",
        "dob",
        "allergies",
        "emergencyName",
        "emergencyPhone",
        "emergencyRelationship"
      ],
      "properties": {
        "allergies": {
          "type": "string"
        },
        "dob": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "emergencyName": {
          "type": "string"
        },
        "emergencyPhone": {
          "type": "string"
        },
        "emergencyRelationship": {
          "type": "string"
        },
        "firstName": {
          "type": "string"
        },
        "hearAboutUs": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "previousWork": {
          "type": "string"
        },
        "pronoun": {
          "type": "string"
        },
        "reasonForCrewing": {
          "type": "string"
        },
        "wwc": {
          "type": "string"
        }
      }
    },
    "ScheduleEventDTO": {
      "allOf": [
        {
          "$ref": "#/definitions/EventDTO"
        },
        {
          "type": "object",
          "properties": {
            "availability": {
              "x-nullable": true,
              "$ref": "#/definitions/AvailabilityDTO"
            }
          }
        }
      ]
    },
    "ShowDTO": {
      "required": [
        "id",
        "name",
        "company",
        "slug"
      ],
      "properties": {
        "company": {
          "type": "string"
        },
        "id": {
          "type": "integer"
        },
        "name": {
          "type": "string"
        },
        "slug": {
          "type": "string"
        }
      }
    },
    "ShowSummaryDTO": {
      "required": [
        "id",
        "name",
        "company",
        "slug"
      ],
      "properties": {
        "company": {
          "type": "string"
        },
        "id": {
          "type": "integer"
        },
        "name": {
          "type": "string"
        },
        "slug": {
          "type": "string"
        }
      }
    }
  },
  "responses": {
    "Error": {
      "description": "Error",
      "schema": {
        "$ref": "#/definitions/Error"
      }
    }
  }
}`))
}
