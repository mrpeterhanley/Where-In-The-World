import React, {useState, useEffect} from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from "@reach/router"
import "./Details.css";

const Details = (props) => {

  const darkMode = props.mode;
  const [countryDetails, setCountryDetails] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [borderCountries, setBorderCountries] = useState([]);
  const [borderCountryDetails, setBorderCountryDetails] = useState([]);

  function printBorderCountryButton(country) {

    return (
      <Link style={{backgroundColor: darkMode? "var(--dm-element)" : "var(--white)", color: darkMode? "var(--white)" : "var(--lm-text)"}} to={`/details/${country.name}`} key={country.alpha3Code} className="border__button">{country.name}</Link>
    )
  }

  useEffect(() => {

    let countriesList = "";

    if (borderCountries.length) {

      borderCountries.forEach((country) => (countriesList += `${country};`));
      const apiUrl = `https://restcountries.eu/rest/v2/alpha?codes=${countriesList}`;
      
      fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setBorderCountryDetails(data)
  
      }).catch(console.error);
    }

  }, [borderCountries, setBorderCountryDetails]);


  useEffect(() => {
    const apiUrl = `https://restcountries.eu/rest/v2/name/${props.name}?fullText=true`;
    
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setCountryDetails(data[0])
        setCurrencies(data[0].currencies)
        setLanguages(data[0].languages)
        setBorderCountries(data[0].borders)
      }).catch(console.error);
          
  }, [props.name]);
    
  return (
        <div className="details__wrapper" style={{backgroundColor: darkMode? "var(--dm-background)" : "var(--lm-background)", color: darkMode? "var(--white)" : "var(--lm-text)"}}>
          <div className="wrapper__top">
            <Link to="/" 
            className="back__button"
            style={{backgroundColor: darkMode? "var(--dm-element)" : "var(--white)", color: darkMode? "var(--white)" : "var(--lm-text)"}}
            ><ArrowBackIcon/><p>Back</p></Link>
          </div>
          <div className="wrapper__main">
            <img className="details__flag" src={countryDetails.flag} alt={countryDetails.name}/>
            <div className="details__content">
              <h1 className="content__title">{countryDetails.name}</h1>
              <div className="content__column">
                <p><span className="content__subheading">Native Name:</span> {countryDetails.nativeName}</p>
                <p><span className="content__subheading">Population:</span> {new Intl.NumberFormat().format(countryDetails.population)}</p>
                <p><span className="content__subheading">Region:</span> {countryDetails.region}</p>
                <p><span className="content__subheading">Sub Region:</span> {countryDetails.subregion}</p>
                <p><span className="content__subheading">Capital:</span> {countryDetails.capital}</p>
              </div>
              <div className="content__column">
                <p><span className="content__subheading">Top Level Domain:</span> {countryDetails.topLevelDomain}</p>
                <p><span className="content__subheading">Currencies:</span> {currencies.map((currency, index, array) => ((index === (array.length - 1))? currency.name : `${currency.name}, `))}</p>
                <p><span className="content__subheading">Languages:</span> {languages.map((language, index, array) => ((index === (array.length - 1))? language.name : `${language.name}, `))}</p>
              </div>
              <div className="content__footer">
                <div className="footer__subheading">Border Countries: </div>
                <div className="border__countries">{borderCountryDetails.map((country) => (printBorderCountryButton(country)))}</div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Details;