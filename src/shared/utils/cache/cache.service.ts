import NodeCache from 'node-cache';

class Cache {
  private readonly cache: NodeCache;

  // ttlSeconds: Time to live how much time this cache should be stored before being deleted
  constructor(ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
  }

  /**
   * Get a value of specific key in the store.
   * @param key
   * @param storeFunction
   * @returns cached value || new value from the store function, set a new value in the cache service.
   */
  get(key, storeFunction) {
    const value = this.cache.get(key);
    if (value) {
      return Promise.resolve(value);
    }

    return storeFunction().then(result => {
      this.cache.set(key, result);
      return result;
    });
  }

  /**
   * Store result value with specific key
   * @param key
   * @param result
   */
  set(key, result) {
    this.cache.set(key, result);
  }

  /**
   * Get a value of specific key in the store.
   * @param key
   * @returns cached value || new value from the store function, set a new value in the cache service.
   */
  retrieve<T>(key): T | undefined {
    return this.cache.get(key);
  }

  /**
   * Delete a key from the cache.
   * @param keys
   */
  del(keys) {
    this.cache.del(keys);
  }

  /**
   * Look for all keys starting with X, and delete them from cache.
   * @param startStr
   */
  delStartWith(startStr: string) {
    if (!startStr) {
      return;
    }

    const keys = this.cache.keys();
    keys.forEach(key => {
      if (key.indexOf(startStr) === 0) {
        this.del(key);
      }
    });
  }

  /**
   * Delete all keys, and flush the cache.
   */
  flush() {
    this.cache.flushAll();
  }
}

export default Cache;
