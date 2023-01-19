import Profile from "../../misc/Profile";

export default function AnswerBubble ({answer}) {
    return (
        <div className="answer-bubble">
            <Profile user={answer.author} />
            <p>{answer.text}</p>
        </div>
    )
}