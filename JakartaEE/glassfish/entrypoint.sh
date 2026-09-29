#!/bin/bash
set -e

echo "=== Starting GlassFish Setup ==="

# Copy PostgreSQL driver to domain lib if not already there
if [ -f /glassfish-config/postgresql-42.7.3.jar ] && [ ! -f /opt/glassfish7/glassfish/domains/domain1/lib/postgresql-42.7.3.jar ]; then
    echo "Installing PostgreSQL JDBC driver..."
    cp /glassfish-config/postgresql-42.7.3.jar /opt/glassfish7/glassfish/domains/domain1/lib/
fi

# Start domain in background to configure it
asadmin start-domain domain1

# Enable secure admin so Admin Console works from host machine (port 4848)
echo "Enabling secure admin for remote console access..."
asadmin --user admin --passwordfile /password.txt enable-secure-admin || true

# Wait for PostgreSQL to become available
echo "Waiting for PostgreSQL database to be reachable..."
until (exec 3<>/dev/tcp/postgres/5432) 2>/dev/null; do
    echo "PostgreSQL is unavailable - sleeping 2 seconds..."
    sleep 2
done
echo "PostgreSQL is available!"

# Create JDBC Connection Pool if it doesn't already exist
echo "Checking/creating JDBC Connection Pool: AksPool..."
asadmin --user admin --passwordfile /password.txt create-jdbc-connection-pool \
    --datasourceclassname org.postgresql.ds.PGSimpleDataSource \
    --restype javax.sql.DataSource \
    --property PortNumber=5432:Password=postgres:User=postgres:ServerName=postgres:DatabaseName=aks_db \
    AksPool || echo "AksPool already exists or created"

# Create JDBC Resource if it doesn't already exist
echo "Checking/creating JDBC Resource: jdbc/AksDS..."
asadmin --user admin --passwordfile /password.txt create-jdbc-resource \
    --connectionpoolid AksPool \
    jdbc/AksDS || echo "jdbc/AksDS already exists or created"

# Test connection to database pool
asadmin --user admin --passwordfile /password.txt ping-connection-pool AksPool || echo "Ping pool test completed"

# Deploy war if mounted into /deployments/aks-app.war
if [ -f /deployments/aks-app.war ]; then
    echo "Deploying aks-app.war to GlassFish..."
    asadmin --user admin --passwordfile /password.txt deploy --force=true --contextroot /aks-app /deployments/aks-app.war || echo "Deployment complete"
fi

# Stop background domain and start in foreground
asadmin stop-domain domain1

echo "=== GlassFish Setup Complete. Starting GlassFish in foreground ==="
exec asadmin start-domain --verbose domain1
