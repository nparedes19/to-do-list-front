import { useEffect, useState } from 'react';

export interface User {
  id?: number;
  nombre: string;
  telefono: string;
  correo: string | null;
  contraseña: string | null;
}

export const useServiceUsers = () => {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8090/api/users/usuarios');
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        console.log(err.message);
      }
  };

  const deleteUser = async (id: number) => {

        fetch(`http://localhost:8090/api/users/delete/${id}`, {
        method: 'DELETE',
        })
        .then(res => {
            if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
            }
        })
        .then(() => {
            fetchUsers()
        })
        .catch(err => {
            console.error('Error al eliminar el usuario:', err);
        });
   }

  const createUser = async (userData: User) => {
    try {
      const response = await fetch(`http://localhost:8090/api/users/guardar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }
      const text = await response.text(); 
      console.log(text);
      window.alert(`Usuario guardado con exito`);
      return text;
    } catch (error) {
      console.error('Error en createUser:', error);
      throw error;
    }
  };

  return { users, deleteUser, createUser };
};