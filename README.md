# project-manegment-api

This is a project manegment API, that allows for team members to be assigned to roles. The reason I created this API, is so that I can teach myself how to use SQL. I decided to use sqlite because it is good for small projects.

## Installation
Make sure you have NodeJS installed. After you navigate to the project folder in the terminal, type **npm install** to intall all the dependecies.

## Features

The Base URL is **http://localhost:3030**

### Routes

#### Users
1. **/login**  - Method: **POST**;  Body: (email, password)
2. **/register** - Method: **POST**;  Body: (email, username, password)
3. **/logout** - Method: **GET**;  Headres: (X-Authentication: accessToken)