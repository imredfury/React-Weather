import React, { useState } from 'react';
import axios from 'axios';
import styles from '../Header/Header.module.css'
import worldCities from '../cities/cities';

const Form = ({setFivedays, setCurrent, setDate, isLight}) => {
   
    
    
const [cityName, setCityName] = useState("")

const getWeatherUseCityName = (cityName ="") => {
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8edd20723a0320150720b9621b6d61ba`)
     .then(({data}) => setCurrent(data))
     .catch(() => alert('Sorry! City not found.'));

     axios(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=8edd20723a0320150720b9621b6d61ba`)
        .then(({data}) => {
            setFivedays(data.list);
            setDate(data.list[0].dt_txt.slice(0, 10))
    })
}

const handleWeatherSearchSubmit = (e) => {
    e.preventDefault();
    getWeatherUseCityName(e.target[0].value)
    setCityName("")
};

const handleClickOption = (cityName = "") => {
    getWeatherUseCityName(cityName)
    setCityName("")
}

const getCurrentOptions = () => {
    return worldCities.filter((item) => item.toLocaleLowerCase().startsWith(cityName.toLocaleLowerCase())).filter((_,idx) => idx < 5)
}


    return (
        <>
            <form className={styles.form} onSubmit={handleWeatherSearchSubmit}>
                <input value={cityName} onChange={(e) => setCityName(e.target.value)} placeholder='write city...' className={`${styles.input} ${isLight ? styles.light: ''}`} type="search" required/>
                <button className={`${styles.button} ${isLight ? styles.light: ''}`} type='submit' >Search</button>
            </form>
            <div className={styles.block}>
            <ul className={styles.list} style={{display: cityName.length ? "block" : "none"}}>
             {getCurrentOptions().map((item) => (
              <li onClick={() => handleClickOption(item)} className={styles.item}>{item}</li>))}
            </ul>
            </div>
        </>
    );
};

export default Form;