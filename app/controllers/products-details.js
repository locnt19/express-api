const express = require('express');

const router = express.Router();
var fs = require('fs');

router.get('/:MaSP', (req, res, next) => {

	var obj;
	fs.readFile('./db/products.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		var filtered = obj.san_pham.filter(function(e) {
			return e.MaSP == req.params.MaSP;
		  });
		res.render('details', {
			title: 'Sản phẩm',
			data: filtered[0]
		});
	});
});

module.exports = router;
