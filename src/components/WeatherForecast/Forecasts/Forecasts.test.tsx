import { render, screen } from "@testing-library/react";

import Forecasts from "./Forecasts";

describe("Forecast component", () => {
  it("renders the provided forecasts", () => {
    render(
      <Forecasts
        forecast={[
          {
            dayOfWeek: "Mon",
            temperature: 20,
            weather: {
              description: "Cloud",
              id: 801,
            },
          },
          {
            dayOfWeek: "Tue",
            temperature: 35,
            weather: {
              description: "Clear",
              id: 800,
            },
          },
        ]}
      />
    );

    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("20°")).toBeInTheDocument();
    expect(screen.getByText("Cloud")).toBeInTheDocument();

    expect(screen.getByText("Tue")).toBeInTheDocument();
    expect(screen.getByText("35°")).toBeInTheDocument();
  });
});
