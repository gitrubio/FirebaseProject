import React, {Fragment} from 'react';

export default function Registro({registro,delete:d,ocultar:ocu}) {
    const {docID,id,nombre,apellido,correo} = registro; 
    const borrar=()=>{
   d(docID);
    };
   
  return (
    
    <tr>
       <td>{id}</td>
       <td>{nombre}</td>
       <td>{apellido}</td>
       <td>{correo}</td>
       <td><button onClick={borrar} className='btn btn-danger'>Eliminar</button></td>
    </tr>
   
  )
  
}
