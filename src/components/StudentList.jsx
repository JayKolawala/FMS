import React, { useState } from 'react';
import StudentForm from './StudentForm';

export default function StudentList({ students, setStudents, isDashboard }) {

    const [standardFilter, setStandardFilter] = useState('All');
    const [showForm, setShowForm] = useState(false);

  const toggleFeesStatus = (id) => {
    const updated = students.map((s) =>
      s.id === id ? { ...s, feesPaid: !s.feesPaid } : s
    );
    setStudents(updated);
  };

  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
    setShowForm(false);
  };

  const handleEditStudent = (id) => {
    const student = students.find((s) => s.id === id);

    <StudentForm student={student}/>
  }

  const filteredStudents =
    standardFilter === 'All'
      ? students
      : students.filter((s) => s.standard === standardFilter);

  const standards = ['All', ...new Set(students.map((s) => s.standard))];

  const generateSlip = (student) => {
    const slip = `
      ---- Fee Payment Slip ----
      Name: ${student.name}
      Standard: ${student.standard}
      Email: ${student.email}
      Mobile: ${student.mobile}
      Fees Status: ${student.feesPaid ? 'Paid ✅' : 'Not Paid ❌'}
      --------------------------
    `;
    alert(slip);
  };

  const shareMessage = (student) => {
    const instituteName = 'Jay Institute';
    const message = student.feesPaid
      ? `Hello ${student.name}, your fees has been successfully received by ${instituteName}. Thank you!`
      : `Dear ${student.name}, this is a reminder from ${instituteName} that your school fees is still pending. Please make the payment soon.`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = `https://wa.me/91${student.mobile}?text=${encodedMessage}`;
    const emailURL = `mailto:${student.email}?subject=Fees Payment&body=${encodedMessage}`;
    const smsURL = `sms:${student.mobile}?body=${encodedMessage}`;

    const option = window.prompt(
      `Share via:\n1. WhatsApp\n2. Email\n3. SMS\n\nEnter 1, 2 or 3`
    );

    if (option === '1') {
      window.open(whatsappURL, '_blank');
    } else if (option === '2') {
      window.open(emailURL);
    } else if (option === '3') {
      window.open(smsURL);
    } else {
      alert('Invalid choice');
    }
  };

  if (!students.length) {
    return <p className="text-gray-600 mt-4">No students available.</p>;
  }

  return (
    <>
      <div className='w-full p-4 bg-gradient-to-br from-blue-100 to-blue-300'>
      {!isDashboard && (      
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Student Details</h1>
        </div>
        )
      }  
      <div className="overflow-x-auto mt-4">
      <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-3">
        
        <select
          value={standardFilter}
          onChange={(e) => setStandardFilter(e.target.value)}
          className="border border-gray-300 w-20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {standards.map((std, i) => (
            <option key={i} value={std}>
              {std}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          {showForm ? 'Close Form' : 'Add Student'}
        </button>
      </div>
      {showForm && <StudentForm onAdd={handleAddStudent} />}
      <table className="w-full table-auto bg-white rounded-xl shadow-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2">Standard</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Mobile</th>
            <th className="px-4 py-2">Fees Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id} className="text-center border-b">
              <td className="px-4 py-2 text-left">{student.name}</td>
              <td className="px-4 py-2">{student.standard}</td>
              <td className="px-4 py-2">{student.email}</td>
              <td className="px-4 py-2">{student.mobile}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    student.feesPaid ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
                  }`}
                >
                  {student.feesPaid ? 'Paid' : 'Due'}
                </span>
              </td>
              <td className="px-4 py-2 space-x-2">
                {isDashboard ? (
                  <>
                    <button
                      onClick={() => toggleFeesStatus(student.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => generateSlip(student)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Slip
                    </button>
                    <button
                      onClick={() => shareMessage(student)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Share
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditStudent(student.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => alert(`Delete ${student.name}`)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    </>
     
  );
}
