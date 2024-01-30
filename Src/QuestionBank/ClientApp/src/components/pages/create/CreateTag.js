import React, { useState } from 'react'
import { createTag } from '../../../utils/apiInteraction'

const CreateTag = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createTag(inputs, (status, responseData) => {
            if (status === 200) {
                alert("Create tag succeeded!")
            } else {
                alert("Create tag failed! Status code = " + status)
            }
        })
    }

    return (
        <div class="row">
            <div class="col-md-4">
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label class="control-label">Tag Name</label>
                        <input name="name" class="form-control" onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Tag Description</label>
                        <textarea name="description" class="form-control" onChange={handleChange} />
                    </div>
                    <div class="form-group">
                        <input type="submit" value="Create" class="btn btn-primary mt-2" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTag
