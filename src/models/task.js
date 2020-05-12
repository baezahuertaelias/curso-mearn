const mongoose = require('mongoose');
const {
    Schema
} = mongoose; //Define el esquema de la BD

const TareaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tarea', TareaSchema)