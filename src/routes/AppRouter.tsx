import { Routes, Route, Navigate } from 'react-router-dom';
import UsersList from '../pages/UsersList';
import TasksList from '../pages/TasksList';
import CreateUser from '../pages/CreateUser';
import CreateTask from '../pages/CreateTask';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to="tasks" replace />} />
    <Route path="/users" element={<UsersList />} />
    <Route path="/tasks" element={<TasksList />} />
    <Route path="/users/create" element={<CreateUser />} />
    <Route path="/tasks/create" element={<CreateTask />} />
  </Routes>
);

export default AppRouter;