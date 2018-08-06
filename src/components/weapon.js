import React, { Component } from 'react';
import weapons from '../utility/weapons';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'

class Weapon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weapon: weapons[0]   
        }

        this._onSelect = this._onSelect.bind(this);
    }

    _onSelect(option) {
        this.setState({
            weapon: option
        })
    }

    // make effectiveness bonus a checkbox
    // if staff, show checkboxes for wrathful/dazzling
    // if adaptive, show checkbox
    // dropdown for prf weapons with special abilities
    // if weapon can have some attribute (brave, ta, etc) show radio buttons
    render() {
        return (
            <section className="ws weapon-container">
                <h3>Weapon</h3>
                <Dropdown 
                    options={weapons} 
                    onChange={this._onSelect} 
                    value={this.state.weapon}
                    placeholder="Weapon Type" />
            </section>
        );
    }

}

export default Weapon;