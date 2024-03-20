import React, { useState } from 'react';

function CategoryPage({ onPageChange }) {
    const [category, setCategory] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
      //  console.log(category);
    try {
      const response = await fetch("http://localhost:5000/api/v1/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category_name: category }),
      });
      console.log("response data : ", response);
      if (response.ok) {
        const responseData = await response.json();
        console.log("after creating: ", responseData);
        // toast.success("Registration Successful");
        // saveTokenInLocalStr(responseData.token);
        alert("category created Succesfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
        // Redirect to QuestionsPage
         onPageChange('questions');
    };

    return (
        <div className='container3'>
            <h1>Add Category</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="category">Category Name:</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CategoryPage;
