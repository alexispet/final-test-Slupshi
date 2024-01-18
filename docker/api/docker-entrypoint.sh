#!/bin/sh

echo "Exec docker-entrypoint"

if [ $NODE_ENV == "development" ];
then
    npm install
    npm run db:import
    #exec init-db
fi

exec "$@"