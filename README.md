# Basic Bank NODE (Still in development)
# ENGLISH TRANSLATE: https://github.com/justforlrn/node-bank/blob/master/README-EN.md
### LIVE DEMO: https://basic-node-bank.herokuapp.com/ 
### Tính năng:
- ĐĂNG KÝ VÀ ĐĂNG NHẬP
- CHUYỂN KHOẢN
- Dùng TOKEN API để xem thông tin người dùng
### Thư viện:
- ExpressJS (Controller, routing, API)
- EJS views (View)
- Mongoose (Model/Mongo ODM)
- Mongodb/Atlas (Offline/Online Database bằng MongoDB)
- PassportJS (Xác thực tài khoản)
- JWT
- Express-validator (Middleware xác minh dữ liệu tại Backend)
### Môi trường deploy: HEROKU + MONGODB ATLAS
### Cài đặt:
- Clone Repository:
```
-- HTTPS: https://github.com/jeffreynerona/node-bank.git
-- SSH: git@github.com:justforlrn/node-bank.git
-- CLI: gh repo clone justforlrn/node-bank
```
- Cài đặt các package trong dependencies: npm install
- Sửa các biến môi trường (env): 
```
PORT = 3000
DATABASE_NAME = 
DATABASE_PASSWORD = 
DATABASE_CONNECTSTRING = mongodb://localhost/node-bank
```
- Nếu dùng online database:
```
DATABASE_CONNECTSTRING = mongodb+srv://xxxxxxx:${process.env.DATABASE_PASSWORD}@xxxxxxxxxxxxxxx${process.env.DATABASE_NAME}xxxxxxxxxxxxxxxxxx
```
- npm start

## API: After logged in, go to "hostname/api" and get the token, you can press GETDATA button to test or use an external tool by sending a request to the URL "hostname/api/my-data" by the method POST and attach token in header authorization bearer

## CONTACT:
- FB: https://www.facebook.com/theworldsname/
- Email: justforlrn@gmail.com

### SCREENSHOT:
![PC screenshot](https://raw.githubusercontent.com/justforlrn/node-bank/master/public/images/app-screenshot/PC.png?v=4&s=200)
![Mobile screenshot](https://raw.githubusercontent.com/justforlrn/node-bank/master/public/images/app-screenshot/Mobile.png)
