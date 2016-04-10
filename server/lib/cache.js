// see: https://github.com/BryanDonovan/node-cache-manager

const cacheManager = require('cache-manager');
const memoryCache = cacheManager.caching({store: 'memory', max: 100});

const defaultProps = {
    ttl: 7200, // seconds, == 2h
}

export function wrapApiRequest(key, params={}, fetch) {
    return cacheGet(key).then((result) => {
        if (result) {
            return result;
        }

        var data = fetch.call();
        var isPromise = typeof data.then === 'function';


        if (isPromise) {
            return data.then((data) => {
                cacheSet(key, data, params);
                return data;
            });
        } else {
            cacheSet(key, data, params);
            return data;
        }
    });
}

export function cacheSet(key, data, props = {}) {
    props = {
        ...defaultProps,
        props
    }
    return memoryCache.set(key, data, props);
}

export function cacheGet(key) {
    return memoryCache.get(key);
}

export function cacheDel(key) {
    return memoryCache.del(key);
}
