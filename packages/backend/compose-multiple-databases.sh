#!/bin/bash

set -e
set -u

echo "Creating supertokens database"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
		CREATE USER $SUPERTOKENS_USER PASSWORD '$SUPERTOKENS_PASSWORD';

		CREATE DATABASE $SUPERTOKENS_DATABASE;
		GRANT ALL PRIVILEGES ON DATABASE $SUPERTOKENS_DATABASE TO $SUPERTOKENS_USER;
		ALTER DATABASE $SUPERTOKENS_DATABASE OWNER TO $SUPERTOKENS_USER;
EOSQL

echo "Creating showplanner database"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
		CREATE USER $SHOWPLANNER_USER PASSWORD '$SHOWPLANNER_PASSWORD';

		CREATE DATABASE $SHOWPLANNER_DATABASE;
		GRANT ALL PRIVILEGES ON DATABASE $SHOWPLANNER_DATABASE TO $SHOWPLANNER_USER;
		ALTER DATABASE $SHOWPLANNER_DATABASE OWNER TO $SHOWPLANNER_USER;
EOSQL
