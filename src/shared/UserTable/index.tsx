import DeleteButton from "../DeleteButton";


export interface User {
  id?: number;
  nombre: string;
  telefono: string;
  correo: string | null;
  contraseña: string | null;
}

interface UserTableProps {
  users: User[];
  onDelete: (id: number) => void;
}

function UserTable(props: UserTableProps) {
  const { users, onDelete } = props;

  return (
    <table className="table table-striped table-hover table-users">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.nombre}</td>
            <td>{user.telefono}</td>
            <td>{user.correo ?? 'No disponible'}</td>
            <td>
               <DeleteButton onClick={() => onDelete(user.id!)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;