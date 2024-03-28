import React, { useState } from 'react';
import axios from 'axios';

function AnswerVerificationForm() {
  // State to store form data
  const [formData, setFormData] = useState({
    answer_id: '',
    selected_option: '',
    assessmentId: '',
    testId: '',
    candidateId: ''
  });

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Make POST request to backend
      const response = await axios.put('http://localhost:5000/api/v3/verify', formData);
      console.log(response.data); 
      if (response.data.answer.is_correct == true) {
        alert("Correct Answer")
      } else {
        alert("Wrong Answer")
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors
    }
  };

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='container2'>
      <h2>Answer Verification Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Answer ID:
            <input type="text" name="answer_id" value={formData.answer_id} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Selected Option:
            <select name="selected_option" value={formData.selected_option} onChange={handleChange}>
              <option value="">Select Option</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Assessment ID:
            <input type="text" name="assessmentId" value={formData.assessmentId} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Test ID:
            <input type="text" name="testId" value={formData.testId} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Candidate ID:
            <input type="text" name="candidateId" value={formData.candidateId} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AnswerVerificationForm;
