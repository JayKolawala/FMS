import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import Dashboard from './Dashboard';
import FeeDetails from './FeeDetails';
import StudentList from './StudentList';

const Layout = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [students, setStudents] = useState([]);

  // Fetch data once on mount
  useEffect(() => {
    fetch('/students.json')
      .then((res) => res.json())
      .then((data) => setStudents(data.students || []));
  }, []);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex gap-4">
      <div className="flex col-span-1">
        <SideBar onComponentChange={handleComponentChange} />
      </div>
      <div className="flex w-full">
        {activeComponent === 'Dashboard' && (
          <Dashboard students={students} setStudents={setStudents} />
        )}
        {activeComponent === 'FeeDetails' && <FeeDetails />}
        {activeComponent === 'StudentList' && (
          <StudentList students={students} setStudents={setStudents} isDashboard={false} />
        )}
      </div>
    </div>
  );
};

export default Layout;
