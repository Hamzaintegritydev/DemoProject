import React, {useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';


const TestSelection = ({onPageChange}) => {
    const [selectCategory, setSelectCategory] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [testName, setTestName] = useState('');
    const [testCategory, setTestCategory] = useState('');


    const navigate = useNavigate();


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(selectCategory, testName);
    try {
      const response = await fetch("http://localhost:5000/api/v3/createTest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ test_name: testName, category_name: selectCategory, difficulty: testCategory, created_by: createdBy }),
      });
      console.log("response data : ", response);
      if (response.ok) {
        const responseData = await response.json();
        console.log("after creating: ", responseData);
        // toast.success("Registration Successful");
        // saveTokenInLocalStr(responseData.token);
        alert("test created Succesfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
    onPageChange('testselection');

}


  return (
    <div className='container2'>
            <h1>Test Selection</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="test-name">Test Name:</label>
                <input
                    type="text"
                    id="test"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    required
                />
                                <div className="form-group">
                    <label htmlFor="difficulty">Difficulty Level:</label>
                    <select
                        id="difficulty"
                        value={testCategory}
                        onChange={(e) => setTestCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Difficulty</option>
                        <option value="hard">hard</option>
                        <option value="easy">easy</option>
                        <option value="medium">medium</option>
                        {/* Add more options if needed */}
                    </select>
                </div>
                <label htmlFor="category-name">Category Name:</label>
                <input
                    type="text"
                    id="category"
                    value={selectCategory}
                    onChange={(e) => setSelectCategory(e.target.value)}
                    required
                />
                <label htmlFor="createdby">Created by:</label>
                <input
                    type="text"
                    id="createdby"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    required
                />
                <button type="submit">Next</button>
            </form>
        </div>
  )
}

export default TestSelection