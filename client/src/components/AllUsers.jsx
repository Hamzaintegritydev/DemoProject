import React, {useState, useEffect} from 'react'
import axios from 'axios';
const UsersList = ({onPageChange}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get('http://localhost:5000/api/v1/allUsers');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching assessments:', error);
        }
      }
      fetchData();
    }, []);
    onPageChange('userassesment');
    console.log(users);
    return (
      <div>
        <h1 className='container'>All Users</h1>
        <div className='assesment-container'>
          {users && users.map(users => (
           <div className='user-card'>
            <h2>User Name : {users.firstName}</h2>
            <p>Last Name : {users.lastName}</p>
            <p>email : {users.email}</p>
            <p>Phone no : {users.phone}</p>
           </div>
          ))}
          </div>
      </div>
    );
  }
export default UsersList