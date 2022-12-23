const {Schema, model} = require("mongoose");

const usuariosCollection = "usuarios"

const usuarioSchema = new Schema({
    username: {type:String},
    password: {type: String}
}, {versionKey: false}) //Para que no agregue '__v'

const usuarios = model(usuariosCollection, usuarioSchema)
module.exports = usuarios