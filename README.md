# Jobs Portal

A simple job posting application that allows users to post and manage job listings.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have [Node.js](https://nodejs.org/) installed on your machine.
- You have [npm](https://www.npmjs.com/) (Node Package Manager) installed. It comes with Node.js.
- You have a code editor like [Visual Studio Code](https://code.visualstudio.com/) installed.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ShashwatSheth27/jobs-portal.git
   ```

2. Navigate to the project directory:

   ```bash
   cd jobs-portal
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. If you haven't already, install the `jwt-decode` library:

   ```bash
   npm install jwt-decode
   ```

## Running the Project

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your web browser and go to `http://localhost:3000/register/` to view the application.

3. Ensure that your backend server is running. You may need to set up a separate backend server for handling API requests.

4. Navigate to the project backend directory:

    ```bash
   cd jobs-portal
   ```
5. Now start the backend server

   ```bash
   npm start
   ```


## API Endpoints

- **POST /api/job/postJob**: Endpoint to post a new job listing.

