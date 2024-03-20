import React, { useState } from 'react';
import axios from 'axios';

function AttemptedAssessmentForm() {
  const [assessmentId, setAssessmentId] = useState('');
  const [userId, setUserId] = useState('');
  const [candidateId, setCandidateId] = useState('');
  const [tests, setTests] = useState([
    { test_id: '', score: '' },
    { test_id: '', score: '' },
    { testID: '', score: '' }
  ]);

  const handleChange = (index, key, value) => {
    const updatedTests = [...tests];
    updatedTests[index][key] = value;
    setTests(updatedTests);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      assessmentId,
      userId,
      candidateId,
      tests
    };
    try {
      const response = await axios.post('http://localhost:5000/api/v3/createAttemptedAssessment', data);
      console.log('Assessment submitted:', response.data);
      alert("Attemted Assesment Succesfully")
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  return (
    <div className='container2'>
      <h2>Attempt Assessment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Assessment ID:
          <input type="text" value={assessmentId} onChange={(e) => setAssessmentId(e.target.value)} />
        </label>
        <br />
        <label>
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          Candidate ID:
          <input type="text" value={candidateId} onChange={(e) => setCandidateId(e.target.value)} />
        </label>
        <br />
        {tests.map((test, index) => (
          <div key={index}>
            <label>
              Test ID:
              <input type="text" value={test.test_id} onChange={(e) => handleChange(index, 'test_id', e.target.value)} />
            </label>
            <label>
              Test Score:
              <input type="text" value={test.score} onChange={(e) => handleChange(index, 'score', e.target.value)} />
            </label>
          </div>
        ))}
        <br />
        <button type="button" onClick={() => setTests([...tests, { test_id: '', score: '' }])}>Add Test</button>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AttemptedAssessmentForm;
