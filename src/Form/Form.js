import React from 'react';
import axios from 'axios';
import styles from '../Header/Header.module.css'

const Form = ({setFivedays, setCurrent, setDate, isLight}) => {
const getWeatherUseCityName = (e) => {

    e.preventDefault();
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${e.target[0].value}&appid=8edd20723a0320150720b9621b6d61ba`)
     .then(({data}) => setCurrent(data))
     .catch(() => alert('Sorry! City not found.'));

     axios(`https://api.openweathermap.org/data/2.5/forecast?q=${e.target[0].value}&appid=8edd20723a0320150720b9621b6d61ba`)
        .then(({data}) => {
            setFivedays(data.list);
            setDate(data.list[0].dt_txt.slice(0, 10))
        })


        e.target[0].value = ''
};

    return (
            <form className={styles.form} onSubmit={getWeatherUseCityName}>
                <input placeholder='write city...' className={`${styles.input} ${isLight ? styles.light: ''}`} type="search" required/>
                <button className={`${styles.button} ${isLight ? styles.light: ''}`} type='submit'>Search</button>
            </form>
    );
};

export default Form;