import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateUnitModifiers } from '../actions/unitactions';

class StatModifier extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <section className="stat-container">
                <h3>{this.props.type}</h3>
                <div className="input-container">
                    <input 
                        onChange={(e) => this.props.updateUnitModifiers(e, this.props.unitType, this.props.type)} 
                        type="number"
                        min="0"
                        name="atk"
                        placeholder="Attack" />
                    <input 
                        onChange={(e) => this.props.updateUnitModifiers(e, this.props.unitType, this.props.type)} 
                        type="number"
                        min="0" 
                        name="spd"
                        placeholder="Speed" />
                    <input 
                        onChange={(e) => this.props.updateUnitModifiers(e, this.props.unitType, this.props.type)} 
                        type="number"
                        min="0" 
                        name="def"
                        placeholder="Defense" />
                    <input 
                        onChange={(e) => this.props.updateUnitModifiers(e, this.props.unitType, this.props.type)} 
                        type="number"
                        min="0" 
                        name="res"
                        placeholder="Resistance" />
                </div>
            </section>
        );
    }
}

const mapDispatchToProps = {
    updateUnitModifiers
}

export default connect(null, mapDispatchToProps)(StatModifier);