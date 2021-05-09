export function YoutubeEmbed({id}) {
    return (
        <div class="youtubeEmbed">
            <iframe title={id} src={"https://www.youtube.com/embed/" + id} frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
        </div>
    )
}