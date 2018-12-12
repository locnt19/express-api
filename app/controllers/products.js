const express = require('express');

const router = express.Router();
var fs = require('fs');

router.get('/', (req, res, next) => {

	var obj;
	fs.readFile('./db/products.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		res.render('products', {
			title: 'Sản phẩm',
			data: obj.san_pham
		});
		// res.json(obj);
	});
});

module.exports = router;
