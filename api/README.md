
# Product API

This project provides a simple API for managing products. It allows users to create, fetch, and manage product data, including uploading images for products.

## Features

- Create a product with a name, price, and image.
- Fetch all products with pagination and sorting options.
- Validation for required fields.
- Handles image uploads via `multer`.

## Technologies Used

- **Node.js** - JavaScript runtime used for building the server.
- **Express.js** - Web framework for handling API requests.
- **Sequelize** - ORM for interacting with the PostgreSQL database.
- **Multer** - Middleware for handling file uploads.
- **Jest** - Testing framework for unit and integration tests.
- **Supertest** - HTTP assertion library for testing the API.

## Prerequisites

- **Node.js** (v16 or higher)
- **mySql** (running locally or remotely)

## Setup

Follow the steps below to set up the application on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Neeyal/product_management
cd product_management/api
```

### 2. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

### 3. Set Up the Database


Make sure the `.env` file exists (if not, create one) and includes your database credentials. Example:

```
DB_HOSTED = localhost
DB_ROOTUSER = YOURUSERNAME
DB_PASSW0RD = YOURPASSWORD
DB_MYSQL_NAME = YOURDBNAME
```

### 4. Run the Application

To start the application, run:

```bash
npm start
```

The server will start on `http://localhost:3001`.

### 5. API Endpoints

#### **GET** `/api/products`

Fetch all products with pagination, sorting, and optional search by name.

**Query Parameters**:

- `search`: Search for products by name.
- `limit`: Number of products per page (default: 10).
- `sort`: Sort order (default: DESC).

#### **POST** `/api/products`

Create a new product by providing the name, price, and an image file.

**Body Parameters**:

- `name` (required): The product's name.
- `price` (required): The product's price.
- `image` (required): The product's image (file upload).


#### **Validation Errors**

If the input data is invalid (e.g., missing required fields), the server will return a `400` status with an error message.

### 6. Testing

The application uses Jest and Supertest for testing. To run the tests, use the following command:

```bash
npm test
```

### 7. Running Tests

Before running the tests, ensure the `test-image.jpg` exists in the `fixtures` directory, or adjust the test paths accordingly.

You can modify the tests as needed. They are located in `tests/api/product.test.js`.

#### Example Tests:

- **GET** `/api/products` should return a list of products.
- **POST** `/api/products` should create a product and return the created product with a valid image path.
- **Validation**: Should return errors for invalid data (empty name or price).

## Development

If you're developing this project, consider the following:

- **File Uploads**: Ensure that the `uploads/` directory exists in your project root. This is where product images will be stored.
- **Database**: The database schema is automatically created using Sequelize, but you can also manually run migrations if needed.

### 8. Scripts

- `npm start`: Starts the application server.
- `npm test`: Runs the test suite.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to adjust the project name, add further configuration details, and provide any extra instructions that might be necessary for your specific project!
