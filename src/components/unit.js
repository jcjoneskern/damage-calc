import React, { Component } from 'react';
import '../css/unit.css';

import { updateUnitWeapon, updateUnitSpecial } from '../actions/unitactions';

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
                    <BaseStats 
                        unitStats={this.props.unitStats} 
                        unitType={this.props.unitType} />
                    <StatModifier 
                        unitType={this.props.unitType} 
                        type="Buffs" />
                    <StatModifier 
                        unitType={this.props.unitType} 
                        type="Field Buffs" />
                    <StatModifier 
                        unitType={this.props.unitType} 
                        type="Debuffs" />
                </div>
                <div className="ws-container">
                    <Weapon 
                        unitType={this.props.unitType} />
                    <Special 
                        unitType={this.props.unitType} />
                </div>
            </section>

        );
    }
}

export default Unit;