import React from 'react'

const FeeDetails = () => {
    const [standard, setStandard] = React.useState(['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']);  
    const [formData, setFormData] = React.useState({
        standard: '',
        amount: '',
    });
    

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
    }
  return (
    <>
       <div className="w-full p-4 bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700"> Fees Details</h1>
        
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Standard</label>
          <select
            name="standard"
            value={formData.standard}
            onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" disabled>Select Standard</option>
            {standard.map((standard) => (
              <option key={standard} value={standard}>{standard}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Total Amount</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-full">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Student
          </button>
        </div>
      </form>
    </div> 
    </>
  )
}

export default FeeDetails
