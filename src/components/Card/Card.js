import "./Card.css";

function Card({ title, value, color = "var(--primary)" }) {

    return (
        <div className="card">
            <div className="card-color" style={{ backgroundColor: color }}>
        </div>

            <div className="card-content">
                <h4>{title}</h4>
                <h2>{value}</h2>
            </div>
        </div>
    );
}

export default Card;