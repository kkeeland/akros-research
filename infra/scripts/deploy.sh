#!/bin/bash
set -euo pipefail

echo "=== AKRO Research Deployment ==="
echo "Deploying at $(date)"

# Pull latest code
git pull origin main

# Build and restart services
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d

# Run migrations
docker compose -f docker-compose.prod.yml exec medusa npx medusa db:migrate

# Clean up old images
docker image prune -f

echo "=== Deployment complete ==="
