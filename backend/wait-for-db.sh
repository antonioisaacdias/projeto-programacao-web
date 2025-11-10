#!/bin/bash
# Script para aguardar o banco de dados estar pronto

set -e

host="$DB_HOST"
port="$DB_PORT"
shift 2
cmd="$@"

echo "Aguardando PostgreSQL em $host:$port..."

until PGPASSWORD=$DB_PASS psql -h "$host" -U "$DB_USER" -d "$DB_NAME" -c '\q' 2>/dev/null; do
  >&2 echo "PostgreSQL ainda não está disponível - aguardando..."
  sleep 2
done

>&2 echo "PostgreSQL está pronto - iniciando aplicação"
exec $cmd
