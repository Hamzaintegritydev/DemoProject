import React, {useState, useEffect} from 'react'
import axios from 'axios';

const AssesmentList = ({onPageChange}) => {
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get('http://localhost:5000/api/v3/allAssesment');
          setAssessments(response.data);
        } catch (error) {
          console.error('Error fetching assessments:', error);
        }
      }
      fetchData();
    }, []);
    onPageChange('allassesment');
console.log(assessments);

  
    return (
      <div>
        <h1 className='container'>All Assessments</h1>
        <div className='assesment-container'>
          {assessments && assessments.map(assessment => (
            <div className='assessment-card'>
               <h2>Assesment Name: {assessment.assesment_name}</h2>
               <p>created By: {assessment.created_by}</p>
               <p>is active: {assessment.is_active ? "True" : "false"}</p>
            </div>
            
          ))}
    </div>
      </div>
    );
  }

export default AssesmentList