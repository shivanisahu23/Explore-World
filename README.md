# Country Explorer

## Project Overview

**Country Explorer** is a web application that allows users to explore and interact with data from various countries worldwide. It fetches real-time information from the [Rest Countries API](https://restcountries.com/) and provides a user-friendly interface to search, filter by region, view details, and manage a list of favorite countries. The application also supports dark mode and is fully responsive across different screen sizes and browsers.

## Features

- **Search Functionality:** Search for countries by name.
- **Region Filter:** Filter countries by region (Africa, Americas, Asia, Europe, Oceania, All).
- **Favorite List:** Add countries to your favorites (up to 5), stored locally.
- **Detailed View:** Click on a country to view detailed information in a modal.
- **Dark Mode:** Toggle dark and light mode for better accessibility.
- **Responsive Design:** Works on mobile, tablet, and desktop devices.
- **Cross-browser Compatibility:** Tested on Chrome, Firefox, and Safari.

## Setup Instructions

1. Clone the repository to your local machine using:
   ```bash
   git clone https://shivanisahu23.github.io/Explore-World/
   ```
2. Navigate to the project directory:
   ```bash
   cd Explore-World
   ```
3. Open the `index.html` file in your preferred browser:
   ```bash
   open index.html
   ```

No additional setup is required as the project uses vanilla JavaScript, HTML, and CSS.

## Design Decisions

- **Favorites Feature:** I implemented a favorite countries feature, where users can select and save up to five countries in local storage. This helps manage state persistently even after a page refresh.
- **Dark Mode:** The dark mode feature is implemented using CSS variables, allowing for easy theme switching without complex logic.
- **Responsive Grid Layout:** The countries are displayed in a grid layout using CSS Grid, ensuring the app adjusts gracefully across different screen sizes.
- **Performance Considerations:** Data is fetched from the Rest Countries API once on page load and then filtered locally to minimize API requests.

## Running Tests

To ensure everything works as expected:

1. **Cross-browser Testing:** The app has been tested on major browsers (Chrome, Firefox, and Safari). You can manually test by opening `index.html` in each browser.
2. **Responsiveness Test:** Resize the browser window to test responsiveness on mobile, tablet, and desktop views. The design adapts to different breakpoints using CSS media queries.
3. **Favorites Feature:** Test the favorites feature by selecting countries, ensuring they persist even after a page refresh, and limiting the selection to five.

If any browser does not behave as expected, please report the issue in the repository's [issues section](#).

## Known Issues & Limitations

- The **language filter** is currently a placeholder and has not been fully implemented.
- The app is fully functional on Chrome, Firefox, and Safari. However, it has not been tested on Edge or Internet Explorer.
- **Performance on slow networks** may cause delays in data loading due to API fetching.

## Time Spent

- **Approximate Time Spent:** 10 hours
  - 3 hours for building the UI and styling.
  - 4 hours for implementing the JavaScript functionality (API fetching, filtering, and managing favorites).
  - 2 hours for debugging and testing across browsers.
  - 1 hour for writing documentation and code cleanup.

## Future Enhancements

- Implement language-based filtering.
- Add sorting functionality (e.g., sorting by population or country name).
- Improve the UX of the modal for detailed country views.
- Explore adding a map view for better geographical context.

## Credits

Developed by **Shivani Sahu**
