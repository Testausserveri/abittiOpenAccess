import './App.css';

import { Section } from './components/Section';

function App() {
    return (
        <div className="App">
            <article className="center">
                <h1>Abitti OpenAccess</h1>
                <Section name="Introduction" />
                <hr />
                <Section name="Demo" />
                <hr />
                <Section name="Summary" />
                <hr />
                <div className="footer">
                    <p>
                        2021 &copy; Testausserveri
                    </p>
                </div>
            </article>
        </div>
    );
}

export default App;
