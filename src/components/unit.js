import React, { Component } from 'react';
import '../css/unit.css';

import BaseStats from './base';
import StatModifier from './modifier';
import Weapon from './weapon';
import Special from './special';

class Unit extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <section className="unit-container">
                <h2>{this.props.unitType}</h2>
                <div className="stats">
                    <BaseStats unitStats={this.props.unitStats} unitType={this.props.unitType} updateUnitValues={this.props.updateUnitValues} />
                    <StatModifier type="Buffs" />
                    <StatModifier type="Field Buffs" />
                    <StatModifier type="Debuffs" />
                </div>
                <div className="ws-container">
                    <Weapon 
                        updateUnitWeapon={this.props.updateUnitWeapon}
                        unitType={this.props.unitType} />
                    <Special 
                        updateUnitSpecial={this.props.updateUnitSpecial}
                        unitType={this.props.unitType} />
                </div>
            </section>

        );
    }

}

export default Unit;