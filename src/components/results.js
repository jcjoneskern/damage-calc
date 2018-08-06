import React from 'react';

function Results(props) {
    if (!props.calced) {
        return <div />
    }

    return (
        <section>
            <h3>Results</h3>
            <h4>Attacker damage:</h4>
            <p>{props.results.atkDmg}</p>
            <h4>Defender damage:</h4>
            <p>{props.results.defDmg}</p>
            <h4>Final Results</h4>
            <p>Attacker HP: {props.results.atkFinal}/{props.results.atkBase}</p>
            <p>Defender HP: {props.results.defFinal}/{props.results.defBase}</p>
        </section>
    );
}


export default Results;