import './Header.css';
import { useSelector, useDispatch } from 'react-redux'
import {fetchCities} from "../../redux/weatherSlice"
import { useState } from 'react';
import 'antd/dist/antd.css';



const Header = () => {
    const dispatch = useDispatch()
    const [city, setCity] = useState("");
    const cities = useSelector(state => state.cities.data)

    const onNewCity = () => {
        const regexp = /^\W{2,}$/i;
        const test =  regexp.test(city)
        if(!test) {
            alert("Название города должно состоять только из букв русского алфавита и не менее 2-х!")
            return
        }
        const isCityExist = cities.find(item => item.city.toLowerCase() === city.toLowerCase())
        if(isCityExist){
            alert("Такой город уже есть!")
            return
        }
        dispatch(fetchCities(city))
        setCity("")
    }
    return (
        <div className="Header">
            <label htmlFor="cityValue">Название города</label>
            <input type="text" pattern="[А-Яа-яЁё]" id="cityValue" value={city}  onChange={(e) => {setCity(e.target.value)}}/>
            <input type="button" value="Добавить" onClick={() => {onNewCity();}}/>
        </div>
    );
}

export default Header
