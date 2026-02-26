#!/bin/bash
set -euo pipefail

BACKUP_DIR="/backups/postgres"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/akro_medusa_${TIMESTAMP}.sql.gz"

mkdir -p "$BACKUP_DIR"

echo "Backing up database to ${BACKUP_FILE}..."

docker compose -f docker-compose.prod.yml exec -T postgres \
  pg_dump -U medusa -d akro_medusa | gzip > "$BACKUP_FILE"

# Keep only last 7 days of backups
find "$BACKUP_DIR" -name "akro_medusa_*.sql.gz" -mtime +7 -delete

echo "Backup complete: ${BACKUP_FILE}"
