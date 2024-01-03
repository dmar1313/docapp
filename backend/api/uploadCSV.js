const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const parseCSV = require('./utils');

parseCSV('someFilePath.csv').then((trips) => {
  console.log(trips);
}).catch((error) => {
  console.error(error);
});

router.post('/', upload.single('file'), (req, res) => {
  // Use the req.file.path to process the uploaded CSV
  parseCSV(req.file.path)
  .then( trips => {
    console.log(trips);
    res.json({ success: true });
  }) 
  .catch( error => {
    console.error(error);
    res.json({ success: false }); 
  });
});