# project-management-api

This is a project management API, that allows for team members to be assigned to roles. The reason I created this API, is so that I can teach myself how to use SQL. I decided to use SQLite because it is good for small projects.

## Installation
Make sure you have Node.js installed. After you navigate to the project folder in the terminal, type **npm install** to install all the dependencies.

## Features

You can register, login, and logout. Logged-In users can add, delete, and edit roles, assign themselves to a role, and join teams.

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

#### Teams
Route: **/teams**
1. **/** - Method: **GET** - Returns all teams with member counts.
2. **/** - Method: **POST**; Headers: (Authorization: Bearer accessToken); Body: (name, description) - Creates a team.
3. **/:teamId**
    1. Method: **GET** - Returns a team and its members.
    2. Method: **PATCH**; Headers: (Authorization: Bearer accessToken); Body: (name, description) - Edits a team.
    3. Method: **DELETE**; Headers: (Authorization: Bearer accessToken); - Deletes a team and its memberships.
4. **/:teamId/join** - Method: **POST**; Headers: (Authorization: Bearer accessToken); - Adds the current user to a team.
5. **/:teamId/leave** - Method: **DELETE**; Headers: (Authorization: Bearer accessToken); - Removes the current user from a team.
