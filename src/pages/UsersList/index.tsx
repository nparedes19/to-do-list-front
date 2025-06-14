import { Header } from "../../shared/Header";
import { serviceUsers } from '../../hooks/serviceUsers';
import UserTable from "../../shared/UserTable";
import styles from './UsersList.module.css';
import { tasksService } from "../../hooks/tasksService";
import Accordion from "../../shared/Accordion";
import Footer from "../../shared/Footer";


const UsersList = () => {
  const { users, deleteUser } = serviceUsers()
  const { data } = tasksService()

  return (
      <>
        <Header/>
        <h1 className={styles.firstTitle}>Listado de usuarios</h1>
        <div className={styles.boxTable}>
          <UserTable users={users} onDelete={deleteUser} />
        </div>
        <h1 className={styles.firstTitle}>Usuarios con tareas asignadas</h1>
        <div className={styles.boxTable}>
          <Accordion userWithTasks={data}/>
        </div>
        <Footer/>
      </>
    );
};
export default UsersList;