export class Formater {
    constructor(intl) {
        this._intl = intl;
    }

    format(data) {
        const result = data.map((item) => {
           const newObject = {};
           for (let key of Object.keys(item)) {
               if (isNaN(parseFloat(item[key])))
                   newObject[key] = item[key];
               else
                   newObject[key] = this._intl.format(item[key]);
           }
           return newObject;
        });
        return result;
    }

}