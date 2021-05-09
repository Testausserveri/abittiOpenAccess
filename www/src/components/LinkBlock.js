export function LinkBlock({data}) {
    const {title, icon, siteName, date} = data;
    return (
        <div className="linkBlock">
            <span>{title} {date ? <span className="date">{date}</span> : ''}</span>
            <span>
                <img src={icon} alt={siteName} />
                {siteName}
            </span>
        </div> 
    );
}