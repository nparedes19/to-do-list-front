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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
            console.log("Tareas cargadas:", data);
            setTasks(data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Fetch error:', err);
            setError(err.message);
            setLoading(false);
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
            setError(`Failed to delete task: ${err.message}`);
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

    return(
        <div className={styles.toDoList}>
            <h1 className={styles.firstTitle}>To-Do-List General</h1>
            <ol>
                {tasks.map((task,index) =>
                    <li key={index}>
                        <span className={styles.text}>{task.descripcion}</span>
                        <input className="form-check-input" type="checkbox" checked={task.completada} id="checkDefault" onChange={() => toggleComplete(task)}/>
                        <button className={styles.buttonDelete} onClick={()=>deleteTask(task.id)}>
                            Delete
                        </button>
                        
                    </li>
                )}
            </ol>
        </div>
    )
}

export default ToDoList