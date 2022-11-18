import "./Forecasts.less";

import { clsx } from "clsx";
import { addDays, format } from "date-fns";
import * as React from "react";

import type { DayForecast } from "#types";

import { getIconClassForWeatherId } from "./Forecasts.utils";

const defaultForecastData = {
  temperature: null,
  weather: {
    description: "",
    id: 0,
  },
};

type Props = {
  forecast: DayForecast[] | null;
};

class Forecasts extends React.PureComponent<Props> {
  render(): JSX.Element {
    const [todayForecast, ...restForecast] = this.props.forecast ?? [
      {
        ...defaultForecastData,
        dayOfWeek: "Today",
      },
      ...Array.from({ length: 4 }).map((_, index) => ({
        ...defaultForecastData,
        dayOfWeek: format(addDays(new Date(), index + 1), "iii"),
      })),
    ];

    return (
      <div className="forecast-card">
        <div className="forecast-card__today">
          <div className="forecast-card__today-text">Today</div>
          <div className="forecast-card__today_details">
            <i
              className={clsx(
                "fa-solid",
                getIconClassForWeatherId(todayForecast.weather.id)
              )}
            ></i>
            <div>
              <span className="forecast-card__today-temp forecast-temp">
                {todayForecast.temperature
                  ? `${Math.round(todayForecast.temperature)}`
                  : "--"}
                &deg;
              </span>
              <span className="forecast-card__today-weather">
                {todayForecast.weather.description}
              </span>
            </div>
          </div>
        </div>
        <div className="forecast-card__upcoming">
          {restForecast.map(({ dayOfWeek, temperature, weather }) => (
            <div className="forecast-card__future-day" key={dayOfWeek}>
              <span className="forecast-card__future-title">{dayOfWeek}</span>
              <i
                className={clsx(
                  "fa-solid",
                  getIconClassForWeatherId(weather.id)
                )}
              />
              <span className="forecast-card__future-temp forecast-temp">
                {temperature ? Math.round(temperature) : "--"}&deg;
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Forecasts;
