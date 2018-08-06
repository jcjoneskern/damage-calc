import React from 'react';
import '../css/results.css';

function Results(props) {
    if (!props.calced) {
        return <div />
    }

    return (
        <section id="results">
            <h2>Results</h2>
            <div className="results-container">
                <div>
                    <h3>Attacker damage:</h3>
                    <p>{props.results.atkDmg}</p>
                </div>
                <div>
                    <h3>Defender damage:</h3>
                    <p>{props.results.defDmg}</p>
                </div>
                <div>
                    <h3>Final Results</h3>
                    <p>Attacker HP: {props.results.atkFinal}/{props.results.atkBase}</p>
                    <p>Defender HP: {props.results.defFinal}/{props.results.defBase}</p>
                </div>
            </div>
        </section>
    );
}


export default Results;