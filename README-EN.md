# Basic Bank NODE (Still in development)
### LIVE DEMO: https://basic-node-bank.herokuapp.com/
Here are 2 accounts for testing:
```
test1@email.com/Password123123
test2@email.com/Password123123
```
### Feature:
- REGISTER AND LOGIN
- TRANSFER
- USING API TO GET ALL OF A ACCOUNT INFORMATION
### Library:
- ExpressJS (Controller, routing, API)
- EJS views (View)
- Mongoose (Model / Mongo ODM)
- Mongodb / Atlas (Offline / Online Database by MongoDB)
- PassportJS (Authenticate account)
- Express-validator (Middleware verifies data at Backend)
- JWT
### Deployment environment: HEROKU + MONGODB ATLAS
### Setting:
- Clone Repository:
```
- HTTPS: https://github.com/jeffreynerona/node-bank.git
- SSH: git@github.com: justforlrn / node-bank.git
- CLI: gh repo clone justforlrn / node-bank
```
- Install packages in dependencies: npm install
- Fix environment variables (env):
```
PORT = 3000
DATABASE_NAME =
DATABASE_PASSWORD =
DATABASE_CONNECTSTRING = mongodb: // localhost / node-bank
```
- If using online database:
```
DATABASE_CONNECTSTRING = mongodb + srv: // xxxxxxx: $ {process.env.DATABASE_PASSWORD} @ xxxxxxxxxxxxxxx $ {process.env.DATABASE_NAME} xxxxxxxxxxxxxxxx
```
- npm start

## API:
After logged in, go to "hostname/api" and get the token, you can press GETDATA button to test or use an external tool by sending a request to the URL "hostname/api/my-data" by the method POST and attach token in header authorization bearer

## CONTACT:
- FB: https://www.facebook.com/theworldsname/
- Email: justforlrn@gmail.com

### SCREENSHOT:
![PC screenshot](https://raw.githubusercontent.com/justforlrn/node-bank/master/public/images/app-screenshot/PC.png?v=4&s=200)
![Mobile screenshot](https://raw.githubusercontent.com/justforlrn/node-bank/master/public/images/app-screenshot/Mobile.png) 
