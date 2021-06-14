const formater = Intl.NumberFormat('ru-RU')

const deleteSpace = (item) => typeof item === 'string' ? parseFloat(item.replace(/\s+/g, '')) : item;
const replaceComma = (item) => typeof item === 'string' ? item.replace(',','.') : item;

export const sum = (arr) => {

    const sum = (prev, item) => prev + item;
    const result = (arr
        .map(replaceComma)
        .map(deleteSpace)
        .reduce(sum, 0)).toFixed(1);
    return formater.format(result);
}

export const average = (arr) => {
    const preparedData = [sum(arr)]
        .map(replaceComma)
        .map(deleteSpace)[0];
    const result = parseFloat(preparedData)/arr.length;
    return formater.format(result.toFixed(1));
}
