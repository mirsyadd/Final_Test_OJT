const express = require('express');
const router = express.Router();

const { donwloadTemplate, AddExcel, UploadExcel, submitExcel } = require('../controller/ExcelController')

router.post('/ticket/add-excel', AddExcel)
router.post('/ticket/upload-excel', UploadExcel)
router.post('/ticket/download-excel', donwloadTemplate)
router.post('/ticket/submit-excel/:id', submitExcel)

module.exports = router