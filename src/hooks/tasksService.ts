import { useEffect, useState } from 'react';

interface Task {
  id?: number;
  descripcion: string;
  completada: boolean;
  usuarioId: number;
}

interface UserWithTasks {
  nombre: string;
  tareas: Array<Task>;
}

export function tasksService() {
    const [data, setData] = useState<UserWithTasks[]>([]);

    useEffect(() => {
       fetchData()
    }, [])

    const fetchData = async () => {
      try {
        const usuariosResponse = await fetch('http://localhost:8090/api/users/usuarios');
        const usuarios = await usuariosResponse.json();
        const usuariosConTareas: Array<UserWithTasks> = [];

        for (const user of usuarios) {
            try {
                const tareasResponse = await fetch(`http://localhost:8090/api/tasks/tareas/user/${user.id}`);
                const tareas = await tareasResponse.json();

                usuariosConTareas.push({
                    nombre: user.nombre,
                    tareas: tareas,
                });
            } catch (err) {
                console.error(`Error al obtener tareas del usuario`, err);
            }
        }
        setData(usuariosConTareas)
      } catch (err) {
        console.error('Error al cargar usuarios con tareas', err);
      }
    };

    const createTask = async (taskData: Task) => {
      try {
        const response = await fetch(`http://localhost:8090/api/tasks/guardar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        });
  
        if (!response.ok) {
          throw new Error('Error al crear la tarea');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error en createTask:', error);
        throw error;
      }
    };

    return { data, createTask };
}