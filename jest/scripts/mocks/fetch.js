global.fetchResponseData = [];
global.fetchResponse = {
    status: 200,
    json () {
        return Promise.resolve({
            data: global.fetchResponseData,
        });
    },
};

export const fetch = jest.fn(() => {
    return Promise.resolve(global.fetchResponse);
});
