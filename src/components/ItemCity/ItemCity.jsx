import './ItemCity.css';
import { useDispatch } from 'react-redux'
import {deleteCity} from "../../redux/weatherSlice"
import { fetchUpdateWeather } from "../../redux/weatherSlice" 
import { Link } from "react-router-dom";

const ItemCity = (props) => {
    const dispatch = useDispatch()
    const data = props.data

    const deleteCityFromStorage = (name) => {
        let storageCities = localStorage.getItem('cities');
        const arrCities = storageCities.split(",")
        const ind = arrCities.indexOf(name)
        arrCities.splice(ind, 1)
        storageCities = arrCities.join(",")
        localStorage.setItem('cities', storageCities);
        
    }

    return (
      <div className="item-city item-city_margin-top">
            <header className = "item-city__header flex-container space-between">
                <span onClick={()=>{dispatch(fetchUpdateWeather(data.city))}}>&#8634;</span>
                <span onClick={()=>{dispatch(deleteCity(data.city));deleteCityFromStorage(data.city)}}>✘</span>
            </header>
            <Link to={`/${data.city}`}>
                <h1 className='item-city__h1'>{data.city}</h1>
                <section className ="item-city__section">
                    <div>Текущая t {data.temp}</div>
                    <div>Мин t {data.min}</div>
                    <div>Макс t {data.max}</div>
                </section> 
            </Link>
      </div>
    );
}

export default ItemCity
