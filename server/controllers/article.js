const { response } = require("express");
const models = require("../models/index");
const { Op } = require("sequelize");
const redis = require("../redis");

const getAllArticle = async(req, res) => {
    try{
        const query = req.params.query;
        console.log("query :: ",query);
        let redisResponse = await redis.cache.hget("pairs", query);
        if(!redisResponse){
            let response = await models.article.findAll({
                where: {
                    title: {
                        [Op.iLike]: `%${query}%`,                    
                    }
                },
                raw: true
            })
           
            await redis.cache.hset("pairs", query, JSON.stringify(response));
            res.status(200).send({
                success : true,
                data : response,
                query: query,
                cached: false
            });

        }else{
            res.status(200).send({
                success : true,
                data : JSON.parse(redisResponse),
                query: query,
                cached: true
            });
        }
       
        
     
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