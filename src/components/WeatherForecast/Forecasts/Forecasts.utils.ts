export const getIconClassForWeatherId = (weatherId: number) => {
  if (weatherId >= 200 && weatherId <= 232) return "fa-cloud-bolt";
  if (weatherId >= 300 && weatherId <= 321) return "fa-cloud-rain";
  if (weatherId >= 500 && weatherId <= 531) return "fa-cloud-showers-heavy";
  if (weatherId >= 600 && weatherId <= 622) return "fa-snowflake";
  if (weatherId === 800) return "fa-sun";
  if (weatherId >= 801 && weatherId <= 804) return "fa-cloud";
  return "fa-sun";
};
