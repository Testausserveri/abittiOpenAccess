export function TimeHeading({data}) {
    const {title, time, description} = data;
    return (
        <div className="timeHeading">
            <h3>
                <span className="time">{time}</span> {title} 
            </h3>
            <span className="description">
                {description}
            </span>
        </div>
    );
}