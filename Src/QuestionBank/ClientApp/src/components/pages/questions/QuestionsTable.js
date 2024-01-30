import React, { useCallback } from 'react';

const questionMaxLen = 20

const QuestionsTable = (props) => {
    const { questions, setSelectedQuestionId } = props

    return (
        <table className="table table-secondary">
            <thead>
                <tr>
                    <th>Question</th>
                    <th>Done</th>
                    <th>Course</th>
                    <th>Tags</th>
                </tr>
            </thead>
            <tbody>
                {questions.map((question) =>
                    <tr key={question.id} onClick={e => setSelectedQuestionId(question.id)}>
                        <td>{question.questionText?.substr(0, Math.min(questionMaxLen, question.questionText.length))}</td>
                        <td><input type="checkbox" disabled defaultChecked={question.done}></input></td>
                        <td>{question.courses.map(course => (
                            <button className="btn btn-primary">{course}</button>
                        ))}</td>
                        <td>{question.tags.map(tag => (
                            <button className="btn btn-primary">{tag}</button>
                        ))}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default QuestionsTable