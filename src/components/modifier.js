import React, { Component } from 'react';

class StatModifier extends Component {
    constructor(props) {
        super(props);

        this.state = {
            atk: 0,
            spd: 0,
            def: 0,
            res: 0
        }
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

export default StatModifier;