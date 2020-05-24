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
    },

    delete: (req, res) => {
        let id = req.params.id;
        DepartmentModel.deleteOne({_id: id}, (err) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({});
            }
        });
    },

    update: (req, res) => {
        let id = req.params.id;
        DepartmentModel.findById(id, (err, dep) => {
            if(err) {
                res.status(500).send(err);
            } else if(!dep) {
                res.status(404).send({});
            } else {
                dep.name = req.body.name;
                dep.save()
                    .then((d) => res.status(200).send(d))
                    .catch((e) => res.status(500).send(e));
            }
        })
    }
}