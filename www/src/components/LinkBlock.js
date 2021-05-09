export function LinkBlock({data}) {
    const {title, icon, siteName, date, url} = data;
    return (
        <a href={url} className="linkBlock" target="_blank" rel="noreferrer">
            <span>{title} {date ? <span className="date">{date}</span> : ''}</span>
            <span>
                <img src={icon} alt={siteName} />
                {siteName}
            </span>
        </a> 
    );
}