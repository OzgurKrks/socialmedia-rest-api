# socialmedia-rest-api

## What can do after registration ?
- can add posts.
- can follow/unfollow other users.
- can like/undolike posts.
- can add comments to posts and can delete.
- can delete posts.
- can send to users notification if you follow a user or like a post.
- can change profile image.
# Getting started
To get the Node server running locally:
- Clone this repo
- npm install to install all required dependencies
- Create MongoDb Cluster and Get Connection MongoDb URI
- Create an .env file and add your information
  * Set PORT=<YOUR_PORT> 
  * Set MONGO_URI=<YOUR_MONGO_URI>
  * Set JWT_SECRET=<YOUR_SECRET_KEY>
  * Set CLOUD_NAME=<YOUR_CLOUD_NAME>
  * Set CLOUD_API_KEY=<YOUR_CLOUD_API_KEY>
  * Set CLOUD_API_SECRET=<CLOUD_API_SECRET>
- npm start to start the local server

# Code Overview

## Dependencies
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) : This module enables storing of passwords as hashed passwords instead of plaintext.
- [dotenv](https://www.npmjs.com/package/dotenv) : Dotenv is a that loads environment variables from a .env file.
- [express](https://www.npmjs.com/package/express) : Web framework for Node.js.
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) : Middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) : An implementation of JSON Web Tokens.
- [mongoose](https://www.npmjs.com/package/mongoose) : For modeling and mapping MongoDB data to JavaScript
- [cloudinary](https://www.npmjs.com/package/cloudinary) : The Cloudinary Node SDK allows you to quickly and easily integrate your application with Cloudinary
- [nodemailer](https://www.npmjs.com/package/nodemailer) : Send e-mails from Node.js


## Application Structure
- server.js - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also inncludes the routes we'll be using in the application.
- routes/ - This folder contains the route definitions (users, posts etc. ) for our API.
- models/ - This folder contains the schema definitions for our Mongoose models (User, Posts).
- controllers/ - This folder contains controllers for our API.
- middlewares/ - This folder contains middlewares for our API.


## Error Handling
we define a error-handling middleware for handling Mongoose's errors and our own errors.

## Authentication
Requests are authenticated using the Authorization header and value Bearer: {{token}}. with a valid JWT.

We define express middlewares in middlewares/authorization/auth.js that can be used to authenticate requests. The required middlewares returns 401 or 403.

