import { SET_WEAPON, SET_MODIFIERS, SET_STATS, SET_SPECIAL } from './types';

export function updateUnitValues(e, unitType) {
    return {
        type: SET_STATS,
        e,
        unitType
    }
}

export function updateUnitModifiers(e, unitType, modifierType) {
    return {
        type: SET_MODIFIERS,
        e,
        unitType,
        modifierType
    }
}

export function updateUnitWeapon(weapon, unitType) {
    return {
        type: SET_WEAPON,
        weapon,
        unitType
    }
}

export function updateUnitSpecial(special, unitType) {
    return {
        type: SET_SPECIAL,
        special,
        unitType
    }
}