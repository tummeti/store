#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER"<<-EOSQL

    ALTER USER postgres PASSWORD 'postgres';

    DROP DATABASE IF EXISTS store;
    CREATE DATABASE store;
    GRANT ALL PRIVILEGES ON DATABASE store TO postgres;

    \c store;

    CREATE TABLE values (
       key SERIAL PRIMARY KEY,
       value VARCHAR,
       userId INTEGER
    );

    INSERT INTO values (value, userId) VALUES ('test value a', 1);
EOSQL
