`RBAC UI (Role-Based Access Control UI)`

## Overview:
This project provides a user interface for managing roles and permissions within a system using a Role-Based Access Control (RBAC) model. It allows administrators to create, view, edit, and delete roles, as well as assign permissions to each role. Users can be assigned specific roles that control their access to various resources within the application.

## Features:
Roles Management: Add, edit, and delete roles.
Permissions Management: View, create, and delete permissions.
Assign Permissions to Roles: Select permissions when creating or editing roles.
Responsive UI: The application is fully responsive, ensuring a smooth experience on desktop and mobile devices.

## Tech Stack:
Frontend         : React.js
UI Library       : Material-UI (MUI)
State Management : React useState, useEffect hooks
API Requests     : Axios
Backend (Mock)   : JSON Server (mocking data storage)
Routing          : React Router
CSS Framework    : Custom CSS with MUI's Box, Table, Dialog and Grid components for responsive layouts

## Installation Steps:
Follow the steps below to get the project up and running locally:

1. Clone the repository:
# git clone https://github.com/your-username/rbac-ui.git
# cd rbac-ui

2. Install dependencies:
Make sure you have Node.js installed on your machine. You can check if you have it installed by running:
node -v
npm -v

Then install the project dependencies using npm:
# npm install

3. Install JSON Server (for mocking API):
Install json-server globally (if you haven't already):
# npm install -g json-server

Then, run the json-server using the db.json file provided in the project:
# json-server --watch db.json --port 5000

(run this command from the root folder of application)
The mock backend will be available at http://localhost:5000.


## How to Run the application:
1. Run the React App:
After installing the dependencies, start the development server to run the React app:
# npm start

This will start the React application on http://localhost:3000. Your UI will be live and can interact with the mock API at http://localhost:5000 (via JSON Server).

2. Access the App:
Open a web browser and go to http://localhost:3000 to see the Role-Based Access Control UI in action.

