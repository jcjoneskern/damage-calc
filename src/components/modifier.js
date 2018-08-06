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
                    <input type="number" placeholder="Attack" />
                    <input type="number" placeholder="Speed" />
                    <input type="number" placeholder="Defense" />
                    <input type="number" placeholder="Resistance" />
                </div>
            </section>
        );
    }

}

export default StatModifier;