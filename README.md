# NextJS Car Rental Website #

This is a car rental website called NOS Rentals which was designed and built as a university coursework project. The website was built using Next.js with TypeScript and tested using Yarn, React Testing Library, and Google Lighthouse. The website allows users to browse and book rental cars online with filtering and searching for cars available.

## Contributors

This project was created as part of a group project by:
- Oscar Daly
- Brett Wilson
- Caleb Wilson

## Setup

1. Clone the repository to your local machine using `git clone https://github.com/oscardaly/car-rental-website.git`.
2. Install the recommended version of nodejs
   - use nvm ideally
3. Install npm and then yarn globally
4. In the root of this project run `yarn install` to install the necessary dependencies.
5. You can then run the webapp with `yarn start` to start the development server.

## Testing

The project uses the following testing frameworks and tools:

- Jest and React Testing Library for unit testing and integration testing
- Google Lighthouse for performance, accessibility, and SEO testing

To run the tests locally, follow these steps:

1. Navigate to the project root directory in your terminal.
2. Run the command `yarn test` or `npm run test`.
3. The tests will be run using React Testing Library and will test the functionality of the website components.


The performance of the car rental website can be measured using Google Lighthouse. To run a Lighthouse audit, follow these steps:

1. Navigate to the website in your web browser.
2. Open the Lighthouse extension in your browser's developer tools.
3. Run the audit and view the report to see recommendations for improving website performance.

## Google Lighthouse CLI

We used Google Lighthouse to test performance, accessibility, and SEO of our website. To run a Google Lighthouse test and open the results in the browser run:
1. `npm install -g lighthouse`
2. `lighthouse http://localhost:3000/ --view`

or replace the url with whatever page you would like to test