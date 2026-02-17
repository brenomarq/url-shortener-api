
# URL Shortener API

![CI Workflow](https://img.shields.io/badge/CI-Passing-success?style=flat-square)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

A robust URL Shortener API built with **NestJS**, designed to create short, manageable links for long URLs. It features a PostgreSQL database with Prisma ORM and is containerized with Docker.

## 🚀 Tech Stack

-   **Framework**: [NestJS](https://nestjs.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Documentation**: [Swagger](https://swagger.io/)
-   **Containerization**: [Docker](https://www.docker.com/)
-   **Testing**: [Jest](https://jestjs.io/)

## 📂 Folder Structure

The project follows a modular architecture within the `src` directory:

```
src/
├── common/           # Shared utilities, filters (e.g., HttpExceptionFilter)
├── generated/        # Generated Prisma Client
├── infrastructure/   # Infrastructure layer (Database, Providers)
├── interfaces/       # Shared interfaces
├── modules/          # Feature modules (e.g., UrlModule)
├── main.ts           # Entry point of the application
└── app.module.ts     # Root module
```

## 🛠 Prerequisites

Before running the project, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v18+ recommended)
-   [Docker](https://www.docker.com/) & Docker Compose
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/brenomarq/url-shortener-api.git
    cd url-shortener-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory and configure your database variables:
    ```env
    DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5433/${DB_NAME}?schema=public"
    DB_USER=your_user
    DB_PASSWORD=your_password
    DB_NAME=your_db_name
    PORT=3000
    ```

## 🏃‍♂️ Running the Application

### Using Docker (Recommended)

Start the PostgreSQL database and the application (if configured in compose) or just the DB:

```bash
# Start database container
docker-compose up -d postgres
```

### Running Locally

Once the database is up, run the migrations and start the server:

```bash
# Run Prisma migrations
npx prisma migrate dev

# Start in development mode
npm run start:dev

# Start in production mode
npm run start:prod
```

The API will be available at `http://localhost:3000`.

## 📚 API Documentation

The API documentation is auto-generated using Swagger.

-   **Swagger UI**: Access it at `http://localhost:3000/api-docs`

## 🧪 Testing

Run the test suite using Jest:

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🤝 Contribution

Contributions are welcome! Please follow these steps:

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---
Made with ❤️ by Breno Marques
