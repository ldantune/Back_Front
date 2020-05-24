const DepartmentModel = require("../models/DepartmentModel");

module.exports = {
    all: function(req, res) {
        DepartmentModel.find({}).lean().exec(function(err, departments) {
            if(err)
                return res.json([]);
            return res.json(departments);
        })
    },

    add: function(req, res){
        let d = new DepartmentModel({name: req.body.name});
        d.save((err, dep) => {
            if(err){
                res.status(500).send(err);
            } else {
                res.status(200).send(dep);
            }
        })
    }
}