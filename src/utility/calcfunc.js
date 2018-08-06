// TODO: regex or substring for dragons and tomes
function getDmgType(weapon, dDef, dRes) {
    if (weapon === 'tome' || weapon === 'staff') {
        return 'res';
    } else if (weapon === 'sword' || weapon === 'lance' || weapon === 'axe' || weapon === 'dagger' || weapon === 'bow') {
        return 'def';
    } else if (weapon === 'stone' && dDef > dRes) {
        return 'res';
    } else {
        return 'def';
    }
}

// TODO: regex or substring for dragons and tomes
function getColor(weapon) {
    if (weapon === 'sword' || weapon === 'tome' || weapon === 'stone') {
        return 'red';
    } else if (weapon === 'lance' || weapon === 'tome' || weapon === 'stone') {
        return 'blue';
    } else if (weapon === 'axe' || weapon === 'tome' || weapon === 'stone') {
        return 'green';
    } else if (weapon === 'dagger' || weapon === 'bow' || weapon === 'stone' || weapon === 'staff') {
        return 'gray';
    }
}

// TODO: ally/owl buffs, marriage buffs
function getAtk(a) {
    if (a.isBlade) {
        return a.atk + (a.hones * 2) + a.spurs - a.debuffs
    }
    return atk + spurs + hones - debuffs;
}

function getEff(hasBonus) {
    if (hasBonus) {
        return 1.5;
    } else {
        return 1;
    }
}

// TODO: cancel affinity 1-3
function getAdv(a, d) {
    const aColor = getColor(a.weapon);
    const dColor = getColor(d.weapon);
    let advMult = 0; // max possible is 0.4
    let attackerAdv, defenderAdv;

    if (aColor === dColor) {
        return advMult;
    } else if ((aColor === 'red' && dColor === 'green') || (aColor === 'green' && dColor === 'blue') || (aColor === 'blue' && dColor === 'red')) {
        advMult += 0.2;
        attackerAdv = true;
    } else if ((aColor === 'red' && dColor === 'blue') || (aColor === 'green' && dColor === 'red') || (aColor === 'blue' && dColor === 'green')) {
        advMult -= 0.2;
        defenderAdv = true;
    } else if (a.isRaven && dColor === 'gray') {
        advMult += 0.2;
        attackerAdv = true;
    } else if (aColor === 'gray' && d.isRaven) {
        advMult -= 0.2;
        defenderAdv = true;
    }

    if (attackerAdv && (a.isGem || d.isGem)) {
        advMult += 0.2;
    } else if ((defenderAdv && a.isGem) || (defenderAdv && d.isGem)) {
        advMult -= 0.2;
    } else if (attackerAdv && (a.TA === 1 || d.TA === 1)) {
        advMult += 0.1;
    } else if (defenderAdv && (a.TA === 1 || d.TA === 1)) {
        advMult -= 0.1;
    } else if (attackerAdv && (a.TA === 2 || d.TA === 2)) {
        advMult += 0.15;
    } else if (defenderAdv && (a.TA === 2 || d.TA === 2)) {
        advMult -= 0.15;
    } else if (attackerAdv && (a.TA === 3 || d.TA === 3)) {
        advMult += 0.2;
    } else if (defenderAdv && (a.TA === 3 || d.TA === 3)) {
        advMult -= 0.2;
    }

    // ca1: ignore ta or gem effects
    // ca2: if disadvantage, ignore ta or gem effects, include them if advantage
    // ca3: if disadvantage
    // ta 1 => advMult = 0.1
    // ta 2 => advMult = 0.05
    // ta 3 => advMult = 0
    // but normal if advantage

    return advMult;
}

function getSpcStat(a) {
    switch (a.special) {
        case 'glowing ember':
        case 'bonfire':
        case 'ignis':
            return a.def;
        case 'chilling wind':
        case 'iceberg':
        case 'glacies':
            return a.res;
        case 'dragongaze':
        case 'draconicaura':
        case 'dragonfang':
            return a.atk;
        case 'regnalastra':
            return a.spd;
        case 'retribution':
        case 'reprisal':
        case 'vengeance':
            return a.totalHp - a.hp;
        default:
            return 0;
    }
}

