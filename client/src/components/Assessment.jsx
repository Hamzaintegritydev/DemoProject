import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function AssessmentPage({ onPageChange }) {
    const [assessmentName, setAssessmentName] = useState('');
    const [created_by, setCreatedBy] = useState ("");


    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(assessmentName);
    try {
      const response = await fetch("http://localhost:5000/api/v3/createAssesment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assesment_name: assessmentName, created_by }),
      });
      console.log("response data : ", response);
      if (response.ok) {
        const responseData = await response.json();
        console.log("after creating: ", responseData);
        // toast.success("Registration Successful");
        // saveTokenInLocalStr(responseData.token);
        alert("Assesment created Succesfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
   //Redirect to QuestionsPage
     onPageChange('testselection');
    };

    return (
        <div className='container1'>
            <h1>Add Assessment Name</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="assessment-name">Assessment Name:</label>
                <input
                    type="text"
                    id="assessment"
                    value={assessmentName}
                    onChange={(e) => setAssessmentName(e.target.value)}
                    required
                />

<label htmlFor="assessment-name">CreatedBy:</label>
                <input
                    type="text"
                    id="created_by"
                    value={created_by}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    required
                />
                <button type="submit">Next</button>
            </form>
        </div>
    );
}

export default AssessmentPage;