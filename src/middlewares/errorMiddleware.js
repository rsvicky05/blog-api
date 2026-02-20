const handle = (err, req, res, next) => {
    console.error(err);

    const msg = err.message || "Internal Server Error";
    const code = err.statusCode || 500;

    res.status(code).send(msg);
}

module.exports = handle;