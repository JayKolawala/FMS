import React from 'react'

const SideBar = ({ onComponentChange }) => {

      const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        window.location.reload();
      };
  return (
    <>
        <div className='flex w-96 flex-col bg-blue-600 shadow-lg rounded-lg p-4 w-full h-screen'>
            <h2 className='text-white text-2xl font-bold mb-4'>Logo</h2>
            <ul className='space-y-2'>
                <li className='text-white hover:bg-blue-700 rounded-lg p-2 cursor-pointer'
                    onClick={() => onComponentChange('Dashboard')}>Dashboard</li>
                <li className='text-white hover:bg-blue-700 rounded-lg p-2 cursor-pointer'
                    onClick={() => onComponentChange('StudentList')}>Students</li>
                <li className='text-white hover:bg-blue-700 rounded-lg p-2 cursor-pointer'>Attendance</li>
                <li className='text-white hover:bg-blue-700 rounded-lg p-2 cursor-pointer' 
                    onClick={() => onComponentChange('FeeDetails')}>Fees Details</li>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                    Logout
                    </button>
            </ul>
        </div> 
    </>
  )
}

export default SideBar
