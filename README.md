# Inlaze Task Manager

This repository contains a small microservices stack with a Next.js front end. Each service can be run locally using Docker.

## Running the whole stack

1. Install Docker and Docker Compose.
2. From the project root run:

```bash
docker compose up --build
```

The compose file builds each service from its own `Dockerfile` and starts the required dependencies such as PostgreSQL and RabbitMQ. The front end will be available on [http://localhost:3003](http://localhost:3003).
