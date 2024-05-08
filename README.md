# project-management-api

This is a project management API, that allows for team members to be assigned to roles. The reason I created this API, is so that I can teach myself how to use SQL. I decided to use SQLite because it is good for small projects.

## Installation
Make sure you have Node.js installed. After you navigate to the project folder in the terminal, type **npm install** to install all the dependencies.

## Features

You can register, login, and logout. Logged-In users can add, delete, and edit roles, and they can assign themselves to a role.

### Routes
Base URL: **http://localhost:3030**

#### Users
Route: **/users**
1. **/login**  - Method: **POST**; Body: (email, password)
2. **/register** - Method: **POST**; Body: (email, username, password)
3. **/logout** - Method: **GET**; Headers: (X-Authentication: accessToken)
4. **/assigned-users** - Method: **GET** - Returns all users with the role they are assigned to.

#### Roles
Route: **/roles**
1. **/get-all** - Method: **GET** - Returns all roles.
2. **/add** - Method: **POST**; Headers: (X-Authentication: accessToken); Body: (roleName, description)
3. **/:roleId**
    1. Method: **GET** - Returns a single role.
    2. Method: **PATCH**; Headers: (X-Authentication: accessToken); Body: (roleName, description) - Edits a role.
    3. Method: **DELETE**; Headers: (X-Authentication: accessToken); - Deletes a role.
4. **/:roleId/assign** - Method: **PATCH**; Headers: (X-Authentication: accessToken); - Assigns the current user to a role.
