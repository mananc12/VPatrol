# Vpatrol-User Account Management Web App

## Overview
This is a Node.js-based web application designed to manage user accounts, store their banking information, and provide real-time weather data based on the user's location. It utilizes Node.js, Express.js, MongoDB, and various APIs to deliver this functionality.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)

## Features
- User registration and account management.
- User can store multiple bank accounts.
- Fetches real-time weather data based on the user's location using the OpenWeather API.
- Provides bank details like branch, district, and state using the Razorpay IFSC API.

## Prerequisites
- Node.js and npm installed locally.
- MongoDB database set up and running.
- OpenWeather API key and Razorpay IFSC API access.

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/user-account-management-app.git
   cd user-account-management-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   ```bash
   API_KEY=
   PORT=
   MONGODB_URI=
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Access the web application at http://localhost:3000 in your web browser.
## Environment Variables
   ```bash
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/mydb
   API_KEY_OPENWEATHER=your_openweather_api_key
   ```
## Usage
1. Register a new user account or log in to an existing account.
2. Manage your account details and add multiple bank accounts.
3. Enter an IFSC code to fetch bank details (branch, district, state, etc.) in real-time.
4. The weather data for the city associated with your bank account is automatically fetched and displayed.
## Contributing
Contributions are welcome! Feel free to open issues or pull requests for bug fixes, improvements, or new features.


