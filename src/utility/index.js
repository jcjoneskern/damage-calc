export function getFromArray(value, array) {
    return array.find(obj => obj.value === value);
}

export const defaultUnit = {
    hp: 0,
    totalHp: 0,
    atk: 0,
    spd: 0,
    def: 0,
    res: 0,
    hones: {
        atk: 0,
        spd: 0,
        def: 0,
        res: 0,
    },
    spurs: {
        atk: 0,
        spd: 0,
        def: 0,
        res: 0,
    },
    debuffs: {
        atk: 0,
        spd: 0,
        def: 0,
        res: 0,
    },
    weapon: {
        label: 'Sword',
        value: 'sword',
        color: 'red',
        dmgType: 'def',
        adaptive: false,
        ranged: false
    },
    special: {
        value: 'nospecial',
        label: 'No Special',
        cooldown: 0,
        aoe: false,
        healing: false,
        defensive: false
    }, 
    isBlade: false,
    isRaven: false,
    isWoDao: false,
    isWrath: false,
    isShieldPulse: false,
}