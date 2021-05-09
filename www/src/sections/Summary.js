import { LinkBlock } from '../components/LinkBlock';

import GitHubIcon from '../images/GitHub.png';
import YTLIcon from '../images/YTL.png';

export default function Summary() {
    return (
        <div>
            <h2>Yhteenveto</h2>
            <p>
                Haluamme kiittää ylioppilastutkintolautakuntaa hyvin asiallisesta tietoturvailmoituksen käsittelystä ja ripeästä toiminnasta. He ovat hoitaneet tapauksen mallikkaasti sisäisesti ja ulkoisesti. Etenkin hyvänä yksityiskohtana haluamme tuoda esiin huolellisesti suunnitellun julkaisuaikataulun tekemist korjausta varten, jossa otettiin huomioon erilaisia vaihtoehtoja huomioimalla niiden uhat ja edut.
            </p>

            <h3>Haavoittuvuuden lähdekoodi</h3>
            <p>
                Hyökkäyksen suorittamiseen tarvittava koodi on saatavilla täältä: 
            </p>
            <LinkBlock data={{
                icon: GitHubIcon,
                url: "https://github.com/Testausserveri/abittiOpenAccess",
                siteName: "GitHub",
                title: "Testausserveri/\nabittiOpenAccess"
            }}/>
            <p>
                Haavoittuvuuden vaiheita voit kokeilla viimeisimmällä toimivalla kokelaan tikun versiolla ABITTI2106S (tai vanhemmat, 1.10.2019 asti) ja palvelimen tikun versiolla SERVER21066 (tai vanhemmat, 1.10.2019 asti). Tämä haavoittuvuus on korjattu viime päivityksissä, joten sen testaaminen oikeissa koetilanteessa on turhaa ja voi pahimmillaan johtaa jopa kahden vuoden vankeustuomioon (ks. RL 38:7 a § ja 8 §).
            </p>

            <p>
                Lue Ylioppilastutkintolautakunnan katsaus tästä haavoittuvuussarjasta seuraavasta blogiartikkelista, sekä sen tietoturvakäytännöistä ja vapaaehtoisten tietoturvaraporttien tärkeydestä: 
            </p>
            <LinkBlock data={{
                icon: YTLIcon,
                url: "https://www.abitti.fi/blogi/2021/05/abitista-on-korjattu-kaksi-tietoturvahaavoittuvuutta/",
                siteName: "Abitti",
                title: "Abitista on korjattu kaksi tietoturvahaavoittuvuutta",
                date: "6.5.2021"
            }}/>
        </div>
    );
}