export function getFromArray(value, array) {
    return array.find(obj => obj.value === value);
}