import { Outlet } from 'react-router-dom';

export default function ProjectsContainer() {
  return (
    <div style={{ margin: '2rem' }}>
      <Outlet />
    </div>
  );
}
