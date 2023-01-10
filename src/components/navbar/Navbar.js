import './Navbar.css'

export default function Navbar({handleTabClick}) {
    return (
        <nav className="nav">
            <div className="nav-item" onClick={() => handleTabClick("connect")}>
                <p>Connect</p>
            </div>
            <div className="nav-item" onClick={() => handleTabClick("memories")}>
                <p>Memories</p>
            </div>
            <div className="nav-item" onClick={() => handleTabClick("goals")}>
                <p>Goals</p>
            </div>
            <div className="nav-item" onClick={() => handleTabClick("conflicts")}>
                <p>Conflicts</p>
            </div>
        </nav>
    )
}