import React, { Component } from 'react';

class App extends Component {

    //Comentando lo obvio... this.setState es para SETEAR variables en toda la pantalla del sitio

    constructor(){
        super();
        this.state = {
            titulo: '',
            descripcion: '',
            tareas: [],
            _id: ''
        };
        this.agregarTarea = this.agregarTarea.bind(this);
        this.controlarCambios = this.controlarCambios.bind(this);
    }

    //Comentando lo obvio... Es cuando los componentes fueron cargados en pantalla, que haga alguna accion
    componentDidMount(){
        this.obtenerTareas()
    }

    controlarCambios(e){
        //Solo obtenemos los valores que nos interesa, o sea, name y value
        const {name, value} = e.target;
        //No me queda muy claro el setState para este caso en especifico
        this.setState({
            [name]: value
        })
    }

    //Permite mostrar el valor de la tarea cuando se presiona el boton en el formulario para enviar
    agregarTarea(e){
       if(this.state._id){
           fetch(`/api/tasks/${this.state._id}`,{
               method: 'PUT',
               body: JSON.stringify(this.state),
               headers: {
                   'Accept': 'application/json',
                   'Content-type': 'application/json'
               }
           })
           .then(res => res.json())
           .then(data => {
               M.toast({html:'Tarea actualizada'});
               this.setState({
                   titulo: '',
                   descripcion: '',
                   _id: ''
               });
               this.obtenerTareas();
           })

       }else{
            //fetch enviar peticiones http al servidor (es como usar postman)
        //si es para navegadores viejos se puede usar axios por ejemplo
        fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())//Convierte respuesta de servidor en json
        .then(data => {
            //Mostrar respuesta del servidor
            console.log(data);
            //M es una variable global de Materialize (recordar que esta agregada en index.html con el CDN)
            //Se que no esta declarada, pero esta global. TODO: Averiguar como es posible eso 
            M.toast({html: 'Tarea guardada'})

            //Recordar que en las etiquetas HTML hay que agregar una etiqueta llamada VALUE
            this.setState({titulo: '', descripcion: ''});
            //Refrescamos el listado de tareas
            this.obtenerTareas();
        }) 
        .catch(err => console.error(err));
       }

        //Bloquea que la accion por defecto sea ejecutada 
        e.preventDefault();
    }

    obtenerTareas(){
        fetch('api/tasks')
        .then(res => res.json())
        .then(data => {
            this.setState({tareas: data});
            console.log(this.state.tareas);
        })
        .catch(err => console.error(err));
    }

    eliminarTarea(id){
        if(confirm('Seguro que quieres borrar?')){
            fetch(`/api/tasks/${id}`,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Tarea borrada'})
                this.obtenerTareas();
            })
        }
    }

    editarTarea(id){
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                titulo: data.titulo,
                descripcion: data.descripcion,
                _id: data._id
            })
        })
    }

    render() {
        return (
            <div>
                {/*Navegacion*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Ejemplo MERN</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    {/*Creacion formulario para agregar datos*/}
                                    <form onSubmit={this.agregarTarea}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="titulo" onChange={this.controlarCambios} type="text" placeholder="Titulo tarea" value={this.state.titulo}></input>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="descripcion" onChange={this.controlarCambios} type="text" placeholder="Descripcion tarea" className="materialize-textarea" value={this.state.descripcion}></textarea>
                                            </div>
                                        </div>
                                        <button className="btn light-blue darken-4" type="submit">Enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Descripcion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tareas.map(tarea => {
                                            return (
                                                <tr key={tarea._id}>
                                                    <td>{tarea.titulo}</td>
                                                    <td>{tarea.descripcion}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={()=> this.eliminarTarea(tarea._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" style={{margin:'4px'}} onClick={() => this.editarTarea(tarea._id)}>
                                                        <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;