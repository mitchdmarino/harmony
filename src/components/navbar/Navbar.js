import './Navbar.css'

export default function Navbar({handleTabClick}) {
    return (
        <nav className="nav">
            <div className="nav-item connect-tab" onClick={() => handleTabClick("connect")}>
                <img src="/icons/icons_connect.png" alt="connect tab icon" />
            </div>
            <div className="nav-item memories-tab" onClick={() => handleTabClick("memories")}>
                <img src="/icons/icons_memories.png" alt="connect tab icon" />
            </div>
            <div className="nav-item goals-tab" onClick={() => handleTabClick("goals")}>
                <img src="/icons/icons_goal.png" alt="connect tab icon" />
            </div>
            <div className="nav-item conflicts-tab" onClick={() => handleTabClick("conflicts")}>
                <img src="/icons/icons_conflict.png" alt="connect tab icon" />
            </div>
        </nav>
    )
}