export function deleteEmployee(id: string) {
    const randomTimeout = Math.floor(Math.random() * 2000) + 1000;

    return new Promise<string>((resolve, reject) => {
        const randomNum = Math.random();

        setTimeout(() => {
            if (randomNum < 0.1) {
                reject(new Error("Delete employee failed"));
            }

            resolve(id);
        }, randomTimeout);
    });
}
