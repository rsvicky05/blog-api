const uploadfile = (req, res, next) => {
    res.status(201).send({ message: "File Uploaded Successfully.", file: req.file});
}

const uploadfiles = (req, res, next) => {
    res.status(201).send({ message: "File Uploaded Successfully.", file: req.files});
}

module.exports = { uploadfile, uploadfiles }