import { Header } from "../../shared/Header";
import ToDoList from "../../shared/ToDoList";

const TasksList = () => {
  // llamar al servicio que fetch users...
  return (
        <>
          <Header/>
          <ToDoList/>
          {/* Tu tabla de usuarios aquí */}
        </>
      );
};
export default TasksList;