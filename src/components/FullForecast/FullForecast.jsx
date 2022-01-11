import './FullForecast.css';
import { useParams, useNavigate  } from "react-router-dom";
import { Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { forecastCity } from "../../redux/forecastCitySlice"


const FullForecast = () => {
    let params = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const cities = useSelector(state => state.cities.data)
    const timeRange = useSelector(state => state.city.data)
    const [dataCities, setDataCities] = useState([]);
    const status = useSelector(state => state.cities.status)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(cities.length === 0){
            navigate("/");
            return
        }
        const arrCities = cities
        const city = params.city
        const cityCoord = arrCities.find(item => item.city === city)
        console.log(city, arrCities);
        dispatch(forecastCity(cityCoord.coord))
    },[])

    useEffect(() => {
        const data = []
        const arrTimeRange = timeRange
        if(arrTimeRange.length !== 0){
            console.log(arrTimeRange);
            const date = new Date(arrTimeRange[0].dt*1000)
            let diff = 24 - date.getHours()
            for (const item of arrTimeRange) {
                const date = new Date(item.dt*1000)
                data.push({
                    hour: date.getHours(),
                    temp: item.temp
                })
                diff--
                if(diff < 0){
                    break;
                }
            }
            setDataCities([...data])
        }
        
    }, [timeRange])

    useEffect(() => {
        if(status === "error"){
            setLoading(false)
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

    return (
        <div className="full-forecast">
            <h1>Прогноз на день г.{params.city}</h1>
            <Spin spinning={loading} size="large">
                <section className='full-forecast__section flex-container'>
                    {dataCities.map((item, ind) =>
                        <div key={item.temp * ind}>
                            <div className='full-forecast__div' style={{ marginTop: 30 - item.temp, backgroundColor: 100 - item.temp }}>
                                {item.temp}

                            </div>
                            <div>{item.hour + ":00"}</div>
                        </div>
                    )}
                </section>
            </Spin>
        </div>
    );
}

export default FullForecast
