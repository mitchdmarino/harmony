import "./YinYang.css"

export default function YinYang({color1="whitesmoke", color2="black"}) {
    return (
        <div className="yinyang" style={{background:color1, borderColor:color2,}}>
            <div className="yinyang-1" style={{background:color1, borderColor:color2}}></div>
            <div className="yinyang-2" style={{background:color2, borderColor:color1}}></div>
        </div>
    )
}