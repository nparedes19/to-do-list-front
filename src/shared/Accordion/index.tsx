interface Task {
  id: number;
  descripcion: string;
  completada: boolean;
  usuarioId: number;
}

interface UserWithTasks {
  nombre: string;
  tareas: Array<Task>;
}

type AccordionProps = {
  userWithTasks: UserWithTasks[];
};

function Accordion({ userWithTasks }: AccordionProps) {

  return (
    <div className="accordion" id="accordionExample">
        {userWithTasks.map((user) => user.tareas.length > 0 && (
          <div className="accordion-item">
            <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                {user.nombre}
            </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
                {user.tareas.map((task,index) =>
                    <p key={index}>{task.descripcion} {task.completada && <span>✅</span>}</p>
                )}
            </div>
           </div>
          </div>
        ))}
    </div>
  );
}

export default Accordion;