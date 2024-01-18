#!/bin/sh

echo "Exec docker-entrypoint"

if [ $NODE_ENV == "development" ];
then
    npm install
fi

#exec init-db
npm run db:import

exec "$@"