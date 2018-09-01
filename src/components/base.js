import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateUnitValues } from '../actions/unitactions';

class BaseStats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
            <section className="stat-container">
                <h3>Base Stats</h3>
                <div className="input-container">
                    <div className="hp-container">
                        <input 
                            min="0" 
                            max={this.props.unitStats.totalHp}
                            onChange={(e) => this.props.updateUnitValues(e, this.props.unitType)} 
                            type="number" 
                            name="hp" 
                            placeholder="Current HP"
                            value={this.props.unitStats.hp} />
                        <input 
                            min="0"
                            max="99"
                            onChange={(e) => this.props.updateUnitValues(e, this.props.unitType)} 
                            type="number" 
                            name="totalHp" 
                            placeholder="Base HP"
                            value={this.props.unitStats.totalHp} />
                    </div>
                    <input 
                        min="0" 
                        max="99" 
                        onChange={(e) => this.props.updateUnitValues(e, this.props.unitType)} 
                        type="number" 
                        name="atk" 
                        placeholder="Attack" />
                    <input 
                        min="0" 
                        max="99" 
                        onChange={(e) => this.props.updateUnitValues(e, this.props.unitType)} 
                        type="number" 
                        name="spd" 
                        placeholder="Speed" />
                    <input 
                        min="0" 
                        max="99" 
                        onChange={(e) => this.props.updateUnitValues(e, this.props.unitType)} 
                        type="number" 
                        name="def" 
                        placeholder="Defense" />
                    <input 
                        min="0" 
                        max="99" 
                        onChange={(e) => this.props.updateUnitValues(e, this.props.unitType)} 
                        type="number" 
                        name="res" 
                        placeholder="Resistance" />
                </div>
            </section>
        );
    }

}

const mapDispatchToProps = {
    updateUnitValues
}

export default connect(null, mapDispatchToProps)(BaseStats);