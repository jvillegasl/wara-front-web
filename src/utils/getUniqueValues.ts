export function getUniqueValues<T extends object, U extends keyof T>(
    array: T[],
    key: U
) {
    const uniqueValues = new Set<T[U]>();

    array.forEach((item) => {
        uniqueValues.add(item[key]);
    });

    return Array.from(uniqueValues);
}
