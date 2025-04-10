import React, { useState, useEffect } from 'react';
import StudentList from './StudentList';
import StudentForm from './StudentForm';

const Dashboard = ({ students, setStudents }) => {
  const [standardFilter, setStandardFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);

  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
    setShowForm(false);
  };

  const filteredStudents =
    standardFilter === 'All'
      ? students
      : students.filter((s) => s.standard === standardFilter);

  const standards = ['All', ...new Set(students.map((s) => s.standard))];
  return (
    <>
        <div className="w-full p-4 bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700"> Dashboard</h1>
      </div>

      {showForm && <StudentForm onAdd={handleAddStudent} />}

      <StudentList students={filteredStudents} setStudents={setStudents} isDashboard={true}/>
    </div>
    </>
  )
}

export default Dashboard
