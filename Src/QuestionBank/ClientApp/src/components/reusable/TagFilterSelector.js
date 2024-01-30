import Select from "./Select"
import { useState } from "react"



const TagFilterSelector = (props) => {
    const { options, selectName, labelText, onFilterListChange } = props
    const [filterList, setFilterList] = useState([])
    const [selectChoice, setSelectChoice] = useState(null)


    const onDropdownChange = (e) => {
        setSelectChoice(e.target.value)
    }
    const onAddButtonClick = (e) => {
        if (selectChoice === null) {
            return
        }
        for (const element of filterList) {
            if (element == selectChoice) {
                alert(selectChoice + " is already chosen.")
                return
            }
        }
        const newFilterList = [...filterList, selectChoice]
        setFilterList(newFilterList)
        onFilterListChange(newFilterList)
    }
    const onTagClick = (ix) => {
        const newFilterList = [
            ...filterList.slice(0, ix),
            ...filterList.slice(ix + 1, filterList.length)
        ]
        setFilterList(newFilterList)
        onFilterListChange(newFilterList)
    }

    return (
        <div>
            <div>
                <label className="m-1">{labelText}</label>
                <Select
                    options={[null, ...options]}
                    name={selectName}
                    onChange={onDropdownChange}
                    className="m-1"                >
                </Select>
                <button className="btn btn-primary m-1" onClick={ onAddButtonClick }>+</button>
            </div>
            <div>
                {
                    filterList.map((x, ix) => (
                        <button
                            key={x}
                            className="btn btn-danger m-1"
                            onClick={() => onTagClick(ix)}>
                            {x}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default TagFilterSelector