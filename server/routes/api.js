const express = require("express");
const router = express.Router();
const PersonController = require("../controllers/PersonController");
const DepartmentController = require("../controllers/DepartmentController");
const ProductController = require("../controllers/ProductController");
const AuthController = require("../controllers/AuthController");
 

router.use(AuthController.check_token);

//Routes Pessoas
router.get('/people', PersonController.all);

//Routes Departamentos
router.get('/departments', DepartmentController.all);
router.post('/departments', DepartmentController.add);

//Routes Products
router.get('/products', ProductController.all);

module.exports = router;