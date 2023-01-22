import './Goal.css'
import { useEffect, useState} from "react"
import { finishGoalStep, getGoal } from "../../../utils/rest_api"

export default function Goal ({goalId}) {
    const [goal, setGoal] = useState({})
    const [showDetails, setShowDetails] = useState(false)
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
    const calcSteps = () => {
        let completedCount = 0
        let totalCount = 0
        goal.steps.forEach(step => {
            if (step.completed) {
                completedCount +=1
                totalCount +=1
            } else {
                totalCount +=1
            }

        })

        return [completedCount, totalCount]
    }
    var style = {color: "red"}
    if (goal && goal.title) {
        const progress = calcSteps()
        // console.log(progress[0], progress[1])
        if (progress[0]===progress[1]){
            
            style.color = "green"
        }
    }
    return (
        <div className="goal">
            {goal && goal.title? (
            <>
                <h3>{goal.title}</h3>

                {!showDetails ? (
                    <>
                        <p className='progress' style={style}>{`${calcSteps()[0]}/${calcSteps()[1]}`}</p>
                    </>
                ) : (
                    <>
                        <ul className="goal-steps">
                            
                                {goal.steps.map((step, i) => {
                                    return (
                                        <li className={"step"} key={i}>
                                            {step.description}
                                            {step.completed ? (
                                                <img src="/icons/icons_checked_checkbox.png" alt="checked checkbox"/>
                                            ) : (
                                                <button onClick={() => handleCompleteStep(step._id)}><img src="/icons/icons_unchecked_checkbox.png" alt="unchecked checkbox"/></button>
                                            )}
                                            
                                        </li>
                                    )
                                })}
                            
                        </ul>
                    </>
                )
                }
                <div className='expand-button'>
                    {showDetails ? (
                        <button onClick={() => setShowDetails(false)}><img src="/icons/icons_up.png" alt={"up arrow"}/></button>
                    ) : (
                        <button onClick={() => setShowDetails(true)}><img src="/icons/icons_down.png" alt={"down arrow"}/></button>
                    )}
                </div>
            </>
            ): ""}
            
        </div>
    )
}