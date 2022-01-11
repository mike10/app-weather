import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchCities = createAsyncThunk('weather', async (city) => {
    let resp = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=99d2c749c39d661909a6a7a22e257193`);
    
    let result = await resp.json()
    return result
})
export const fetchUpdateWeather = createAsyncThunk('updateWeather', async (city) => {
    let resp = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=99d2c749c39d661909a6a7a22e257193`);
    
    let result = await resp.json()
    return result
})

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: [],
        status: undefined,
        message: ""
    },  
    reducers: {
        deleteCity(state, action) {
            const city = action.payload
            const index = state.data.findIndex(item => item.city === city)
            state.data.splice(index, 1)
        },
    },
    extraReducers: {
        [fetchCities.fulfilled]: (state, action) => {
            console.log(action.payload);
            if(action.payload.message){//Ошибка: город не найден
                return {
                    ...state,
                    status: "error",
                    message: action.payload.message
                }
            }
            const city = action.payload.name
            const isCityExist = state.data.find(item => item.city === city)
            if(isCityExist){//Ошибка: город уже есть
                return {
                    ...state,
                    status: "success",
                }
            }
            return {
                data: [...state.data, 
                    {
                        city: action.payload.name,
                        min: action.payload.main.temp_min,
                        max: action.payload.main.temp_max,
                        temp: action.payload.main.temp,
                        coord: action.payload.coord
                    }], 
                status: "success",
                message: ""
            }
        },
        [fetchUpdateWeather.fulfilled]: (state, action) => {
            console.log(action.payload);
            const city = action.payload.name
            const item = state.data.find(item => item.city === city)
            item.min = action.payload.main.temp_min
            item.max = action.payload.main.temp_max
            item.temp = action.payload.main.temp
             
      },
        [fetchCities.pending]: (state, action) => {
            console.log(action);
            return {
                ...state,
                status: "loading",
            }
      },
        [fetchCities.rejected]: (state, action) => {
            console.log(action);
            return {
                ...state.data,
                status: "error",
                message: action.payload.message
            }
      }
    }
  
  })

  export const { deleteCity } = weatherSlice.actions

  export default weatherSlice.reducer