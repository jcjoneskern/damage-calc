import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateUnitSpecial } from '../actions/unitactions';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'

import specials from '../utility/specials';
import { getFromArray } from '../utility';

class Special extends Component {
    constructor(props) {
        super(props);

        this.state = {
            special: specials[0],
            cooldown: specials[0].cooldown
        }

        this._onSelect = this._onSelect.bind(this);
        this._onCDChange = this._onCDChange.bind(this);
    }

    _onSelect(option) {
        const special = getFromArray(option.value, specials);

        this.setState({
            special,
            cooldown: special.cooldown
        }, () => this.props.updateUnitSpecial(this.props.unitType, this.state));
    }

    _onCDChange(event) {
        this.setState({
            cooldown: Number(event.target.value)
        }, () => this.props.updateUnitSpecial(this.props.unitType, this.state));
    }


    render() {
        return (
            <section className="ws special-container">
                <h3>Special</h3>
                <Dropdown
                    options={specials}
                    onChange={this._onSelect}
                    value={this.state.special}
                    placeholder="Special Type" />
                <input 
                    type="number" 
                    placeholder="0"
                    min="0"
                    max="6"
                    value={this.state.cooldown}
                    onChange={this._onCDChange}
                    />
            </section>
        );
    }
}

const mapDispatchToProps = {
    updateUnitSpecial
}

export default connect(null, mapDispatchToProps)(Special);