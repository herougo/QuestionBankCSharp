import React, { useState } from 'react'
import { createCourse } from '../../../utils/apiInteraction'

const CreateCourse = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createCourse(inputs, (status, responseData) => {
            if (status === 200) {
                alert("Create course succeeded!")
            } else {
                alert("Create course failed! Status code = " + status)
            }
        })
    }

    return (
        <div class="row">
            <div class="col-md-4">
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label class="control-label">Course Code</label>
                        <input name="code" class="form-control" onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Course Title</label>
                        <input name="title" class="form-control" onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <input type="submit" value="Create" class="btn btn-primary mt-2" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateCourse
