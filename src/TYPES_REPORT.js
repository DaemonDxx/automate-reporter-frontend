export const TYPES_REPORT = {
    WEEKLY: "WEEKLY"
}

export function getArrayOfTypesReport() {
    const arr = [];
    for (const type of Object.keys(TYPES_REPORT)) {
        arr.push(type);
    }
    return arr;
}