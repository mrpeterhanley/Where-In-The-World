import React from "react";
import { Link } from "@reach/router"
import './Card.css';

function Card(props) {
    return (
        <Link to={`/details/${props.name}`} className="card" style={{backgroundColor: `${props.bgcolor}`}}>
            <div className="card__image" style={{backgroundImage: `url(${props.flag})`}}/>
            <div className="card__body" style={{color: `${props.color}`}}>
                <h3 className="body__title">{props.name}</h3>
                <p className="body__item"><span className="item__title">Population:</span> {new Intl.NumberFormat().format(props.population)}</p>
                <p className="body__item"><span className="item__title">Region:</span> {props.region}</p>
                <p className="body__item"><span className="item__title">Capital:</span> {props.capital}</p>
            </div>
        </Link>
    )
}

export default Card;