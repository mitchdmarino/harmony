import './Question.css'
import Profile from "../../misc/Profile"
import AnswerBubble from './AnswerBubble'
import { useEffect, useState } from 'react'
import { answerQuestion, getQuestions } from '../../../utils/rest_api'



export default function Question ({question, user,setQuestions}) {
    const [expand, setExpand] = useState(false)
    const [answer, setAnswer] = useState("")

    const handleAnswerQuestion = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("jwt")
        const response = await answerQuestion(token,question._id,answer)
        if (response) {
            setQuestions(await getQuestions(token))
        }
        else {
            
        }
    }
    const didUserAnswerQuestion = () => {
        if(user) {
            for (let i=0; i<question.answers.length; i++) {
                if (question.answers[i].author._id===user._id) {
                    return true
                }
                else {continue}
            }
            return false
        } else {
            return false
        }
        
    }
    
    var answeredBy = ""
    if (question && question.answers.length >=1) {
        answeredBy = question.answers.map((answer, i) => {
            return (
                <Profile key={i} user={answer.author} size="small" />
            )
        })
    }


    return (
        <div className="question-container" onClick={() => setExpand(true)}>
            <p>{question.question}</p>
            {!expand &&user? (
                <div className='answered-by'>
                    {answeredBy}
                    {didUserAnswerQuestion()? "":(<div><p>Answer Question --{">"}</p></div>)}
                </div>
            ): (
                <div className='answers'>
                    {didUserAnswerQuestion()? (
                        question.answers.map((answer,i) => {
                            return (
                                <AnswerBubble answer={answer} key={i}/>
                            )
                        })
                    ): (
                        <div>
                            <form onSubmit={(e) => handleAnswerQuestion(e)}>
                                <label htmlFor='answer'>Answer</label>
                                <input type="textarea" value={answer} onChange={(e)=> setAnswer(e.target.value)}/>
                                <button type='submit'>Submit</button>
                            </form>
                        </div>
                        )}
                </div>
            )}
        </div>
    )
}