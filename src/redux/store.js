import { configureStore } from '@reduxjs/toolkit'
import weatherSlice from './weatherSlice'
import forecastCitySlice from "./forecastCitySlice"

export const store = configureStore({
  reducer: {
      cities: weatherSlice,
      city: forecastCitySlice
  },
})