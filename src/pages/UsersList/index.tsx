import { Header } from "../../shared/Header";
import { useServiceUsers } from '../../hooks/useServiceUsers';
import UserTable from "../../shared/UserTable";
import styles from './UsersList.module.css';
import { useServiceTasks } from "../../hooks/useServiceTasks";
import Accordion from "../../shared/Accordion";
import Footer from "../../shared/Footer";


const UsersList = () => {
  const { users, deleteUser } = useServiceUsers()
  const { data } = useServiceTasks()

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