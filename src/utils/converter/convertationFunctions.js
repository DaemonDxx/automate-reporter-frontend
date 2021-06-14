export const sum = (arr) => {
    const sum = (prev, item) => prev + parseFloat(item);
    const result = arr.reduce(sum, 0);
    return result.toFixed(1);
}

export const average = (arr) => {
    const preparedData = parseFloat(sum(arr));
    const result = (preparedData/arr.length).toFixed(1);
    return result;
}
