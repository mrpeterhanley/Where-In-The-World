import React, {useState, useEffect} from "react";
import './Main.css';
import Card from "./Card";

function Main(props) {

    const darkMode = props.mode;
    const [countryList, setCountryList] = useState([]);
    const [nameSearch, setNameSearch] = useState("");

    const lightModeSearchIcon = `url(${process.env.PUBLIC_URL + "./icons/lm_search.svg"})`;
    const darkModeSearchIcon = `url(${process.env.PUBLIC_URL + "./icons/dm_search.svg"})`;

    useEffect(() => {
        
        const apiUrl = function() {
            if (!nameSearch.length) {
                return `https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag`;
            } else {
                return `https://restcountries.eu/rest/v2/name/${nameSearch}?fields=name;population;region;capital;flag`;
            }
        }
        
        fetch(apiUrl())
          .then((res) => res.json())
          .then((data) => {
            setCountryList(data);
          }).catch(console.error);
    }, [setCountryList, nameSearch]);

    return (
        <div className="main__wrapper" style={{backgroundColor: darkMode? "var(--dm-background)" : "var(--lm-background)", color: darkMode? "var(--white)" : "var(--lm-text)"}}>
            <input
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            className={`search__bar ${darkMode? "dark" : "light"}`} 
            type="text" 
            placeholder="Search for a country..."
            style={{backgroundImage: darkMode? darkModeSearchIcon : lightModeSearchIcon, backgroundColor: darkMode? "var(--dm-element)" : "var(--white)", color: darkMode? "var(--white)" : "var(--lm-text)"}}/>
            <div className="card__wrapper" >
                
                {countryList.length? countryList.map((country, index) => {
                    return (
                        <Card bgcolor={darkMode? "var(--dm-element)" : "var(--white)"} 
                        key={index} 
                        flag={country.flag} 
                        capital={country.capital} 
                        name={country.name} 
                        population={country.population}
                        region={country.region}/>
                    )
                }) : <p>Sorry! No countries found...</p>}
            </div>
        </div>
    )
}

export default Main;