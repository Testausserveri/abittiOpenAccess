export function Authors({data, date}) {
    return (
        <div className="authors">
            <div className="avatars">
                {data.map(author => (
                    <img key={"avatar" + author.name} src={author.avatar} alt={author.name} />
                ))}
            </div>
            <div className="text">
                <span>{data.map(author => author.name).join(', ')}</span>
                <span>{date}</span>
            </div>
        </div>
    )
}