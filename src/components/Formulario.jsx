import React, { Fragment, useState } from 'react';
import Registro from './Registro';
import Swal from 'sweetalert2'
import { firebase } from '../firebase'

const Formulario = () => {
    const [id, setID] = useState(0);
    const [nombre, setNombre] = useState('');
    const [apellido, setApe] = useState('');
    const [correo, setCorreo] = useState('');
    const [lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(true)
    React.useEffect(() => {
        obtenerDatos();
        mostrarTabla();
    }, [])
    //conexion con firebase
    const obtenerDatos = async () => {//llamar a los documentos
        try {
            const db = firebase.firestore()
            const data = await db.collection('usuarios').get()
            const arrayData =
                data.docs.map(doc => ({ docID: doc.id, ...doc.data() }))
            setLista(arrayData)
            setCargando(false)
        } catch (error) {
            console.log(error);
        }
    }

    const EnviarDatos = async () => {//Enviar documentos a la base de datos
        try {
            const db = firebase.firestore()

            const nuevoUsuario = {
                id: id,
                nombre: nombre,
                apellido: apellido,
                correo: correo
            }

            const dato = await
                db.collection('usuarios').add(nuevoUsuario)
            //agregarndo a la lista
            setLista([
                ...lista,
                { ...nuevoUsuario, id: dato.id }
            ])
        } catch (error) {
            console.log(error);
        }
        setCargando(true)
        obtenerDatos()
    }

    const eliminarDato = async (id) => {//eliminar documentos de la base
        try {
            const db = firebase.firestore()
            await db.collection('usuarios').doc(id).delete()
            const
                listaFiltrada = lista.filter((elemento) => elemento.id !== id)
            setLista(listaFiltrada)
        } catch (error) {
            console.log(error);
        }
        setCargando(true)
        obtenerDatos();
    }

    const guardar = (e) => {//validar campos antes de enviar datos
        e.preventDefault()
        if (id <= 0) {//id mayor a 0
            messeg("id")
            return
        }

        if (lista.find(element => element.id == id) != null ? true : false) {//id repetida
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'el id ya existe',
                showConfirmButton: false,
                timer: 700
            })
            return
        }

        if (!nombre.trim()) {
            messeg("nombre")

            return
        }else if (!/^([a-zA-ZñÑáéíóúÁÉÍÓÚ])+$/i.test(nombre) ){
            messeg("nombre")

            return
        }
        if (!apellido.trim()) {
            messeg("apellido")

            return
        }else if (!/^([a-zA-ZñÑáéíóúÁÉÍÓÚ])+$/i.test(apellido) ){
            messeg("apellido")

            return
        }
        if (!correo.trim()) {
            messeg("correo")

            return
        }

        EnviarDatos()


        e.target.reset();
        setNombre('');
        setApe('');
        setCorreo('');
        setID('');


    };
    const mostrarTabla = () => {
        document.getElementById('datos').style = 'display: block';
    };

    const ocultarTabla = () => {
        document.getElementById('datos').style = 'display: none';
    }

    const messeg = (dato) => {
        Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'error en el ' + dato + "!",
            showConfirmButton: false,
            timer: 700
        })
    }

    return (
        <div className='container'>
            <div className='row align-items-start'>
                <div className='col-3  p-3'>
                    <div className=' card text-center '>
                        <h2 className='card-header'>Formulario</h2>
                        <form onSubmit={guardar} className='bg-light card-body'>
                            <input type="number"
                                className='form-control mb-2 '
                                placeholder='ID'
                                onChange={(e) => setID(e.target.value)}
                            />


                            <input type="text"
                                className='form-control mb-2 '
                                placeholder='Nombre'
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            <input type="text"
                                className='form-control mb-2'
                                placeholder='Apellido'
                                onChange={(e) => setApe(e.target.value)}
                            />
                            <input type="email"
                                className='form-control mb-2'
                                placeholder='Correo'
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                            <button onClick={''} className='btn btn-dark' type='submit'>Agregar</button>

                        </form>
                    </div>
                </div>
                <div className='col-sm-9'>
                    <div id="datos" className=''>
                        <table className="table table-striped">
                            <thead className=''>
                                <tr>
                                    <th>ID</th>
                                    <th>NOMBRE</th>
                                    <th>APELLIDO</th>
                                    <th>CORREO</th>
                                    <th>ELIMINAR</th>
                                </tr>
                            </thead>
                            <tbody>

                                {!cargando ?  lista.map((lis) => (
                                    <Registro key={lis.docID} registro={lis} delete={eliminarDato} ocultar={ocultarTabla} ></Registro>
                                )): <div></div>}


                            </tbody>
                        </table>
                          {cargando ? <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div> : <div></div>}
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Formulario