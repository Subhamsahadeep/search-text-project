const models = require("../models/index");

const getAllArticle = async(req, res) => {
    try{
        const query = req.params.query;
        console.log("query :: ",query)
        let response = await models.article.findAll({
            raw: true
        })
        res.status(200).send({
            success : true,
            data : response,
            query: query
        });
    }catch(e){
        res.status(500).send({
            success : false,
            message : e.message
        });
    }
}

const postArticle = async(req, res) => {
    try{
        const body = req.body;
        console.log("body :: ",body)
        let response = await models.article.create({
            title: body.title,
            description: body.description
        })
        res.status(200).send({
            success : true,
            data : response.toJSON(),
            body: body,
            message: "Added Successfully"
        });
    }catch(e){
        res.status(500).send({
            success : false,
            message : e.message,
            stack: e.stack
        });
    }
}

module.exports = {
    getAllArticle,
    postArticle
}