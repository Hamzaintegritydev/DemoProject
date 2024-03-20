import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
function QuestionsPage() {
    const [question, setQuestion] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [category_name, setCategory] = useState('');
    const navigate = useNavigate();
    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
      };
    const handleQuestionTypeChange = (e) => {
        setQuestionType(e.target.value);
    };
    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(question, questionType, difficulty, category_name)
        try {
            const response = await fetch("http://localhost:5000/api/v2/question", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ category_name, question, questionType, difficulty }),
            });
            console.log(response);
            if (response.ok) {
              const responseData = await response.json();
              console.log("after creating: ", responseData);
              alert("Question Created Sucessfully")
              navigate("/");
            }
          } catch (error) {
            console.log(error);
          }
    };
    return (
        <div className='container2'>
            <h1>Add Question </h1>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="questionType">Question:</label>
                    <input
                        id="question"
                        type="text"
                        value={question}
                        onChange={handleQuestionChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="questionType">Question Type:</label>
                    <input
                        id="questionType"
                        type="text"
                        value={questionType}
                        onChange={handleQuestionTypeChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="difficulty">Difficulty Level:</label>
                    <select
                        id="difficulty"
                        value={difficulty}
                        onChange={handleDifficultyChange}
                        required
                    >
                        <option value="">Select Difficulty</option>
                        <option value="hard">Hard</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        {/* Add more options if needed */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                        id="category"
                        text="type"
                        value={category_name}
                        onChange={handleCategoryChange}
                        required
                    />
                </div>
                {/* Add inputs for question and answers */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
export default QuestionsPage;