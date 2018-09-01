import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/index.css'

import Unit from './components/unit';
import Results from './components/results';

import { getDmg } from './utility/calcfunc';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attacker: this.props.attacker,
      defender: this.props.defender,
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

  componentWillReceiveProps(nextProps) {
    if (this.props.attacker !== nextProps.attacker) {
      this.setState({
        attacker: nextProps.attacker
      })
    }

    if (this.props.defender !== nextProps.defender) {
      this.setState({
        defender: nextProps.defender
      })
    }
  }

  _getResults(event) {
    event.preventDefault();

    const results = getDmg(this.state.attacker, this.state.defender);

    if (!results.warning) {
      this.setState({
        calced: true,
        results
      })
    } else {
      this.setState({
        calced: false,
        results
      })
    }

  }

  // todo: reset button
  render() {
    return (
      <main>
        <div className="content">
          <header>
            <h1>Will You Survive?</h1>
          </header>
          <div className="App">
            <div id="unit-container">
              <Unit
                unitType="attacker" 
                unitStats={this.state.attacker} />
              <Unit
                unitType="defender" 
                unitStats={this.state.defender} />
            </div>
            <button onClick={this._getResults}>One will live, one will die</button>
            { 
              this.state.results.warning ?
                <p>{this.state.results.warning}</p>
                : null
            }
            <Results calced={this.state.calced} results={this.state.results} />
          </div>
        </div>
        <footer>
          <a>About</a>
        </footer>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    attacker: state.units.attacker,
    defender: state.units.defender
  }
}

export default connect(mapStateToProps)(App);
