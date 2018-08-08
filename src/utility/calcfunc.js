export function getDmg(attacker, defender) {
    let attackerHp = attacker.hp;
    let defenderHp = defender.hp;
    let attackerCd = attacker.cooldown;
    let defenderCd = defender.cooldown;

    const attackerAtk = getAtk(attacker);
    const attackerEff = getEff(attacker.bonus);
    const attackerAdv = getAdv(attacker, defender);
    const attackerSpcStat = getSpcStat(attacker);
    let attackerSpcMod = getSpcMod(attacker.special.value, attackerCd);
    const attackerMit = getMit(attacker.weapon.dmgType, defender); // TODO: adaptive
    const attackerMitMod = getMitMod(attacker.special.value, attacker.defTerrain);
    const attackerOffMult = getOffMult(attacker.special.value);
    const attackerOffFlat = getOffFlat(attacker);
    const attackerDefMult = getDefMult(attacker, defender);
    const attackerDefFlat = getDefFlat(attacker);

    const defenderAtk = getAtk(defender);
    const defenderEff = getEff(attacker.bonus);
    const defenderAdv = getAdv(defender, attacker);
    const defenderSpcStat = getSpcStat(defender);
    let defenderSpcMod = getSpcMod(defender.special.value, defenderCd);
    const defenderMit = getMit(defender.weapon.dmgType, attacker); // TODO: adaptive
    const defenderMitMod = getMitMod(defender.special.value, defender.defTerrain);
    const defenderOffMult = getOffMult(defender.special.value);
    const defenderOffFlat = getOffFlat(defender);
    const defenderDefMult = getDefMult(defender, attacker);
    const defenderDefFlat = getDefFlat(defender);

    if (attacker.hp > 0 && defender.hp > 0) {
        let attackerDamage = damageCalc(attackerAtk, attackerEff, attackerAdv, attackerSpcStat, attackerSpcMod, attackerMit, attackerMitMod, attackerOffMult, attackerOffFlat, defenderDefMult, defenderDefFlat);

        if (attacker.weapon.value === 'staff') {
            attackerDamage *= 0.5;
        }
        // defender lived
        if (attackerDamage < defender.hp) {
            let defenderDamage = damageCalc(defenderAtk, defenderEff, defenderAdv, defenderSpcStat, defenderSpcMod, defenderMit, defenderMitMod, defenderOffMult, defenderOffFlat, attackerDefMult, attackerDefFlat);

            if (defender.weapon.value === 'staff') {
                attackerDamage *= 0.5;
            }

            // attacker lived
            if (defenderDamage < attacker.hp) {
                attackerCd -= 1;
                defenderCd -= 1;

                if (attacker.spd - defender.spd >= 5) {

                // defender follows up
                } else if (defender.spd - attacker.spd >= 5) {
                    // change cd

                // neither follows up
                } else {
                    return {
                        atkDmg: attackerDamage,
                        defDmg: defenderDamage,
                        atkFinal: attacker.hp - defenderDamage,
                        atkBase: attacker.totalHp,
                        defFinal: defender.hp - attackerDamage,
                        defBase: defender.totalHp
                    }
                }
            // attacker died
            } else {
                return {
                    atkDmg: attackerDamage,
                    defDmg: defenderDamage,
                    atkFinal: 0,
                    atkBase: attacker.totalHp,
                    defFinal: defender.hp - attackerDamage,
                    defBase: defender.totalHp
                }
            }
        // defender died
        } else {
            return {
                atkDmg: attackerDamage,
                defDmg: 0,
                atkFinal: attacker.hp,
                atkBase: attacker.totalHp,
                defFinal: 0,
                defBase: defender.totalHp
            }
        }
    } else {
        return {
            warning: "they're already dead!"
        }
    }
}

function damageCalc(atk, eff, adv, spcStat, spcMod, mit, mitMod, offMult, offFlat, defMult, defFlat) {
    return Math.ceil((Math.floor((Math.floor(atk * eff) + Math.floor(Math.floor(atk * eff) * adv) + Math.floor(spcStat * spcMod) - (mit + Math.floor(mit * mitMod))) * (1 + offMult)) + offFlat) * (1 - defMult) - defFlat);
}

function getAtk(unit) {
    if (unit.isBlade) {
        let totalHones = Object.values(unit.hones).reduce((a, b) => a + b, 0);
        totalHones += unit.hones.atk;

        return unit.atk + totalHones + unit.spurs.atk - unit.debuffs.atk;
    }

    return unit.atk + unit.spurs.atk + unit.hones.atk - unit.debuffs.atk;
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
    const aColor = a.weapon.color;
    const dColor = d.weapon.color;
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

    // if (attackerAdv && (a.isGem || d.isGem)) {
    //     advMult += 0.2;
    // } else if ((defenderAdv && a.isGem) || (defenderAdv && d.isGem)) {
    //     advMult -= 0.2;
    // } else if (attackerAdv && (a.TA === 1 || d.TA === 1)) {
    //     advMult += 0.1;
    // } else if (defenderAdv && (a.TA === 1 || d.TA === 1)) {
    //     advMult -= 0.1;
    // } else if (attackerAdv && (a.TA === 2 || d.TA === 2)) {
    //     advMult += 0.15;
    // } else if (defenderAdv && (a.TA === 2 || d.TA === 2)) {
    //     advMult -= 0.15;
    // } else if (attackerAdv && (a.TA === 3 || d.TA === 3)) {
    //     advMult += 0.2;
    // } else if (defenderAdv && (a.TA === 3 || d.TA === 3)) {
    //     advMult -= 0.2;
    // }

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
    switch (a.special.value) {
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

function getSpcMod(special, cooldown) {
    if (cooldown === 0) {
        switch (special) {
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
    } else {
        return 0;
    }
}

function getMit(dmgType, d) {
    // TODO: adaptive damage

    if (dmgType === 'res') {
        return d.res + d.spurs.res + d.hones.res - d.debuffs.res;
    } else {
        return d.def + d.spurs.def + d.hones.def - d.debuffs.def;
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

function getOffMult(special) {
    switch (special) {
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
    if (d.cooldown === 0) {
        if (a.weapon.ranged) {
            switch (d.special.value) {
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
            switch (d.special.value) {
            case 'buckler':
            case 'escutcheon':
                return 0.3;
            case 'pavise':
                return 0.5;
            default:
                return 0;
            }
        }
    } else {
        return 0;
    }
}

function getDefFlat(d) {
    return d.isShieldPulse && d.special.defensive ? 5 : 0;
}

// TODO: any todos listed above
// aoe specials
// healing specials
// consider special charge
// handle ice mirror correctly on retaliation
// make attack function

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
    // fury
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
