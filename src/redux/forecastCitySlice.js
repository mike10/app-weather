import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

export const forecastCity = createAsyncThunk('forecast', async (coord) => {
    console.log(coord);
    let resp = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,minutely,daily,alerts&lang=ru&units=metric&appid=99d2c749c39d661909a6a7a22e257193`);

    //let resp = await fetch(`http://pro.openweathermap.org/data/2.5/forecast/hourly?id=524901&appid99d2c749c39d661909a6a7a22e257193`);

    let result = await resp.json()
    return result
})


const forecastCitySlice = createSlice({
    name: 'forecast',
    initialState: {
        status: undefined,
        data: []
    },
    reducers: {},
    extraReducers: {
        [forecastCity.fulfilled]: (state, action) => {
            console.log(state, action.payload);
            return {
                status: "success",
                data: action.payload.hourly
            } 
        },
        [forecastCity.pending]: (state, action) => {
            console.log(state, action);
            return {
                ...state,
                status: "loading"
            }
        },
        [forecastCity.rejected]: (state, action) => {
            console.log(state, action);
            return {
                ...state,
                status: "error"
            }
        }
    }

})

export default forecastCitySlice.reducer