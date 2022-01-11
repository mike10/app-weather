import "./MainContent.css";
import { Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import ItemCity from '../ItemCity/ItemCity';
import {fetchCities} from "../../redux/weatherSlice"

 const MainContent = () => {
    const cities = useSelector(state => state.cities.data)
    const errorMessage = useSelector(state => state.cities.message)

    const status = useSelector(state => state.cities.status)
   

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        let storageCities = localStorage.getItem('cities');
        if(storageCities){
            console.log("storageCities", storageCities);
            const arrCities = storageCities.split(",")
            arrCities.forEach(item => dispatch(fetchCities(item)))
        }
    },[])

    useEffect(() => {
        if(status === "error"){
            setLoading(false)
            alert(errorMessage);
            return
        }
        if(status === "loading"){
            setLoading(true)
            return
        }
        if (status === "success") {
            setLoading(false)
            return
        }
    
    },[status])

     useEffect(() =>{
        const arrCities = cities.map(item => item.city)
        console.log(arrCities);
        let str = arrCities.join(",")
        console.log(str);
        localStorage.setItem('cities', str);
    }, [cities]) 

    

    return (
        <Spin spinning={loading} size="large">  
            <div className="MainContent flex-container">
                
                    {cities.map((item, index) => {
                        return <ItemCity data={item} key={index}/>
                    })}
                
            </div>
       </Spin> 
    );
}

export default MainContent
