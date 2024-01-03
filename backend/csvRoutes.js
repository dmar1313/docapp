const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/import', upload.single('file'), (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
        // At this point, 'results' contains the parsed CSV data
        res.json({ message: 'File processed and data added to database' });
    });
});
module.exports = router;