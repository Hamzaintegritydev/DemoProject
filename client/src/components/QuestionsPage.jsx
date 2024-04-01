import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function QuestionsPage() {
    const [question, setQuestion] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [category_name, setCategory] = useState('');
    const [options, setOptions] = useState([
        { option: '', isCorrect: false },
        { option: '', isCorrect: false },
        { option: '', isCorrect: false },
        { option: '', isCorrect: false }
    ]);
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

    const handleOptionChange = (index, e) => {
        const newOptions = [...options];
        newOptions[index].option = e.target.value;
        setOptions(newOptions);
    };

    const handleCorrectChange = (index, e) => {
        const newOptions = [...options];
        newOptions[index].isCorrect = e.target.checked;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(question, questionType, difficulty, category_name, options);

        try {
            const response = await axios.post("http://localhost:5000/api/v2/question", {
                category_name,
                question,
                questionType,
                difficulty,
                options
            });
            console.log(response);
            if (response.status === 200) {
                console.log("Question created successfully:", response.data);
                alert("Question Created Successfully");
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
                    <label htmlFor="question">Question:</label>
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
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                        id="category"
                        type="text"
                        value={category_name}
                        onChange={handleCategoryChange}
                        required
                    />
                </div>
                {options.map((option, index) => (
                    <div key={index} className="form-group">
                        <label htmlFor={`option${index + 1}`}>Option {index + 1}:</label>
                        <input
                            id={`option${index + 1}`}
                            type="text"
                            value={option.text}
                            onChange={(e) => handleOptionChange(index, e)}
                            required
                        />
                        <label htmlFor={`isCorrect${index + 1}`}>Is Correct:</label>
                        <input
                            id={`isCorrect${index + 1}`}
                            type="checkbox"
                            checked={option.isCorrect}
                            onChange={(e) => handleCorrectChange(index, e)}
                        />
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default QuestionsPage;