function getSpcMod() {
    switch (a.special) {
        case 'glowing ember':
        case 'bonfire':
        case 'chilling wind':
        case 'iceberg':
        case 'dragongaze':
        case 'draconicaura':
        case 'retribution':
        case 'reprisal':
            return 0.3;
        case 'dragonfang':
        case 'vengeance':
            return 0.5;
        case 'ignis':
        case 'glacies':
            return 0.8;
        case 'regnalastra':
            return 0.4;
        default:
            return 0;
    }
}

function getMit(atkWeapon, d, defSpur, defFort, defDebuff, resSpur, resFort, resDebuff) {
    const dmgType = getDmgType(atkWeapon, d.def, d.res);

    if (dmgType === 'res') {
        return d.res + resSpur + resFort - resDebuff;
    } else {
        return d.def + defSpur + defFort - resDebuff;
    }
}

function getMitMod(special, defTerrain) {
    let mod = 0;

    switch (special) {
        case 'blackluna':
            mod -= 0.8;
            break;
        case 'aether':
        case 'radiantaether':
        case 'luna':
            mod -= 0.5;
            break;
        case 'newmoon':
        case 'moonbow':
            mod -= 0.3;
            break;
        default:
            mod += 0;
    }

    if (defTerrain) {
        mod += 0.3;
    }

    return mod;
}

function getOffMult(a) {
    switch (a.special) {
        case 'nightsky':
        case 'glimmer':
            return 0.5;
        case 'astra':
            return 1.5;
        default:
            return 0;
    }
}

function getOffFlat(a) {
    if (a.isWoDao || a.isWrath) {
        return 10;
    } else if (a.isWoDao && a.isWrath) {
        return 20;
    } else {
        return 0;
    }
}

function getDefMult(a, d) {
    if (a.weapon === ('tome' || 'dagger' || 'bow' || 'staff')) {
        switch (d.special) {
            case 'holyvestments':
            case 'sacredcowl':
            case 'icemirror':
                return 0.3;
            case 'aegis':
                return 0.5;
            default:
                return 0;
        }
    } else {
        switch (d.special) {
            case 'buckler':
            case 'escutcheon':
                return 0.3;
            case 'pavise':
                return 0.5;
            default:
                return 0;
        }
    }
}

function getDefFlat(d) {
    d.isShieldPulse ? 5 : 0;
}

function getDmg(atk, eff, adv, spcStat, spcMod, mit, midMod, offMult, offFlat, defMult, defFlat) {
    return Math.ceil((Math.floor((Math.floor(atk * eff) + Math.floor(Math.floor(atk * eff) * adv) + Math.floor(spcStat * spcMod) - (mit + Math.floor(mit * mitMod))) * (1 + offMult)) + offFlat) * (1 - defMult) - defFlat);
}

function getStaffDmg() {
    return 0.5;
}

// TODO: any todos listed above
// aoe specials
// healing specials
// consider special charge
// assume attacker and defender stats are objects:

// const unit = {
//     hp: 0,
//     totalHp: 0,
//     atk: 0,
//     spd: 0,
//     def: 0,
//     res: 0,
//     TA: 0,
//     weapon: '',
//     isGem: bool,
//     isRaven: bool,
//     isBrave: bool,
//     isWoDao: bool,
//     special: '',
//     specialCharge: 0,
//     isWrath: bool,
//     isShieldPulse: bool,
// }

// maybe the mod stats in another object?


// weapon types
// wo
// gem
// sweep
// wrathful
// blade
// owl
// adaptive damage
// special weapons? (prf, like merric or lyn or w/e)
    // maybe have a drop down for selecting prf weapons

// skill modifiers
// a:
    // ta
    // breath
    // counter/abilitiy to retaliate
    // flashing/heavy blade
// b:
    // breaker
    // neutralize bonus
    // fighter
    // brash ass
    // wrath/bushido
    // cancel affinity
    // crusader's ward
    // sweep
    // desperation
    // follow up ring
    // guard
    // shield pulse
    // solar brace
    // vantage
    // qr
// s:
    // deflect magic
    // deflect missle
    // deflect melee
    // heavy blade
    // flashing blade
    // brash assault
    // phantom spd
    // hardy bearing
