export const sum = (arr) => {
    return arr.reduce((prev, item) => {
        return prev + parseFloat(item);
    }, 0);
}

export const average = (arr) => {
    return sum(arr)/arr.length;
}