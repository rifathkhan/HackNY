# HackNY
## Instructions on how to use the dev environmrnt

### 1. Create .env file in the Expirio directory

Please include the following values:

ATLAS_URI= MONGO_CONNECTION_STRING
JWT_SECRET= 'SecretKey'

Atlas_URI referres to a mongodb conneection string, please feel free to choose which one you want,
mine is 'mongodb+srv://user1:12345@cluster0-6adwy.mongodb.net/expire?retryWrites=true&w=majority

JWT_SECRET can be any string value you choose, it is a secret key for user authentication

### 2. Use **npm install** in the directories Expirio and Expirio/client.

Both have package.json in them.

### 3. Please install nodemon globally (or locally for the project in Expirio)

The command for it is **npm install -g nodemon**. 
Remove -g if you want a local install.

### 4. If nodemon is installed, run the backend server in Expirio  with **nodemon server**

Else, just use **node server.js"

### 5. To run react, all react files are in Expirio/client.

Use **cd client** if you are in Expirio directory in the terminal. If you are in
the client folder, run **npm start** to have react start runnuing 
