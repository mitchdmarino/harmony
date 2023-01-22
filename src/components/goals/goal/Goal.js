import './Goal.css'
import { useEffect, useState} from "react"
import { finishGoalStep, getGoal } from "../../../utils/rest_api"

export default function Goal ({goalId}) {
    const [goal, setGoal] = useState({})
    useEffect(() => {
        const token = localStorage.getItem("jwt")
        const fetchGoalDetails = async () => {
            const response = await getGoal(token, goalId)
            if (response) {
                setGoal(response)
            }
        }
        fetchGoalDetails()
    }, [])
    
    const handleCompleteStep = async (stepId) => {
        const token = localStorage.getItem("jwt")
        const response = await finishGoalStep(token, goal._id, stepId)
        if (response) {
            setGoal(response)
        }
    }
    return (
        <div className="goal">
            {goal && goal.title? (
            <>
                {goal.title}
                <div className="goal-steps">
                    {goal.steps.map((step, i) => {
                        return (
                            <div key={i}>
                                {step.description}
                                {step.completed ? "done" : "todo"}
                                <button onClick={() => handleCompleteStep(step._id)}>Complete</button>
                            </div>
                        )
                    })}
                </div>
            </>
            ): ""}
            
        </div>
    )
}