import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentForm = ({ onAdd, onUpdate, students, editingStudentId  }) => {
    const [standard] = useState(['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']);  
    const [formData, setFormData] = useState({
        name: '',
        standard: '',
        feesPaid: false,
        email: '',
        mobile: ''
      });

      useEffect(() => {
        if (editingStudentId) {
          const existing = students.find(s => s.id === editingStudentId);
          if (existing) setFormData(existing);
        }
      }, [editingStudentId, students]);
      
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
      };
 
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form data:', formData);
        try {
          if (editingStudentId) {
            await axios.put(`http://localhost:5000/students/${editingStudentId}`, formData);
            onUpdate(formData);
          } else {
            const newStudent = { ...formData, id: Date.now().toString() };
            await axios.post('http://localhost:5000/students', newStudent);
            onAdd(newStudent);
          }
      
          setFormData({
            name: '',
            standard: '',
            feesPaid: false,
            email: '',
            mobile: ''
          });
        } catch (error) {
          console.error("Error submitting form:", error);
        }
        console.log('Form submitted successfully');
      };
      

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        {editingStudentId ? "Edit Student" : "Add New Student"}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Standard</label>
          <select
            name="standard"
            value={formData.standard}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" disabled>Select Standard</option>
            {standard.map((standard) => (
              <option key={standard} value={standard}>{standard}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2 col-span-full">
          <input
            type="checkbox"
            name="feesPaid"
            checked={formData.feesPaid}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <label className="text-gray-700 font-medium">Fees Paid</label>
        </div>
        <div className="col-span-full">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {editingStudentId ? "Update Student" : "Add Student"}
          </button>
        </div>
      </form>
    </div> 
    </>
  )
}

export default StudentForm
