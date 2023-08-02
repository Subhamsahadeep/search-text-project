const Redis = require('ioredis');
const redis = new Redis({url: 'redis://127.0.0.1:6379'});
redis.on('ready', () => { console.log("Redis DB is READY <===> "); });
redis.on('error', (err) => { console.log("Redis connection Error ==> ", err); });
class RedisUtil {
    static cache = redis;
    static delete = async (key) => {
        if (typeof key !== 'string') {
            throw new Error("'key' must be a string");
        }
        await redis.del(key);
    };
    static setWithExpiry = async (key, data, expiryInSeconds) => {
        if (typeof key !== 'string') {
            throw new Error("'key' must be a string");
        }
        if (typeof expiryInSeconds !== 'number') {
            throw new Error("'expiryInSeconds' must be a number");
        }
        if (typeof data !== 'string') {
            throw new Error("Invalid data type for 'data'");
        }
        return await redis.set(key, data, 'EX', expiryInSeconds);
    };
    static set = async (key, data) => {
        if (typeof key !== 'string') {
            throw new Error("'key' must be a string");
        }
        if (typeof data !== 'string') {
            throw new Error("Invalid data type for 'data'");
        }
        return await redis.set(key, data);
    };
}

module.exports = RedisUtil
//# sourceMappingURL=redis.js.map