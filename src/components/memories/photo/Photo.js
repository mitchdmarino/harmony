import './Photo.css'
export default function Photo ({image}) {
    return (
        <div className="photo">
            <img src={image} alt="your uploaded memory" />
        </div>
    )
} 