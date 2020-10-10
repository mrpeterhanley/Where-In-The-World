import React from "react";
import './Card.css';

function Card(props) {
    return (
        <div className="card" style={{backgroundColor: `${props.bgcolor}`}}>
            <div className="card__image" style={{backgroundImage: `url(${props.flag})`}}/>
            <div className="card__body">
                <h3 className="body__title">{props.name}</h3>
                <p className="body__item"><span className="item__title">Population:</span> {new Intl.NumberFormat().format(props.population)}</p>
                <p className="body__item"><span className="item__title">Region:</span> {props.region}</p>
                <p className="body__item"><span className="item__title">Capital:</span> {props.capital}</p>
            </div>
        </div>
    )
}

export default Card;