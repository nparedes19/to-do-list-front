import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from '../Logo';


export function Header() {
  return (
    <header className={styles.header}>
        <Logo className={styles.logo} />
        <NavLink to="/tasks" className={styles.link} end>
          Tareas
        </NavLink>
        <NavLink to="/users" className={styles.link} end>
          Usuarios
        </NavLink>
        <NavLink to="/users/create" className={styles.link} >
          Crear Usuario
        </NavLink>
        <NavLink to="/tasks/create" className={styles.link} >
          Crear Tarea
        </NavLink>
    </header>
  );
}