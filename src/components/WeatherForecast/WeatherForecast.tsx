import "./WeatherForecast.less";

import { clsx } from "clsx";
import * as React from "react";

import type { DayForecast } from "#types";

import { fetchForecast } from "../../api/fetchForecast";
import Forecasts from "./Forecasts";

const cities = ["Sydney", "Tokyo", "New York"];

const REFRESH_INTERVAL = 30000;

type State = {
  forecast: DayForecast[] | null;
  selectedCity: string;
};

class WeatherForecast extends React.Component<{}, State> {
  public state = {
    forecast: null,
    selectedCity: cities[0],
  };

  private setForecastInterval: ReturnType<typeof setInterval> | null = null;

  private setCityForecast = async (): Promise<void> => {
    try {
      const fetchedForecast = await fetchForecast(this.state.selectedCity);
      this.setState({
        forecast: fetchedForecast,
      });
    } catch (error) {
      // TODO proper error logging
      console.error(
        "An error occurred trying to fetch weather forecast",
        error
      );
    }
  };

  componentDidMount(): void {
    this.setCityForecast();
    this.setForecastInterval = setInterval(
      this.setCityForecast,
      REFRESH_INTERVAL
    );
  }

  componentDidUpdate(_: Readonly<{}>, prevState: Readonly<State>): void {
    if (prevState.selectedCity !== this.state.selectedCity) {
      if (this.setForecastInterval) clearInterval(this.setForecastInterval);

      this.setCityForecast();
      this.setForecastInterval = setInterval(
        this.setCityForecast,
        REFRESH_INTERVAL
      );
    }
  }

  public render(): JSX.Element {
    return (
      <div>
        <nav className="main-nav">
          <ul className="main-nav__menu-list">
            {cities.map((cityName) => (
              <li
                className={clsx({
                  "main-nav__menu-item--active":
                    this.state.selectedCity === cityName,
                })}
                key={cityName}
              >
                <button
                  className="main-nav__menu-option"
                  onClick={() => this.setState({ selectedCity: cityName })}
                  type="button"
                >
                  {cityName}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <Forecasts forecast={this.state.forecast} />
      </div>
    );
  }
}

export default WeatherForecast;
