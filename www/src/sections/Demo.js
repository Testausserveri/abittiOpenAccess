import { YoutubeEmbed } from '../components/YoutubeEmbed';
import { TimeHeading } from '../components/TimeHeading';

import { CodeBlock, dracula } from "react-code-blocks";

export default function Demo() {
    return (
        <div>
            <h2>Demonstraatio ja rekonstruktio</h2>
            <YoutubeEmbed id="5K0nhE_ukH4" />

            <TimeHeading data={{
                title: "Valmistelu",
                time: "0:00 - 0:21",
                description: "Kokelastikun konfiguroiminen ja liittyminen kokeeseen"
            }}/>
            <p>
                Kokelastikun ABITTI2106S levykuvaan on tehty muokkauksia, jotka sallivat pääsyn komentokehotteeseen ja ujuttamaan tiedostojärjestelmään tarvittavat skriptimme. Muutokset tekee videolla hetkellisesti esitelty AntiBitti-työkalumme.
            </p>

            <TimeHeading data={{
                title: "SSRF",
                time: "0:26 - 0:27",
                description: "Palauta myrkyllinen vastaus koetilan palvelimelle"
            }}/>
            <p>
                Koetilan palvelin tiedustelee kaikilta kokelaslaitteilta dataa 20 - 30 minuutin välein. Korvaamme kokelaslaitteen vastauspalvelimen omalla muokatulla palvelimella “nsamock.js”, jolla voimme itse määrittää koetilan palvelimelle annetun vastauksen. Tätä hyökkäystekniikkaa kutsutaan nimellä “Server Side Request Forgery” (SSRF), jota voisi suomeksi luonnehtia palvelinpuolen pyynnön väärentämiseksi.
            </p>
            <p>
                Vastaamme koetilan palvelimen NSA-palvelun (kokeen valvontapalvelu) pyyntöön haavoittuvuusketjun laukaisevalla vastauksella, joka avaa ovet hyökkäyksen seuraaville vaiheille:
            </p>
            <CodeBlock
                text="HTTP/1.1 307 Temporary Redirect
Location: http://127.0.0.1:8021/start-answer-downloader/%22%22%20%26%20mkdir.."
                language="text"
                showLineNumbers={false}
                theme={dracula}
                customStyle={{borderRadius: "10px"}}
            />;
            <br />

            <TimeHeading data={{
                title: "Command Injection",
                time: "0:28 - 0:29",
                description: "Palomuurin ohitus ja etäyhteyden avaaminen"
            }}/>
            <p>
                Edellisessä vaiheessa palautimme koetilan palvelimella toimivalle NSA-palvelulle vastauksen, jonka HTTP-statuskoodina oli 307. Tämä koodi pyytää koetilan palvelimen HTTP-asiakasohjelman uudelleenohjaamaan pyyntönsä toiseen osoitteeseen. Annettu osoite on koetilan palvelimella käynnissä olevan palvelun osoite, joka on eristetty palomuurilla muilta kuin palvelimelta itseltään. Ohjaamme siis koetilan palvelimen tekemään pyynnön itseelleen ja muokkaamme samalla pyynnön osoitetta. Palomuuri ohitettu.
            </p>
            <p>
                Koetilan palvelimelle annettu uudelleenohjaus sen aikaisemmalle pyynnölle ohjautuu tarkoin valittuun osoitteeseen: yhteen sen sisäiseen web-palvelimeen, joka on haavoittuvainen “Shell injection”-hyökkäykselle:
            </p>
            <CodeBlock
                text={`router.post('/start-answer-downloader/:answersFilename', (req, res, next) =>
    createAnswersZip()
    .then(zip => fs.writeFileAsync(tmpAnswersPackageFile, zip))
    .then(() => {
        if (config.isProd) {
            childProcess.exec(
                \`/usr/bin/sudo -u digabi /usr/local/bin/digabi-download-progress
                \${tmpAnswersPackageFile} \${req.params.answersFilename}\`
            )
        }
    })
    .then(() => res.json({ useDevModeAnswerDownloading: !config.isProd }))
    .catch(next)
)`}
                language="js"
                showLineNumbers={false}
                theme={dracula}
                highlight="6-9"
                customStyle={{borderRadius: "10px"}}
            />;
            <p>
                Polun “/start-answer-downloader/:answersFilename”-metodin alkuperäinen tarkoitus on toimia tapana kokeen järjestäjälle ladata kokeen vastauksia USB-tikulle tai johonkin muuhun järjestelmän sijaintiin. Tämän takia videolla hyökkäyksen tässä vaiheessa ilmestyy “valitse sijanti”-ikkuna. Tämä ikkuna olisi kuitenkin todella helppoa piilottaa.
            </p>
            <p>
                Tutkiessa ylhäällä olevaa koodia tarkemmin voi helposti huomata selkeän “Shell injection”-haavoittuvuuden, kohdassa jossa “req.params.answersFilename” lisätään suoraan komentoriville. Käyttäjän syötettä ei tarkisteta tai sanitoida lainkaan.
            </p>
            <p>
                Pääkäyttäjän oikeudet saa koetila-käyttäjältä (jolla Shell injection koodia ajetaan) helposti,
                hyödyntämällä virhettä Abitin sudo-asetuksissa. Koetila-käyttäjä saa ajaa pääkäyttäjänä vain muutaman ohjelman, esimerkiksi sijainnissa
                /tmp/ktp-update-work/ktp-update.sh olevan skriptin. Koetila-käyttäjä voi kuitenkin myös kirjoittaa tähän tiedostoon täysin vapaasti, näin antaen meille helpon tavan saavuttaa pääkäyttäjän oikeudet.
            </p>
            <p>
                Lähetetyssä komennossa on kaksi keskeistä osaa:
            </p>
            <ol>
                <li>
                    Ensimmäinen rivi avaa kaiken liikenteen Abitin koetilan palvelimelle ja siltä ulos. Teknisesti puhuen se tyhjentää palomuurin asetukset, näin sallien kaiken liikenteen.
                </li>
                <li>
                    Toinen rivi luo etäyhteyden, jonka avulla voi kätevästi lähettää komentoja koetilan palvelimelle. Se luo ja käynnistää Node.js:llä kirjoitetun TCP Socket-pohjaisen RCE-palvelimen (Remote Code Execution, eli komentojen suoritus etänä).
                </li>
            </ol>

            <TimeHeading data={{
                title: "RCE",
                time: "0:29 - 0:55",
                description: "Etäyhteyden asiakasohjelman suorittaminen hyökkääjän laitteella"
            }}/>
            <p>
                Hyökkääjän laitteella avataan aikaisemmin käynnistetyn RCE-palvelimen asiakasohjelma “nclient.js”. Tämä ohjelma toimii käytännössä samalla tavalla kuin SSH ja omaa kaikki pääkäyttäjän luvat ajaa koodia koetilan palvelimella.
            </p>
            <p>
                Videossa demonstroidaan etäyhteyttä useaan otteeseen, esimerkiksi avaamalla koetilan palvelimen ruudulle uuden selainvälilehden Firefoxissa, uuden muistion, sekä lopuksi välittömästi sammuttamalla koetilan palvelimen. 
            </p>
            <p>
                Pääkäyttäjän oikeudet kuitenkin mahdollistavat paljon vakavampia kokeen valvonnalta piilossa olevia toimia. Se mahdollistaa kaikenlaisen koetilanteen häirinnän, tallenteiden lukemisen, muokkaamisen ja poistamisen. Pääkäyttäjän oikeudet koetilan palvelimella antavat myös paljon mahdollisuuksia muiden sen verkossa olevien Abitti-koneiden kaappaamiseksi, joka vaarantaa myös kokelaiden henkilökohtaisten tietojen turvallisuuden heidän koneillaan, vaikka Abitissa koneiden tallennustila ei olisi kokelaille tavallisesti näkyvissä, sillä pääkäyttäjänä voimme päästä levyihin käsiksi vapaasti.
            </p>
        </div>
    );
}