import React, { Component } from 'react';
import './css/index.css'

import Unit from './components/unit';
import Results from './components/results';

import { getDmg } from './utility/calcfunc';
import { defaultUnit } from './utility';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attacker: defaultUnit,
      defender: defaultUnit,
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
    this.updateUnitModifiers = this.updateUnitModifiers.bind(this);
    this.updateUnitWeapon = this.updateUnitWeapon.bind(this);
    this.updateUnitSpecial = this.updateUnitSpecial.bind(this);
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

  updateUnitModifiers(e, unitType, modifierType) {
    let newMod = {...this.state[unitType]}

    switch(modifierType) {
      case 'Buffs':
        newMod.hones = {
          ...newMod.hones,
          [e.target.name]: Number(e.target.value)
        };
        break;

      case 'Field Buffs':
        newMod.spurs = {
          ...newMod.spurs,
          [e.target.name]: Number(e.target.value)
        };
        break;

      case 'Debuffs':
        newMod.debuffs = {
          ...newMod.debuffs,
          [e.target.name]: Number(e.target.value)
        };
        break;
      
      default:
        return;
    }

    this.setState({
      [unitType]: newMod
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
                updateUnitValues={this.updateUnitValues} 
                updateUnitModifiers={this.updateUnitModifiers}
                updateUnitWeapon={this.updateUnitWeapon}
                updateUnitSpecial={this.updateUnitSpecial}
                unitType="attacker" 
                unitStats={this.state.attacker} />
              <Unit 
                updateUnitValues={this.updateUnitValues} 
                updateUnitModifiers={this.updateUnitModifiers}
                updateUnitWeapon={this.updateUnitWeapon}
                updateUnitSpecial={this.updateUnitSpecial}
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

export default App;
