# Advertisement-Project-API

# MEFF-ADVERTISEMENT API
### Introduction
The MEFF-Advertisement API is an open source advert management platform that enable users(Vendors) to post adverts and manage their adverts; where as users(General) can view the adverts and interact with them in a more convenient way.

### MEFF-ADVERTISEMENT API Features
* Users can signup and login to their accounts
* Guest (non-authenticated) users can easily have a look at the available product adverts.
* Authenticated users can access to all features such as adding new products, vendors, and users; updating/editing Products and Users; get/read Products, vendors and users; and delete/remove Products, vendors and users.

### Installation Guide
* Clone this repository [here](https://github.com/TEAM-MEFF/Advertisement-Project-API).
* The  **main branch** is the most stable branch at any given time, ensure you're working from it.
* Run `npm install` to install all dependencies
* You can either work with the default mongodb database or use your locally installed MongoDB. Do configure to your choice in the application entry file.
* Create an .env file in your project root folder and add your variables. See .env samples for assistance.
### Usage
* Connect to the API using this [link](https://advertisement-project-api.onrender.com).
* Run `npm run dev` to start the application locally on [port](http://localhost:3002).
* Futher read the complete API Documentation on [postman](https://documenter.getpostman.com/view/38771172/2sAXxY3Tuh).

### API Endpoints
| ***HTTP Verbs*** | ***Endpoints*** | ***Action*** |
| --- | --- | --- |
| *POST* | /users/register | To sign up a new user account |
| *POST* | /users/login | To login user with a token|
| *POST* | /products | To create a new product advert |
|       |           |                                               |
| *GET* | /users/me | To retrieve a user on the platform with a toke |
| *GET* | /products | To retrieve details of all products |
| *GET* | /product | To retrieve details of a single product |
|       |           |                                               |
| *PATCH* | /users/me | To edit the details of a user |
| *PATCH* | /products/:id | To edit the details of a single product |
| *DELETE* | /products/:id | To delete a single product |

### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.

* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.

* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.

* [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.

* [nodemailer](https://nodemailer.com) This is a module for Node.js applications that allows easy email sending. 

* [JSON-Web-Token(JWT)](https://jwt.io) This is an open standard(RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

* [npmjs](https://www.npmjs.com) npm is the world's largest software registry where developers can share and borrow packages.

### Collaborators
* [Micheal](https://github.com/RemedyOnline)
* [Efuwa](https://github.com/Efuwa-Akyere)
* [Felicity](https://github.com/Fel968)
* [Frederick](https://github.com/fdblay)