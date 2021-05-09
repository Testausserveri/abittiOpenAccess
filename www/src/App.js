import './App.css';

import { Section } from './components/Section';
import { Authors } from './components/Authors';

import EemilAvatar from './images/avatars/eemil.png';
import RubenAvatar from './images/avatars/ruben.png';
import MikaelAvatar from './images/avatars/mikael.png';

function App() {
    return (
        <div className="App">
            <article className="center">
                <h1>Abitti Open Access</h1>
                <Section name="Introduction" />
                <hr />
                <Section name="Demo" />
                <hr />
                <Section name="Summary" />
                <hr />
                <div className="footer">
                    <Authors data={[
                        {
                            name: "Eemil",
                            avatar: EemilAvatar
                        },
                        {
                            name: "Ruben",
                            avatar: RubenAvatar
                        },
                        {
                            name: "Mikael",
                            avatar: MikaelAvatar
                        }
                    ]}
                    date="9. toukokuuta 2021" />
                    <br />
                    <p>
                        2021 &copy; Testausserveri
                    </p>
                </div>
            </article>
        </div>
    );
}

export default App;
