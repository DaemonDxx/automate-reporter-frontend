import * as hash from 'object-hash';

export default class Cache extends Map{

    set(key, value) {
        const h = this._createHashBykKey(key);
        super.set(h, value);
    }

    get(key) {
        const h = this._createHashBykKey(key);
        return super.get(h);
    }

    _createHashBykKey(key) {
        return hash.MD5(key);
    }

    has(key) {
        const h = this._createHashBykKey(key);
        return super.has(h);
    }
}