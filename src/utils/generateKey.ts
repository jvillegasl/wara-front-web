export function generateKey(pre: string | number) {
    const key = `${pre}_${new Date().getTime()}`;
    return key;
}
