import { useState } from "react";
import CategoryPage from "../components/Category";
import QuestionsPage from "../components/QuestionsPage";
import AssessmentPage from "../components/Assessment";
import TestSelection from "../components/TestSelection";
import AssesmentList from "../components/AssesmentList";
import AllUsersList from "../components/AllUsers";
import AttemptedAssessmentForm from "../components/AttemptedAssesment";
import AnswerVerificationForm from "../components/VerifyAnswer";

export const Home = () =>{
    const [currentPage, setCurrentPage] = useState(null);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return(
<>

<div className="App">
            {currentPage === 'category' && <CategoryPage onPageChange={handlePageChange} />}
            {currentPage === 'questions' && <QuestionsPage onPageChange={handlePageChange} />}
            {currentPage === 'assessment' && <AssessmentPage onPageChange={handlePageChange} />}
            {currentPage === 'testselection' && <TestSelection onPageChange={handlePageChange} />}
            {currentPage === 'allassesment' && <AssesmentList onPageChange={handlePageChange} />}
            {currentPage === 'userassesment' && <AllUsersList onPageChange={handlePageChange} />}
            {currentPage === 'attemptedassesment' && <AttemptedAssessmentForm onPageChange={handlePageChange} />}
            {currentPage === 'verifyanswer' && <AnswerVerificationForm onPageChange={handlePageChange} />}




            {currentPage === null && (
                <div>
                    <h1>Welcome to the Homepage</h1>
                    <button onClick={() => handlePageChange('category')}>Add Category</button>
                    <button onClick={() => handlePageChange('questions')}>Add Question</button>
                    <button onClick={() => handlePageChange('assessment')}>Create new assessment</button>
                    <button onClick={() => handlePageChange('allassesment')}>All Assesment</button>
                    <button onClick={() => handlePageChange('userassesment')}>User Assesment</button>
                    <button onClick={() => handlePageChange('attemptedassesment')}>Attempted Assesment</button>
                    <button onClick={() => handlePageChange('verifyanswer')}>Verify Answer</button>




                </div>
            )}


        </div>
            
        
        </>
    ) 

}