import "./YinYang.css"

export default function YinYang({color1="whitesmoke", color2="black", size="large"}) {
    var style = {
        parent: {
            background: color1,
            borderColor: color2,
            width: 90,
            height: 180,
            borderWidth: "5px 90px 5px 5px",
        }, 
        child1: {
            background: color1,
            borderColor: color2,
            borderWidth: 35,
            width: 20,
            height: 20,
        },
        child2: {
            background: color2,
            borderColor: color1,
            borderWidth: 35,
            width: 20,
            height: 20,
        }
    }
    if (size==="small") {
        style.parent.width = 22.5
        style.parent.height = 45
        style.parent.borderWidth = "1.25px 22.5px 1.25px 1.25px"
        style.child1.width = 5
        style.child1.height = 5
        style.child1.borderWidth = "8.75px"
        style.child2.width = 5
        style.child2.height = 5
        style.child2.borderWidth = "8.75px"
    }
    else if (size==="loading") {
        style.parent.width = 11.25
        style.parent.height = 22.5
        style.parent.borderWidth = "0.625px 11.25px 0.625px 0.625px"
        style.child1.width = 2.5
        style.child1.height = 2.5
        style.child1.borderWidth = "4.375px"
        style.child2.width = 2.5
        style.child2.height = 2.5
        style.child2.borderWidth = "4.375px"
    }
    return (
        <>
        <div className="yinyang" style={style.parent}>
            <div className="yinyang-1" style={style.child1}></div>
            <div className="yinyang-2" style={style.child2}></div>
        </div>
            {size==="loading" ? <p className="loading">Loading</p> : ""}
        </>
        
    )
}