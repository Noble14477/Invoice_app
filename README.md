Invoice Application

Overview

This Invoice Application allows users to create and manage invoices seamlessly. It utilizes Firebase for authentication and Firestore for real-time data updates, providing a robust and responsive user experience.

Features

Firebase Authentication: Secure user authentication using Firebase, enabling users to log in and manage their invoices easily.
Firestore Integration: Instead of setting up a separate server for mock API requests, Firestore is used to store and retrieve invoice data. This approach allows for real-time updates and seamless integration with Firebase authentication.
Create Invoice Page: Users can input details to create new invoices. The application captures all relevant information and stores it in Firestore.
Technologies Used
React: Frontend framework for building the user interface.
Firebase: Authentication and database services.
Firestore: Real-time NoSQL database for storing invoice data.

Getting Started

Prerequisites
Node.js and npm installed on your machine.
Firebase project set up with Firestore and Authentication enabled.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/invoice-app.git
Navigate to the project directory:

cd invoice-app

Install the dependencies:
npm install
Set up your Firebase project and configure the Firebase SDK in your application. Replace the configuration details in the relevant files.

Start the application:
npm start
Open your browser and navigate to http://localhost:5173 to view the application.

Usage
Authentication: Users can sign up or log in using Firebase Authentication.
Creating Invoices: Once logged in, users can navigate to the "Create Invoice" page, fill in the invoice details, and submit to create a new invoice. The data will be stored in Firestore and updated in real time.
You can view an invoice by clicking on the intended invoice.

For easy testing, I have provided a login detail for a user that have already created an invoice: email: clint@gmail.com
password: 00000000

Contributing
Contributions are welcome! If you have suggestions for improvements or want to report issues, feel free to open an issue or submit a pull request.

Thank you 


