import {useState, useRef} from "react"
import { createGoal } from "../../../utils/rest_api"
import StepInput from "./StepInput"

export default function GoalForm ({setGoals}) {
    const [description, setDescription] = useState("")
    const [stepValues, setStepValues] = useState([
        {
            label: "Step 1",
            type: "text",
            value: "",
        }
    ])

    const handleChange = (e, index) => {
        const values = [...stepValues]
        values[index].value = e.target.value 
        setStepValues(values)
    }

    const handleAddField = (e) => {
        e.preventDefault()
        const values = [...stepValues]
        values.push({
            label: "Step "+(values.length +1).toString(),
            type: "text",
            value: "",
        })
        setStepValues(values)
    }

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("jwt")
        e.preventDefault()
        const body = {
            description: description,
            steps: stepValues,
        }
        const response = await createGoal(token,body)
        if (response) {
            setGoals(response)
        }
    }
    

    return (
        <div className="goal-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="description">Desciption</label>
                <input placeholder="describe your goal" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                {stepValues.map((obj, index) => {
                    return <StepInput 
                                key={index}
                                objValue={obj}
                                onChange={handleChange}
                                index={index}
                            />
                })}
                <button className="add-btn" onClick={handleAddField}>
                Add step
                </button>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    )
}