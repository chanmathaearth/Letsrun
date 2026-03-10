# Docker Usage Guide

## Build and Run with Docker

### Using Docker Compose (Recommended)

1. **Build and start the application:**
   ```bash
   docker-compose up
   ```

2. **Build without starting:**
   ```bash
   docker-compose build
   ```

3. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Using Docker CLI

1. **Build the image:**
   ```bash
   docker build -t letsrun:latest .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 --name letsrun-app letsrun:latest
   ```

3. **Stop the container:**
   ```bash
   docker stop letsrun-app
   ```

4. **Remove the container:**
   ```bash
   docker rm letsrun-app
   ```

## Development with Docker

For development with hot reload, use Docker Compose and mount the source directory:

```bash
docker-compose -f docker-compose.yml up
```

## Production Deployment

The Docker image is optimized for production:
- Uses Node 20 Alpine (lightweight)
- Multi-stage build to reduce image size
- Serves static files with `serve`
- Health checks enabled
- Automatic restart on failure

## Image Size

- Final image size: ~300MB (Alpine-based)
- Build time: ~1-2 minutes

## Environment Variables

You can pass environment variables using:

```bash
docker run -e NODE_ENV=production -p 3000:3000 letsrun:latest
```

Or in docker-compose.yml modify the `environment` section.

## Troubleshooting

### Port already in use
Change the port mapping in docker-compose.yml or use:
```bash
docker run -p 8080:3000 letsrun:latest
```

### Clear Docker cache
```bash
docker system prune -a
```

### View logs
```bash
docker logs letsrun-app
```
