const formater = Intl.NumberFormat('ru-RU')

export const sum = (arr) => {
    //TODO исправить проблему потери дробных частей
    const convert = (item) => typeof item === 'string' ? parseFloat(item.replace(/\s+/g, '')) : item
    const sum = (prev, item) => prev + item;
    const result = (arr
        .map(convert)
        .reduce(sum, 0)).toFixed(1);
    return formater.format(result);
}

export const average = (arr) => {
    const result = parseFloat(sum(arr).replace(/\s+/g, ''))/arr.length;
    console.log(result);
    return formater.format(result.toFixed(1));
}
