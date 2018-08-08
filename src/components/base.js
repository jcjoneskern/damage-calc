import React, { Component } from 'react';

class BaseStats extends Component {
    constructor(props) {
        super(props);

        this.state = {}
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
                            placeholder="Current HP" />
                        <input 
                            min="0"
                            max="99"
                            onChange={(e) => this.props.updateUnitValues(e, this.props.unitType)} 
                            type="number" 
                            name="totalHp" 
                            placeholder="Base HP" />
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

export default BaseStats;