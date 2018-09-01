import { SET_WEAPON, SET_MODIFIERS, SET_STATS, SET_SPECIAL } from '../actions/types';
import { defaultUnit } from '../utility';

const initialState = {
    attacker: defaultUnit,
    defender: defaultUnit
}

export default function(state = initialState, action) {
    let newState;

    switch (action.type) {
        case SET_STATS:
            if (action.e.target.value.length >= 3) {
                return;
            }

            let newNum = Number(action.e.target.value);

            if (newNum > 99) {
                newNum = 99;
            }

            let newValue = {
                ...state[action.unitType],
                [action.e.target.name]: newNum
            }

            // TODO: debounce this
            if (action.e.target.name === 'totalHp') {
                if (state[action.unitType].hp > newNum) {
                    newValue.hp = newNum
                }
            }

            if (action.e.target.name === 'hp') {
                if (state[action.unitType].totalHp < newNum) {
                    newValue.hp = state[action.unitType].totalHp
                }
            }

            newState = Object.assign({}, state, {
                [action.unitType]: newValue
            })

            return newState;
        case SET_MODIFIERS:
            let newMod = { ...state[action.unitType] }

            switch (action.modifierType) {
                case 'Buffs':
                    newMod.hones = {
                        ...newMod.hones,
                        [action.e.target.name]: Number(action.e.target.value)
                    };
                    break;

                case 'Field Buffs':
                    newMod.spurs = {
                        ...newMod.spurs,
                        [action.e.target.name]: Number(action.e.target.value)
                    };
                    break;

                case 'Debuffs':
                    newMod.debuffs = {
                        ...newMod.debuffs,
                        [action.e.target.name]: Number(action.e.target.value)
                    };
                    break;

                default:
                    return;
            }

            newState = Object.assign({}, state, {
                [action.unitType]: newMod
            })

            return newState;
        case SET_WEAPON:
            let newWeapon = {
                ...state[action.unitType],
                [action.weapon]: action.weapon
            }

            newState = Object.assign({}, state, {
                [action.unitType]: newWeapon
            })

            return newState;
        case SET_SPECIAL:
            let newSpecial = {
                ...state[action.unitType],
                ...[action.special]
            }

            newState = Object.assign({}, state, {
                [action.unitType]: newSpecial
            })

            return newState;
        default:
            return state;
    }
}