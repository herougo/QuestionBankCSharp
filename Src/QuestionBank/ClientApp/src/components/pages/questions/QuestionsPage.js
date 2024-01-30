import React, { useState } from 'react';
import QuestionsTable from './QuestionsTable';
import { getFilteredQuestions } from '../../../utils/apiInteraction'
import useDataLoad from '../../../hooks/useDataLoad';
import QuestionDisplay from './QuestionDisplay';
import QuestionFilter from './QuestionFilter';

const QuestionsPage = () => {
    const [tableData, onFilterChange] = useDataLoad(getFilteredQuestions, {courses: [], tags: []})
    const [selectedQuestionId, setSelectedQuestionId] = useState(null)
    let selectedQuestionIx = null
    if (tableData !== null) {
        for (var i = 0; i < tableData.length; i++) {
            if (selectedQuestionId === tableData[i].id) {
                selectedQuestionIx = i
                break
            }
        }
    }
    const onFilterButtonClick = (filterData) => {
        onFilterChange(filterData)
    }

    const contents = tableData === null ?
        "Loading..." :
        <QuestionsTable questions={tableData} setSelectedQuestionId={setSelectedQuestionId} />

    const questionDisplay = selectedQuestionIx === null ?
        null :
        <div class="col">
            <QuestionDisplay
                questions={tableData}
                selectedQuestionIx={selectedQuestionIx}
                onQuestionDataChange={onFilterChange}
            />
        </div>

    return (
        <div>
            <h1>Questions</h1>
            <div class="row">
                <div class="col">
                    <button class="btn btn-primary">Generate Sample Exam</button>
                    <button class="btn btn-primary mx-1">Export Questions to PDF</button><br />
                    <QuestionFilter onFilterButtonClick={onFilterButtonClick} />
                    {contents}
                </div>
                {questionDisplay}
            </div>
        </div>
    );
}

export default QuestionsPage