export default function Introduction() {
    return (
        <div>
            <p>
                Ilmoitimme Ylioppilastutkintolautakunnalle keväällä 2021 lukuisista haavoittuvuuksista Abitti-koejärjestelmästä. Haavoittuvuussarja antoi hyökkääjälle täyden pääsyn koetilan palvelimelle ja jokaiseen siihen yhdistäneeseen kokelaan tietokoneeseen pääkäyttäjänä. Haavoittuvuudet koskettivat kaikkia Suomen lukioita ja sähköisiä ylioppilaskirjoituksia. Alttiina lukemiselle, muokkaamiselle, poistamiselle, ja häiriköinnille olivat muun muassa:
            </p>
            <ul>
                <li>Tietokannat
                    <ul>
                        <li>Kaikkien kokelaiden henkilötiedot, ml. henkilötunnukset</li>
                        <li>Kokeet</li>
                        <li>Kokelaiden vastaukset</li>
                    </ul>
                </li>
                <li>Koetilan palvelin
                    <ul>
                        <li>Sammuttaminen, häiriköiminen, etäohjaaminen pääkäyttäjänä</li>
                    </ul>
                </li>
                <li>Kokelaiden tietokoneet
                    <ul>
                        <li>Tietokoneen muut levyt, ml. ensisijaisen käyttöjärjestelmän levyosio</li>
                        <li>Sammuttaminen, häiriköiminen, etäohjaaminen pääkäyttäjänä</li>
                    </ul>
                </li>
            </ul>
            <p>
                Näihin kaikkiin oli saatavilla täysi pääsy täysillä pääkäyttäjän oikeuksilla langattoman verkon ylitse. Mahdollinen tietovuoto olisi voinut olla hyvin vakava ja sisältää suuria määriä kokelaiden arkaluontoistakin dataa. Puhumattakaan vilpin ja koetilanteen häiriköinnin mahdollisuudesta.
            </p>
            <p>
                Tämä kaikki löydettiin noin kolmen kuukauden tiimityön ja lukuisten Abitin lähdekoodin parissa vietettyjen tuntien ansiosta. Nyt kuitenkin pääsemme jakamaan työmme tuloksia ja olemme tästä yhtä innoissamme kuin tekin :)
            </p>
            <p>
                <i>Haavoittuvuuden hyödyntämiseen tarkoitettu koodi on tämän postauksen lopussa ;)</i>
            </p>
        </div>

    )
};