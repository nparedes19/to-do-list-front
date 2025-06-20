import React, {useEffect, useState} from 'react'
import styles from './ToDoList.module.css';

interface Task {
  id: number;
  descripcion: string;
  completada: boolean;
  usuarioId: number;
}

function ToDoList(){
    const [tasks, setTasks] = useState<Task[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        console.log('Estado tasks actualizado:', tasks);
        }, [tasks]);

    useEffect(() => {
        fetchTasks()
    }, []);

    const fetchTasks = () => {
        fetch('http://localhost:8090/api/tasks/tareas')
        .then(res => {
            if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json() as Promise<Task[]>;
        })
        .then(data => {
            console.log("Tareas cargadas");
            setTasks(data);
        })
        .catch(err => {
            console.error('Error', err);
        });
    };

    function deleteTask(index: number){
        fetch(`http://localhost:8090/api/tasks/eliminar/${index}`, {
        method: 'DELETE',
        })
        .then(res => {
            if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
            }
        })
        .then(() => {
            fetchTasks();
        })
        .catch(err => {
            console.error('Error al eliminar la tarea:', err);
        });
    }

    const toggleComplete = async (task: Task) => {
        const updatedTask = {
            ...task,
            completada: !task.completada
        };

        try {
            const response = await fetch(`http://localhost:8090/api/tasks/editar/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
            });

            if (response.ok) {
                fetchTasks();
            } else {
            console.error('Error al actualizar la tarea');
            }
        } catch (error) {
            console.error('Error de red al actualizar la tarea:', error);
        }
    };

    const filteredTasks = tasks.filter(t => t.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));

    return(
        <div className={styles.toDoList}>
            <h1 className={styles.firstTitle}>To-Do-List General</h1>
            <div className="input-group groupSearch">
                <input
                    type="search"
                    className="form-control"
                    placeholder="Buscar tarea..."
                    aria-label="Buscar tarea"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-success" type="button" onClick={() => setSearchTerm('')}>
                    Limpiar
                </button>
            </div>
            <ol>
                {filteredTasks.map(task => (
                <li key={task.id} className="d-flex align-items-center mb-2">
                    <span className="flex-grow-1">{task.descripcion}</span>
                    <input
                    className="form-check-input me-2"
                    type="checkbox"
                    checked={task.completada}
                    onChange={() => toggleComplete(task)}
                    />
                    <button
                    className={styles.buttonDelete}
                    onClick={() => deleteTask(task.id)}
                    >
                    Eliminar
                    </button>
                </li>
                ))}
            </ol>
        </div>
    )
}

export default ToDoList