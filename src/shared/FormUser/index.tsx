import SubmitButton from "../SubmitButton";
import user from '../../assets/user.png';
import { useState } from "react";
import { useServiceUsers } from "../../hooks/useServiceUsers";


export interface User {
  id?: number;
  nombre: string;
  telefono: string;
  correo: string | null;
  contraseña: string | null;
}

function FormUser() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { createUser } = useServiceUsers()

    const createUserForm = async () => {
        try {
            await createUser({nombre:nombre, telefono:telefono, correo:email, contraseña:password})
                console.log('Usuario creado correctamente');
                setNombre('');
                setTelefono('');
                setEmail('');
                setPassword('');
            } catch (error) {
            console.log('Hubo un error al crear el usuario');
        }
    }

return (
    <div className="d-flex boxForm">
        <div className="w-50 d-flex">
            < img src={user} alt="Logo de la app" className="imgUserForm"/>
        </div>
        <form className="formulario w-50" onSubmit={createUserForm}>
            <h2 className="subTitleForm">Crea tu usuario!</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="name" onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Teléfono</label>
                <input type="number" className="form-control" id="phone" onChange={(e) => setTelefono(e.target.value)}  />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <SubmitButton text="Crear usuario"/>
        </form>
    </div>

  );
}
export default FormUser