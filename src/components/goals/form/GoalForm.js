import './GoalForm.css'
import {useState} from "react"
import { createGoal } from "../../../utils/rest_api"
import StepInput from "./StepInput"


export default function GoalForm ({setGoals, setShowCreate}) {
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
            setGoals(response.reverse())
            setShowCreate(false)
            setDescription("")
            setStepValues(
                [
                    {
                        label: "Step 1",
                        type: "text",
                        value: "",
                    }
                ]
            )
        }
    }
    

    return (
        <div className="goal-form">
            <h3>Add your goal information</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="description">Desciption</label>
                <input placeholder="describe your goal" required type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                {stepValues.map((obj, index) => {
                    return <StepInput 
                                key={index}
                                objValue={obj}
                                onChange={handleChange}
                                index={index}
                            />
                })}
                <button className="add-btn" onClick={handleAddField}>
                Add step <img src={"/icons/icons_add.png"} alt="plus sign"/>
                </button>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    )
}