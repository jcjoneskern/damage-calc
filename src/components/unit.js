import React, { Component } from 'react';
import '../css/unit.css';

import BaseStats from './base';
import StatModifier from './modifier';
import Weapon from './weapon';
import Special from './special';

class Unit extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }



    // pass these all onChange functions to update the state/unit stats
    // state/unit stats get sent up using the context api ooooor just use redux
    // if defender, show retaliate checkbox
    // long term goal: marriage checkbox that adds buffs automatically
    render() {
        return (
            <section className="unit-container">
                <h2>{this.props.unitType}</h2>
                <div className="stats">
                    <BaseStats />
                    <StatModifier type="Buffs" />
                    <StatModifier type="Field Buffs" />
                    <StatModifier type="Debuffs" />
                </div>
                <div className="ws-container">
                    <Weapon />
                    <Special />
                </div>
            </section>

        );
    }

}

export default Unit;