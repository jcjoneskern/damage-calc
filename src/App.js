import React, { Component } from 'react';
import './index.css';

import Unit from './components/unit';
import Results from './components/results';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: {
        atkDmg: 0,
        defDmg: 0,
        atkFinal: 0,
        atkBase: 0,
        defFinal: 0,
        defBase: 0
      },
      calced: false
    }

    this._getResults = this._getResults.bind(this);
  }

  _getResults(event) {
    event.preventDefault();

    this.setState({
      calced: true
    })
  }

  // use context to get attacker/defender damage results? or to get attacker/defender objects and calculation happens at this level?

  render() {
    return (
      <main>
        <header>
          <h1>Will You Survive?</h1>
        </header>
        <div className="App">
          <div id="unit-container">
            <Unit unitType="Attacker" />
            <Unit unitType="Defender" />
          </div>
          <button onClick={this._getResults}>One will live, one will die</button>
          <Results calced={this.state.calced} results={this.state.results} />
        </div>
      </main>
    );
  }
}

export default App;
