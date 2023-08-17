const request = async () => {
    await axios.get('');
};

// 现在使用，可以直接在顶层使用
const fun = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
};

await fun(3000);
