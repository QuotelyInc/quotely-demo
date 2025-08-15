const crypto = require('crypto');

class CacheService {
  constructor() {
    this.cache = new Map();
    this.ttl = parseInt(process.env.CACHE_TTL) || 300; // 5 minutes default
    
    // Try to connect to Redis if available
    this.initRedis();
    
    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  async initRedis() {
    if (process.env.REDIS_URL) {
      try {
        const redis = require('redis');
        this.redisClient = redis.createClient({
          url: process.env.REDIS_URL
        });
        
        await this.redisClient.connect();
        console.log('[CacheService] Connected to Redis');
      } catch (error) {
        console.log('[CacheService] Redis not available, using in-memory cache');
        this.redisClient = null;
      }
    }
  }

  generateKey(data) {
    const str = JSON.stringify(data);
    return crypto.createHash('md5').update(str).digest('hex');
  }

  async get(key) {
    try {
      if (this.redisClient) {
        const value = await this.redisClient.get(key);
        if (value) {
          const parsed = JSON.parse(value);
          if (parsed.expires > Date.now()) {
            console.log(`[CacheService] Redis cache hit for ${key}`);
            return parsed.data;
          } else {
            await this.redisClient.del(key);
          }
        }
      } else {
        const cached = this.cache.get(key);
        if (cached && cached.expires > Date.now()) {
          console.log(`[CacheService] Memory cache hit for ${key}`);
          return cached.data;
        } else if (cached) {
          this.cache.delete(key);
        }
      }
    } catch (error) {
      console.error('[CacheService] Get error:', error);
    }
    
    return null;
  }

  async set(key, data, ttl = null) {
    const expires = Date.now() + ((ttl || this.ttl) * 1000);
    const cacheEntry = { data, expires };
    
    try {
      if (this.redisClient) {
        await this.redisClient.setEx(
          key, 
          ttl || this.ttl,
          JSON.stringify(cacheEntry)
        );
        console.log(`[CacheService] Cached to Redis: ${key}`);
      } else {
        this.cache.set(key, cacheEntry);
        console.log(`[CacheService] Cached to memory: ${key}`);
      }
    } catch (error) {
      console.error('[CacheService] Set error:', error);
      // Fallback to memory cache
      this.cache.set(key, cacheEntry);
    }
  }

  async delete(key) {
    try {
      if (this.redisClient) {
        await this.redisClient.del(key);
      }
      this.cache.delete(key);
    } catch (error) {
      console.error('[CacheService] Delete error:', error);
    }
  }

  async clear() {
    try {
      if (this.redisClient) {
        await this.redisClient.flushAll();
      }
      this.cache.clear();
      console.log('[CacheService] Cache cleared');
    } catch (error) {
      console.error('[CacheService] Clear error:', error);
    }
  }

  cleanup() {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [key, value] of this.cache.entries()) {
      if (value.expires < now) {
        this.cache.delete(key);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      console.log(`[CacheService] Cleaned ${cleaned} expired entries`);
    }
  }

  getStats() {
    return {
      type: this.redisClient ? 'Redis' : 'Memory',
      size: this.cache.size,
      ttl: this.ttl
    };
  }
}

module.exports = new CacheService();