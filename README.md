# PR Number Generator

## Contents 
Introduction
1. Client Side   
    1.1 Technologies used   
    1.2 Routing
    1.3 Pages

2. Server Side  
    2.1 Technolgies used    
    2.2 Middleware  
    2.3 Authentication  
    2.4 Loogin Engine - Winston

3. Docker

4. Ecryption
    4.1 crypto-js
    4.1 JWT
    4.1 SSL/LDAPS

## Introduction
This is a web based application written in Javascript (JS). 

A user will be authenticated against active directory - which will allow them to use thier RRS login details. 

The user will fill in the supplier, the project code and a note which is optional. The system will retrive the latest Purchase Requistion number in the latest database entry, increment it by one, make an entry in the database and return the entry the user made to the frontend.


## 1.Client Side
### 1.1 Technolgies used:
```
1. React - frontend libary
2. Tailwind - styling
3. Redux - State Management
```

### 1.2 Routing     
Routing within the apps will be handled by the React Browser router to change between login, home and admin pages.

### 1.3 Pages   
  
#### 1.3.1 Login 
- The login page has a form which will require the user to sign in with their RRS username and password, if the user is successfully authenticated they will be directed to the home page and if not, they will remain on the login page.
#### 1.3.2. Home 
- Only authnticated user can access the home page. 
- Both normal and admin user can access the home page. 
- This is where users can generate PR numbers and view their PR's.
#### 1.3.3. Admin 
- Only admins can access this page and view all PR's made by users.
- There is a search bar which allows the admin to search for a specific PR.

## 2.Server Side
### 2.1 Technolgies used:
```
2.1.1. Express - JS server libary
2.1.2. NodeJS - JS run time
2.1.3. PostgresSQL - Database
2.1.4. Falsk - Python Libary 
```
#### Flask Server and Downlaoding Excel file
There will be an additional Flask server running within the docker container which will be responsible for adding the PR numbers to the excel file and sending them to the front end when the user requests to download the latest PR file. 

When the user requests to download an excel file, a request will be made to the database, which will get the latest PR number which prevents the user from downloading older PR's. The server will generate a new PR file with the PR number automatically inserted into the PR number block. 

Ther server will automatically delete the older PR files when there are more then five.

### 2.2 Middleware  

#### 2.2.1 adminStatus.js
- This middleware will verify the Json Web Token (JWT) and verify that they are an admin when accessing the admin page and making searchers on the admin page. 
- It will also allow admin users to generate PR numbers.

#### 2.2.2 requireAuth.js
- This middleware will verify the Json Web Token (JWT) and verify that admin users and normal users are verfied when accessing making requests to the server. 


### 2.3 Authentication 
#### JWT 
JWT tokens will used to check user verification and admin status on both ther front and backend. 
- On the frontend it will be stored in local storage and the pages will verify that it exits and if not, will send the user to the login page. It will also be sent to the server when the user makes requests to verify them.
- The JWT token will use their username, password and admin status to sign the token.

#### Active Directory  
Users will be authenticated against RRS's active directory which will allow them to user the RRS login details.

### 2.4 Loggin Engine - Winston 
Winston is a loggin engine in JS which will be used to log errors and information to a folder within the server, which will be deleted every seven days. 

## 3. Docker 
### Docker Compose
A docker compose file will be responsible for making docker images:

```
1. react Frontend
2. Express Backend
3. PostgresSQL Database
4. Flask Backend Excel Server
```

## 4. Ecryption
### 4.1 crypto-js
The encryption libary 'crypto-js' will be used fpr end-to-end encryption to pass login data secutly to the server, decoded on the server and then used to authenticate the user against Active Directory.

### 4.2 JWT
A JWT token will be created after the user has been successfully authenticated against Active Directory, sent back to the client which will bes used when the client interacts with ther server

### 4.3 SSL
SSL will be used to securly allow the server to send plain text to authenticate the user with Active Directory.