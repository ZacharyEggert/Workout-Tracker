const log = (...data) => {
    if (process.env.PRODUCTION_ENV === 'false') {
        console.log(data);
    }
};

module.exports = { log };
