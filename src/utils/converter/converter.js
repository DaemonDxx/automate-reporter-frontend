import MyMap from "./myMap";
import Cache from "./cache";


// Преобразует данные от API в формат понятный для таблицы
// Использует правила для преобразования
// rules: {
//     fieldNameAPI: {
//         outFieldName: 'Наименование поля на выходе',
//         convertation: 'Функция преобразующая массив значений',
//     }
// }
// filter фильтрует исходные значения из API, а не уже преобразованные
export default class Converter {

    constructor({rules, mainField}) {
        this._rules = rules;
        this._mainField = mainField;
        this._cache = new Cache();
    }

    getConvertedData(filter) {
        if (this._sortableMap.length === 0) return [];

        if (this._cache.has(filter)) return this._cache.get(filter);

        const result = [];
        for (const valueOfMainField of this._sortableMap.keys()) {
            const filteredArr = this._getFilteredList(
                this._sortableMap.get(valueOfMainField),
                filter,
            );
            if (filteredArr.length === 0 ) continue;

            const mapOfAllValues = this._createAllValueMap(filteredArr);

            result.push(this._createConvertationItem(
                mapOfAllValues,
                valueOfMainField
            ))
        }

        if (result.length === 0) return result;

        result.push(this._createConvertationItem(
            this._createAllValueMap(result),
            'Россети Сибирь',
        ));

        this._cache.set(filter, result);

        return result;
    }

    //TODO переписать на every/some
    _getFilteredList(arr, filter) {
        return arr.filter((item) => {
            for (const field in filter) {
                if (!filter[field].includes(item[field])) return false;
            }
            return true;
        })
    }

    _createAllValueMap(filteredOffsets) {
        const map = new MyMap();
        for (const item of filteredOffsets) {
            for (const fieldName in this._rules) {
                map.set(fieldName, item[fieldName]);
            }
        }
        return map;
    }


    _createConvertationItem(mapValues, mainFieldValue) {
        let convertedItem = {};
        for (const field of mapValues.keys()) {
            const rule = this._rules[field];
            const fieldName = rule.outFieldName || field;
            Object.defineProperty(convertedItem, fieldName, {
                writable: true,
                enumerable: true,
                configurable: true,
                value: rule.convertation(mapValues.get(field))
            });
        }
        convertedItem[this._mainField] = mainFieldValue;
        return convertedItem;
    }

    setValues(arr) {
        this._arr = arr;
        this._createSortableMapByMainField();
        this._cache.clear();
    }

    _createSortableMapByMainField() {
        this._sortableMap = this._arr.reduce((prev, item) => {
            const fieldValue = item[this._mainField];
            prev.set(fieldValue, item);
            return prev;
        }, new MyMap());
    }
}