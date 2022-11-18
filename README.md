# Weather Forecast Frontend Challenge

This is my submission for the Weather Forecast Frontend Challenge. I hope you enjoy reviewing this as much as I enjoyed building it!

## Setup

To run the app, please follow the below commands:

```
# install dependencies
yarn

# start vite development server
yarn dev
```

This will start the app at http://localhost:5173/.

I have set up a basic integration test using React Testing Library. You can run this via the following command:

```
yarn test
```

## Assumptions

1. I have added an example of a component test written with Jest and React Testing Library. Jest and React Testing Library have become the standard for testing React component as recommended in the official [React documentations](https://reactjs.org/docs/testing.html#tools) and thus have been selected for this purpose. Given more time, I would also implement E2E tests with cypress.
2. I have included the forecast API key within `.env`. I understand that [The Twelve-Factor App's Config rules](https://12factor.net/config) dictate that configuration variables are not committed to source code; however I have decided to include the credentials here solely for the sake of simplicity in running this tech test.
