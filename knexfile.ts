import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  offline: {
    client: "pg",
    connection: process.env.DATABASE_URL || {
      database: 'todoApp',
      user: 'admin',
      password: 'password'
    }
  },

  development: {
    client: "postgresql",
    connection: {
      database: "todoApp",
      user: "admin",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

export default config;
