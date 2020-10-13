import React, {useState, useEffect} from "react";
import './Main.css';
import Card from "./Card";

function Main(props) {

    const darkMode = props.mode;
    const [fullCountryList, setFullCountryList] = useState([]);
    const [displayCountryList, setDisplayCountryList] = useState([]);
    const [nameSearch, setNameSearch] = useState("");
    const [currRegion, setRegion] = useState("");

    const lightModeSearchIcon = `url(${process.env.PUBLIC_URL + "./icons/lm_search.svg"})`;
    const darkModeSearchIcon = `url(${process.env.PUBLIC_URL + "./icons/dm_search.svg"})`;

    function dropDownChange(e) {
        setRegion(e.currentTarget.value);
    }

    useEffect(() => {

        if (nameSearch.length && currRegion) {
            setDisplayCountryList(fullCountryList.filter(country => ((country.name.toLowerCase().includes(nameSearch.toLowerCase()) && (country.region === currRegion)))));
        } 
        else if (nameSearch.length) {
            setDisplayCountryList(fullCountryList.filter(country => ((country.name.toLowerCase().includes(nameSearch.toLowerCase())))));
        }
        else if (currRegion) {
            setDisplayCountryList(fullCountryList.filter(country => (country.region === currRegion)));
        } else {
            setDisplayCountryList(fullCountryList);
        }

    },[nameSearch, currRegion, setDisplayCountryList, fullCountryList])

    useEffect(() => {
        const apiUrl = `https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag`;
        
        fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => {
            setFullCountryList(data);
            setDisplayCountryList(data);
          }).catch(console.error);
          
    }, []);


    return (
        <div className="main__wrapper" style={{backgroundColor: darkMode? "var(--dm-background)" : "var(--lm-background)", color: darkMode? "var(--white)" : "var(--lm-text)"}}>
            <form>
                <input
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                className={`search__bar ${darkMode? "dark" : "light"}`} 
                type="text" 
                placeholder="Search for a country..."
                style={{backgroundImage: darkMode? darkModeSearchIcon : lightModeSearchIcon}}/>
                <select className={`drop__down ${darkMode? "dark" : "light"}`} value={currRegion} onChange={dropDownChange}>
                    <option value="">Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </form>
        
            <div className="card__wrapper" >
                
                {displayCountryList.length? displayCountryList.map((country, index) => {
                    return (
                        <Card bgcolor={darkMode? "var(--dm-element)" : "var(--white)"}
                        color={darkMode? "var(--white)" : "var(--lm-text)"} 
                        key={index} 
                        flag={country.flag} 
                        capital={country.capital} 
                        name={country.name} 
                        population={country.population}
                        region={country.region}/>
                    )
                }) : <p>Sorry! No countries found...</p>}
            </div>
            <footer>Built with &hearts; in Melbourne, Australia by Peter Hanley</footer>
        </div>
    )
}

export default Main;