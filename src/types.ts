export type DayForecast = {
  dayOfWeek: string;
  temperature: number;
  weather: {
    description: string;
    id: number;
  };
};
