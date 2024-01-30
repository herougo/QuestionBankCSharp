import React, { useState } from 'react';
import { useCallback } from 'react';
import { toggleDone } from '../../../utils/apiInteraction';

const QuestionDisplay = (props) => {
    const { questions, selectedQuestionIx, onQuestionDataChange } = props
    const selectedQuestion = questions[selectedQuestionIx]
    const backgroundColour = selectedQuestion.done ?
        "bg-secondary" :
        "bg-primary"
    const doneBgColour = selectedQuestion.done ?
        "bg-success" :
        ""
    const classes = backgroundColour + " text-white p-3"

    const doneCheckboxOnChange = useCallback(e =>
        toggleDone(selectedQuestion.id, e.target.checked, (status, responseData) => {
            if (status === 200) {
                onQuestionDataChange()
            } else {
                alert("Saving done result failed: " + status)
            }
        })
    )

    return (
        <div className={classes}>
            <div className={"mb-1 p-1 " + doneBgColour}>
                <label>Done</label>
                <input
                    type="checkbox"
                    checked={selectedQuestion.done}
                    onChange={doneCheckboxOnChange}
                    className="m-1"
                />
            </div>
            <div>
                <textarea readOnly className="w-100" value={selectedQuestion.questionText || ""}></textarea>
            </div>
            <div>
                <label>Solution</label>
                <textarea readOnly className="w-100" value={selectedQuestion.answerText || ""}></textarea>
            </div>
            <div>
                <label>Courses</label>
                <textarea readOnly className="w-100" value={selectedQuestion.courses.join(", ")}></textarea>
            </div>
            <div>
                <label>Tags</label>
                <textarea readOnly className="w-100" value={selectedQuestion.tags.join(", ")}></textarea>
            </div>
        </div>
    )
}

export default QuestionDisplay