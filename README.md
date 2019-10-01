# HackNY

## About the developer environment

Expirio is the location of the developer environment.
Currently we are using MERN stack.
server.js is where the app server will start running.
Expirio/client is where all the React files are.

## Instructions on how to use the dev environmrnt

### 1. Create .env file in the Expirio directory

Please include the following values:


**ATLAS_URI= MONGO_CONNECTION_STRING**

**JWT_SECRET= 'SecretKey'**

Atlas_URI referres to a mongodb conneection string, please feel free to choose which one you want
JWT_SECRET can be any string value you choose, it is a secret key for user authentication

### 2. Use **npm install** in the directories Expirio and Expirio/client.

Both have package.json in them.

### 3. If you are developing the server, run **npm run dev**

### 5. To run react, go to Expirio/client.

Use **cd client** if you are in Expirio directory in the terminal. If you are in
the client folder, run **npm start** to have react start running 
