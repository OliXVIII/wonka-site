# Project Setup

This project is built with Next.js and uses Prisma as the ORM for PostgreSQL. Below are the instructions to set up and run the project.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later) or [Yarn](https://yarnpkg.com/) (v1 or later)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

## Environment Variables

Create an `.env` file at the root of your project and add your PostgreSQL connection string:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

#Get started
- Clone the repository
- Run `pnpm install` to install the dependencies
- Run `pnpm prisma migrate dev` to create the database schema

