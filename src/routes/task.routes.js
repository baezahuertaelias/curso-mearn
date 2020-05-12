const express = require('express');
const router = express.Router();
const Tarea = require('../models/task'); //Con esto hacemos consultas a la BD

router.get('/', async(req, res) => {
    const tareas = await Tarea.find();
    res.json(tareas);
});

router.get('/:id', async(req, res) => {
	const tarea = await Tarea.findById(req.params.id);
	res.json(tarea);
});

router.post('/', async(req, res) => {
    //Tuve un error capa8, cuando se hace la solicitud (con postman en este caso), debe llamarse igual las solicitudes que en los datos para guardar en Tarea
    const {titulo,descripcion} = req.body; //Crea una constante que sea un objeto que contiene la respuesta obtenida a traves de una consulta, ejemplo con postman
    const tarea = new Tarea({titulo,descripcion}); //Como se llama igual, en la ultimas versiones de NodeJS es innecesario ya que se llama igual. De todos modos se podria replicar con mas detalle... Ejemplo titulo:titulo, descripcion:descripcion
    await tarea.save();
    res.json({status: 'Tarea guardada'});
});

router.put('/:id', async(req, res) => {
    const {titulo,descripcion} = req.body;
    const nuevaTarea = {titulo,descripcion};
    await Tarea.findByIdAndUpdate(req.params.id, nuevaTarea, {useFindAndModify: false});
    res.json({status: 'Tarea actualizada'});
});

router.delete('/:id', async(req, res) => {
	await Tarea.findByIdAndDelete(req.params.id);
	res.json({status: 'Tarea eliminada'});
});

module.exports = router;