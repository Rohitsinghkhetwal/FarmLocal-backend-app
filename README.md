

# High-Performance Product API
A production-ready backend service built with **Node.js (TypeScript)**, **MySQL**, and **Redis**, designed with **performance, reliability, and scalability** as top priorities.

This project demonstrates:

-   OAuth2 Client Credentials authentication
    
-   High-performance product listing with 1M+ records
    
-   Redis-based caching, rate limiting, and request deduplication
    
-   Resilient external API integrations
    
-   Clean, modular architecture
- 
##  🛠 Tech Stack

-   **Node.js + TypeScript**
    
-   **Express**
    
-   **MySQL** (via Prisma ORM)
    
-   **Redis** (caching, locks, rate limiting)
    
-   **Axios** (HTTP client)
    
-   **Docker** (optional local setup)
    
    ## Setup Instructions
    Make sure you have installed:

-   Node.js ≥ 18
    
-   MySQL ≥ 8
    
-   Redis ≥ 6
    
-   Docker (optional)

```
git clone https://github.com/Rohitsinghkhetwal/FarmLocal-backend-app.git
npm install
```

## Environment Variables
Create a `.env` file in the root:
```

PORT=8000

DB_HOST=

DB_PORT=

DB_USER=

DB_PASSWORD=

DB_NAME=

API_URL=https://dummyjson.com/products

REDIS_USERNAME=

REDIS_PASSWORD=

REDIS_HOST=

REDIS_PORT=

OAUTH_CLIENT_SECRET=

OAUTH_CLIENT_ID=

OAUTH_TOKEN_URL=

run ts-node config/createTable.ts

npm run dev
```

## Run the server 

```

http://localhost:8000

```

# Architecture Overview
Client
  |
  |----> Express API Layer
           |
           |-- Auth Module (OAuth2 + Redis)
           |-- Product Module (MySQL + Redis Cache)
           |-- External API Module
           |-- Webhook Handler
           |
         MySQL (Primary Data Store)
         Redis (Cache, Locks, Rate Limiting)


# Authentication Flow (OAuth2)


-   Uses **Client Credentials Flow**
    
-   Access token fetched from OAuth provider
    
-   Token cached in Redis
    
-   Redis lock prevents concurrent token refresh
    
-   Token auto-refreshes before expiry

## why Redis lock
Prevents multiple concurrent requests from triggering multiple token fetches.

# Caching Stategy

-   Key: `oauth:token`
    
-   TTL: `expires_in - buffer`
    
-   Redis lock prevents duplicate fetches

# Webhook Idempotency

-   Event IDs stored in Redis
    
-   Duplicate webhook events are safely ignored
    
-   TTL: 24 hours

## Performance Optimizations

### Database

-   Indexed columns:
    
    -   `name`
        
    -   `price`
        
    -   `category`
        
    -   `createdAt`
        
-   Cursor-based pagination (no OFFSET scans)

### API layer

-   Redis cache reduces DB load
    
-   Rate limiting protects against abuse
    
-   Minimal object mapping in hot paths
    
-   Fast JSON serialization

### External API

-   Timeout enforced (2s)
    
-   Retries with exponential backoff
    
-   External calls isolated from core APIs

### Reliability & Fault Tolerance

Implemented:

-   ✅ Redis caching
    
-   ✅ Rate limiting
    
-   ✅ Request deduplication (Redis lock)
    
-   ✅ Retry with exponential backoff
    
-   ✅ Timeout handling
    

Planned / Extendable:

-   Circuit breaker (per external API)
    
-   Background job workers
    
-   Read replicas for MySQL


## Trade-offs made

### 1️⃣ Eventual Consistency vs Performance

-   Short cache TTL allows minor staleness
    
-   Chosen to achieve sub-200ms response times
    

----------

### 2️⃣ Redis Dependency

-   Redis is a critical component
    
-   Without Redis, performance and safety degrade
    
-   Accepted due to performance requirements
    

----------

### 3️⃣ External API Isolation

-   External APIs are not used in hot paths
    
-   Avoids unpredictable latency spikes
    
-   Requires background sync for freshness
    

----------

### 4️⃣ Cursor Pagination Complexity

-   Slightly more complex than offset pagination
    
-   Chosen for scalability with large datasets

## API Endpoints

```
Products

GET /products/v1

Query params

-   `cursor`
    
-   `take`
    
-   `search`
    
-   `category`

```

```
##Webhook

	POST /webhook
	Headers:

  `x-event-id` (required for idempotency)
```

# 📌 Summary

Production-ready architecture  
✔ High-performance reads at scale  
✔ Clean OAuth2 token lifecycle  
✔ Resilient external API integrations  
✔ Interview-grade documentation

# 🙌 Author
**Rohit Singh**  
Full Stack Developer (Node.js | React | AWS | Redis | MySQL)





