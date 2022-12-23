import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import {mongo_url, base} from "../config.js";

export default class ContenedorMongoDB {
    constructor(model) {
        this.model = model
        this.connect()
    }

    connect(){
        try{
            mongoose.connect(mongo_url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName: base
            })
        } catch (err){console.log(err)}
    }

    async getAll(){
        try{
            return await this.model.find();
        }
        catch (err){
            console.log(err)
        }
    }

    async getById(id){
        try{
            return await this.model.find({_id: id})
        }catch(err){
            console.log(err)
        }
    }

    async save(object){
        const newObject = new this.model(object);
        try{
            await newObject.save();
            return newObject._id;
        }catch (err){
            console.log(err)
        }
    }

    async updateById(id, fields){
        try {
            await this.model.updateOne({_id: id},fields)
        }catch (err) {
            console.log(err)
        }
    }

    async deleteById(id){
        try {
            await this.model.deleteOne({_id: id})
        }catch (err) {
            console.log(err)
        }
    }

    async addProduct(cartId, product){
        try {
            const productAdd = {...product._doc, cantidad: product.cantidad}
            await this.model.updateOne({_id: cartId},{$push: {productos: productAdd}})
        }catch (err) {
            console.log(err)
        }
    }

    async removeProduct(cartId, productId){
        try{
            await this.model.updateOne({_id: cartId},{$pull: {productos: {_id: ObjectId(productId)}}})
        }catch (err) {
            console.log(err)
        }
    }
}