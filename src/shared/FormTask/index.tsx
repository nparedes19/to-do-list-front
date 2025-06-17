import SubmitButton from "../SubmitButton";
import task from '../../assets/task.png';
import { useState } from "react";
import { useServiceUsers } from "../../hooks/useServiceUsers";
import { useServiceTasks } from "../../hooks/useServiceTasks";

function FormTask() {
  const [descripcion, setDescripcion] = useState('');
  const [usuario, setUsuario] = useState('');


  const { users } = useServiceUsers()
  const { createTask } = useServiceTasks()

    const createTaskForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        <div className="w-50 d-flex">
            <img src={task} alt="Imagen" className="imgTaskForm"/>
        </div>
        <form className="formulario w-50" onSubmit={createTaskForm}>
            <h2 className="subTitleForm">Crea las tareas!</h2>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripción</label>
                <input type="text" value={descripcion} className="form-control" id="description" onChange={(e) => setDescripcion(e.target.value)} />
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