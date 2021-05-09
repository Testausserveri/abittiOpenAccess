export function TimeHeading({data}) {
    const {title, time, description} = data;
    return (
        <div className="timeHeading">
            <h3>
                {time ? <span className="time">{time}</span> : ''} {title} 
            </h3>
            { description ?
            <span className="description">
                {description}
            </span>
            : ''}
        </div>
    );
}