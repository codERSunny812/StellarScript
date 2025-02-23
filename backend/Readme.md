StellarScript
=============

StellarScript is the backend API for a **multi-language code editor**, handling **user authentication**, **project management**, and **code storage**. It provides endpoints for **user sign-up/login**, **project creation**, **saving code**, and **retrieving projects**. Authentication is managed via tokens, ensuring secure access to user-specific data.

This API allows users to create, save, and retrieve coding projects in multiple programming languages while maintaining a seamless authentication flow. 🚀

API Endpoints
-------------

### **GET - Health Check**

* **Endpoint:** <http://localhost:3000>

* **Description:** Checks if the server is running.

### **POST - Sign Up User**

* **Endpoint:** <http://localhost:3000/users/signup>

* **Description:** Registers a new user with full name, email, and password.

* { "fullName": "test user 1", "email": "<testuser1@gmail.com>", "password": "testuser1"}

### **POST - Login User**

* **Endpoint:** <http://localhost:3000/users/login>

* **Description:** Authenticates a user using email and password.

* { "email": "<testuser3@gmail.com>", "password": "testuser3"}

### **GET - Project Check Route**

* **Endpoint:** <http://localhost:3000/projects>

* **Description:** Checks if the project route is running.

### **POST - Create a Project**

* **Endpoint:** <http://localhost:3000/projects/create>

* **Description:** Creates a new coding project with a specified name and language.

* **Authentication:** Requires authentication token.

* { "name": "cpp code", "language": "C++", "token": "your\_auth\_token\_here"}

### **POST - Save a Project**

* **Endpoint:** <http://localhost:3000/projects/saveproject>

* **Description:** Saves code within an existing project.

* **Authentication:** Requires authentication token and project ID.

* { "token": "your\_auth\_token\_here", "projectId": "your\_project\_id\_here", "code": "public class Main { public static void main(String\[\] args) { System.out.println(\\"Hello sunny\\"); } }"}

### **POST - Get Projects of a User**

* **Endpoint:** <http://localhost:3000/projects/getprojects>

* **Description:** Retrieves all projects associated with a specific user.

* **Authentication:** Requires authentication token.

* { "token": "your\_auth\_token\_here"}

### **POST - Get a Specific Project Data**

* **Endpoint:** <http://localhost:3000/projects/getproject>

* **Description:** Fetches details of a specific project using the project ID.

* **Authentication:** Requires authentication token.

* { "token": "your\_auth\_token\_here", "projectId": "your\_project\_id\_here"}

### **POST - Delete a Project**

* **Endpoint:** <http://localhost:3000/projects/deleteproject>

* **Description:** Deletes a specific project.

* **Authentication:** Requires authentication token.

* { "token": "your\_auth\_token\_here", "projectId": "your\_project\_id\_here"}

### **POST - Edit a Project**

* **Endpoint:** <http://localhost:3000/projects/updateprojects>

* **Description:** Updates the name of a project.

* **Authentication:** Requires authentication token.

* { "token": "your\_auth\_token\_here", "projectId": "your\_project\_id\_here", "name": "new name of project"}

📌 **Notes:**
-------------

* Replace your\_auth\_token\_here with a valid authentication token.

* Replace your\_project\_id\_here with the actual project ID.

* The server should be running at <http://localhost:3000> for local development.

📞 **Contact & Support**
------------------------

For any issues or contributions, please raise an issue or submit a pull request on the repository. 🚀
