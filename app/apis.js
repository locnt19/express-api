const express = require('express');

const router = express.Router();
const Utils = require('./helpers/utils');
var fs = require('fs');

router.get('/', (req, res, next) => {
	res.json({
		name: 'expressJS API',
		version: 'v1'
	});
});

//Sản phẩm
router.get('/products', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET , PUT , POST , DELETE');
	res.header('Access-Control-Allow-Headers', "Content-Type");
	var obj;
	fs.readFile('./db/products.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		res.json(obj); // Dòng này chỉ bật khi viết API
	});
});

// Chi tiết sản phẩm theo mã sản phẩm hoặc nhà sản xuất
router.get('/product/:key', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET , PUT , POST , DELETE');
	res.header('Access-Control-Allow-Headers', "Content-Type");
	var obj;
	fs.readFile('./db/products.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		var filtered = obj.san_pham.filter(function (e) {
			if((e.MaSP == req.params.key)) {
				return e.MaSP == req.params.key;
			} else {
				return e.NSX == req.params.key;
			}
		});
		let newjSON = {
			data: filtered
		}
		res.json(newjSON); // Dòng này chỉ bật khi viết API
	});
});

// api 2 cấp
router.get('/product/:NSX/:MaSP', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET , PUT , POST , DELETE');
	res.header('Access-Control-Allow-Headers', "Content-Type");
	var obj;
	fs.readFile('./db/products.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		var filtered = obj.san_pham.filter(function (e) {
			if((e.NSX == req.params.NSX) && (e.MaSP == req.params.MaSP)) {
				return e.MaSP == req.params.MaSP;
			}
		});
		let newjSON = {
			data: filtered[0]
		}
		res.json(newjSON); // Dòng này chỉ bật khi viết API
	});
});

module.exports = router;
