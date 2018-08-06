import React, { Component } from 'react';
import './css/index.css'

import Unit from './components/unit';
import Results from './components/results';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attacker: {},
      defender: {},
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
    this.updateUnitValues = this.updateUnitValues.bind(this);
    this.updateUnitWeapon = this.updateUnitWeapon.bind(this);
    this.updateUnitSpecial = this.updateUnitSpecial.bind(this);
  }

  _getResults(event) {
    event.preventDefault();

    this.setState({
      calced: true
    })
  }

  updateUnitValues(e, unitType) {
    if (e.target.value.length >= 3) {
      return;
    }

    let newNum = Number(e.target.value);
    
    if (newNum > 99) {
      newNum = 99;
    }

    let newValue = {
      ...this.state[unitType],
      [e.target.name]: newNum
    }

    // TODO: debounce this
    if (e.target.name === 'totalHp') {
      if (this.state[unitType].hp > newNum) {
        newValue.hp = newNum
      }
    }

    if (e.target.name === 'hp') {
      if (this.state[unitType].totalHp < newNum) {
        newValue.hp = this.state[unitType].totalHp
      }
    }
    
    this.setState({
      [unitType]: newValue
    })
  }

  updateUnitWeapon(unitType, weapon) {
    let newWeapon = {
      ...this.state[unitType],
      weapon
    }

    this.setState({
     [unitType]: newWeapon
    });
  }

  updateUnitSpecial(unitType, special) {
    let newSpecial = {
      ...this.state[unitType],
      ...special
    }

    this.setState({
      [unitType]: newSpecial
    });
  }

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
                updateUnitValues={this.updateUnitValues} 
                updateUnitWeapon={this.updateUnitWeapon}
                updateUnitSpecial={this.updateUnitSpecial}
                unitType="attacker" 
                unitStats={this.state.attacker} />
              <Unit 
                updateUnitValues={this.updateUnitValues} 
                updateUnitWeapon={this.updateUnitWeapon}
                updateUnitSpecial={this.updateUnitSpecial}
                unitType="defender" 
                unitStats={this.state.defender} />
            </div>
            <button onClick={this._getResults}>One will live, one will die</button>
            <Results calced={this.state.calced} results={this.state.results} />
          </div>
        </div>
        <footer>
          <a>About</a> || <a>Contact</a>
        </footer>
      </main>
    );
  }
}

export default App;
