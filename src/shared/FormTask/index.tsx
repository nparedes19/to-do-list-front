import SubmitButton from "../SubmitButton";
import user from '../../assets/user.png';
import { useState } from "react";
import { serviceUsers } from "../../hooks/serviceUsers";
import { tasksService } from "../../hooks/tasksService";

function FormTask() {
  const [descripcion, setDescripcion] = useState('');
  const [usuario, setUsuario] = useState('');


  const { users } = serviceUsers()
  const { createTask } = tasksService()

    const createTaskForm = async () => {
        try {
            await createTask({descripcion:descripcion, completada:false, usuarioId:Number(usuario)})
                console.log('Tarea creada correctamente');
                setDescripcion('');
                setUsuario('');
            } catch (error) {
            console.log('Hubo un error al crear la tarea');
        }
    }

return (
    <div className="d-flex boxForm">
        <div className="w-50">
            <img src={user} alt="Imagen" className="imgUserForm"/>
        </div>
        <form className="formulario w-50" onSubmit={()=>{createTaskForm()}}>
            <h2 className="subTitleForm">Crea las tareas!</h2>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Descripción</label>
                <input type="text" className="form-control" id="exampleInputEmail1" onChange={(e) => setDescripcion(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Usuario</label>
                <select
                    className="form-select"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    >
                    <option>Seleccione un usuario</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <SubmitButton text="Crea una tarea"/>
        </form>
    </div>

  );
}
export default FormTask