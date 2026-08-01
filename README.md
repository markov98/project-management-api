# project-management-api

This is a project management API that allows users to be assigned to roles and teams. The reason I created this API is to teach myself how to use SQL. I decided to use SQLite because it is suitable for small projects.

## Installation
Make sure you have Node.js installed. After you navigate to the project folder in the terminal, type **npm install** to install all the dependencies.

## Features

You can register, log in, and log out. Authenticated users can add, delete, and edit roles, assign themselves to a role, create and manage teams, and join or leave teams. Team memberships are stored separately, so a user can belong to multiple teams.

Protected routes use the `Authorization: Bearer <accessToken>` header.

### Routes
Base URL: **http://localhost:3030**

#### Users
Route: **/users**
1. **/login**  - Method: **POST**; Body: (email, password)
2. **/register** - Method: **POST**; Body: (email, username, password)
3. **/logout** - Method: **GET**; Headers: (Authorization: Bearer accessToken)
4. **/assigned-users** - Method: **GET** - Returns all users with the role they are assigned to.

#### Roles
Route: **/roles**
1. **/get-all** - Method: **GET** - Returns all roles.
2. **/add** - Method: **POST**; Headers: (Authorization: Bearer accessToken); Body: (roleName, description)
3. **/:roleId**
    1. Method: **GET** - Returns a single role.
    2. Method: **PATCH**; Headers: (Authorization: Bearer accessToken); Body: (roleName, description) - Edits a role.
    3. Method: **DELETE**; Headers: (Authorization: Bearer accessToken); - Deletes a role.
4. **/:roleId/assign** - Method: **PATCH**; Headers: (Authorization: Bearer accessToken); - Assigns the current user to a role.

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
