import { format } from "date-fns";
import * as R from "ramda";

import type { DayForecast } from "#types";

type CityResponse = {
  lat: number;
  lon: number;
};

const fetchCityLatLng = async (
  cityName: string
): Promise<{ lat: number; lng: number }> => {
  const geocodeApiUrl = new URL(
    `${import.meta.env.VITE_FORECAST_API_BASE_URL}/geo/1.0/direct`
  );
  geocodeApiUrl.search = new URLSearchParams({
    appid: import.meta.env.VITE_FORECAST_API_KEY,
    limit: "1",
    q: cityName,
  }).toString();

  const cityDetailsResponse = await fetch(geocodeApiUrl);

  if (cityDetailsResponse.status < 200 || cityDetailsResponse.status > 299) {
    throw new Error();
  }

  const cityDetails = (await cityDetailsResponse.json())[0] as CityResponse;

  return {
    lat: cityDetails.lat,
    lng: cityDetails.lon,
  };
};

type ForecastBodyList = {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    id: number;
    main: string;
  }[];
};

type ForecastBody = {
  list: ForecastBodyList[];
};

export const fetchForecast = async (
  cityName: string
): Promise<DayForecast[]> => {
  const { lat, lng } = await fetchCityLatLng(cityName);

  const forecastApiUrl = new URL(
    `${import.meta.env.VITE_FORECAST_API_BASE_URL}/data/2.5/forecast`
  );
  forecastApiUrl.search = new URLSearchParams({
    appid: import.meta.env.VITE_FORECAST_API_KEY,
    lat: lat.toString(),
    lon: lng.toString(),
    units: "metric",
  }).toString();

  const forecastResponse = await fetch(forecastApiUrl);

  if (forecastResponse.status < 200 || forecastResponse.status > 299) {
    throw new Error();
  }

  const forecast = (await forecastResponse.json()) as ForecastBody;

  return R.pipe(
    R.map<ForecastBodyList, DayForecast>(({ dt, main, weather }) => ({
      dayOfWeek: format(new Date(dt * 1000), "iii"),
      temperature: main.temp,
      weather: {
        description: weather[0].main,
        id: weather[0].id,
      },
    })),
    R.uniqBy((dayForecast) => dayForecast.dayOfWeek),
    R.take<DayForecast>(5)
  )(forecast.list);
};
