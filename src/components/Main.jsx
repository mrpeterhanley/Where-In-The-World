import React, {useState, useEffect} from "react";
import './Main.css';
import Card from "./Card";

function Main(props) {

    const darkMode = props.mode;
    
    const [countryList, setCountryList] = useState([]);

    useEffect(() => {
        
        const apiUrl = `https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag`;
        
        fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => {
            setCountryList(data);
          });
    }, [setCountryList]);

    return (
        <div className="card__wrapper" style={{backgroundColor: darkMode? "var(--dm-background)" : "var(--lm-background)", color: darkMode? "var(--white)" : "var(--lm-text)"}}>
            
            {countryList.map((country, index) => {
                return (
                    <Card bgcolor={darkMode? "var(--dm-element)" : "var(--white)"} 
                    key={index} 
                    flag={country.flag} 
                    capital={country.capital} 
                    name={country.name} 
                    population={country.population}
                    region={country.region}/>
                )
            })}
        </div>
    )
}

export default Main;