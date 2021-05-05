export default class MyMap extends Map {

    set(key, value) {
        if (this.has(key)) {
            this.get(key).push(value);
        } else {
            super.set(key, [value]);
        }
    }
}