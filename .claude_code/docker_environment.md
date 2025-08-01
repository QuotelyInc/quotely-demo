# Quotely Docker Environment

## Current Running Services
- **Web Server**: `quotely-web-1` on http://localhost:5000
- **Celery Worker**: `quotely-celery-worker-1` for background quote processing
- **Celery Beat**: `quotely-celery-beat-1` for scheduled tasks

## Architecture
- Python-based insurance quoting engine
- Celery for async quote generation and agent workflows
- Docker Compose orchestration
- Partner API integrations (TurboRater, Momentom AMP, Gail)

## Common Commands
```bash
docker-compose up -d          # Start all services
docker-compose logs -f web    # View web server logs
docker-compose restart worker # Restart quote processing
```