import './AnswerBubble.css'
import Profile from "../../misc/Profile";

export default function AnswerBubble ({answer, orderReverse}) {
    var style = {
        justifyContent: ""
    }
    if (orderReverse === 1) {
        style = {
            flexDirection: "row-reverse"
        }
    }
    return (
        <div className="answer-bubble" style={style}>
            <div>
                <Profile user={answer.author} size="small" />
            </div>
            <div className="answer-text"><p className='spectral-400'>{answer.text}</p></div>
        </div>
    )
}