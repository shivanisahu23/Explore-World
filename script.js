const countriesElem = document.querySelector(".countries"); // Container for displaying countries
const dropDown = document.querySelector(".dropDown"); // Dropdown for selecting regions
const dropElem = document.querySelector(".drop"); // Dropdown options for regions
const region = document.querySelectorAll(".region"); // Region filter options
const language = document.querySelectorAll(".language"); // Placeholder for language filter options (if implemented)
const search = document.querySelector(".search"); // Search input field
const toggle = document.querySelector(".toggle"); // Button to toggle dark mode
const moon = document.querySelector(".moon"); // Icon for dark mode toggle
const favoritesSection = document.getElementById("favoritesSection"); // Section to display favorite countries
const favoritesList = document.getElementById("favoritesList"); // List of favorite countries

// Initialize favorites from localStorage or set as empty array if none exist
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentFilter = ""; // To track the currently active filter (region or language)

// Fetch and display countries data from API
async function getCountry() {
    const url = await fetch("https://restcountries.com/v3.1/all"); // Fetch country data from API
    const res = await url.json(); // Parse the response as JSON
    res.forEach(element => {
        showCountry(element); // For each country, display it on the page
    });
}

getCountry(); // Call the function to fetch and display countries

// Function to show each country in the UI
function showCountry(data) {
    const country = document.createElement("div"); // Create a new div for each country
    country.classList.add("country"); // Add class for styling

    const flagUrl = data.flags.png; // Get the country's flag image URL
    const isFavorite = favorites.includes(data.name.common); // Check if the country is in the favorites list
   
    country.innerHTML = `
        <div class="country-img">
            <img src="${flagUrl}" alt="">
        </div>
        <div class="country-info">
            <h5 class="countryName">${data.name.common}</h5> <!-- Display country name -->
            <p><strong>Population:</strong> ${data.population}</p> <!-- Display population -->
            <p class="regionName"><strong>Region:</strong> ${data.region}</p> <!-- Display region -->
            <p><strong>Capital:</strong> ${data.capital}</p> <!-- Display capital -->
            <button class="favorite-icon" data-country="${data.name.common}" aria-label="Add to favorites">
                <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i> <!-- Heart icon for favorites -->
            </button>
        </div>`;
    
    countriesElem.appendChild(country); // Append the country element to the container

    // Add event listener to show country details when clicked
    country.addEventListener("click", () => {
        showCountryDetail(data); // Show detailed view of the country
        document.querySelector(".header-content").style.display = "none"; // Hide the header content
    });

    // Add event listener to the favorite button
    const favoriteButton = country.querySelector(".favorite-icon");
    favoriteButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent opening the country detail view when clicking the favorite button
        toggleFavorite(data.name.common); // Toggle favorite status
    });

    // Store the country data in the element for filtering purposes
    country.countryData = data;
}

// Function to toggle the favorite status of a country
function toggleFavorite(countryName) {
    if (favorites.includes(countryName)) {
        // If the country is already a favorite, remove it
        favorites = favorites.filter(item => item !== countryName);
    } else if (favorites.length < 5) {
        // Add to favorites if the list has less than 5 countries
        favorites.push(countryName);
    }
    // Update localStorage with the new favorites list
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavorites(); // Update the UI to reflect changes in the favorites list
}

// Function to update the favorites section
function updateFavorites() {
    favoritesList.innerHTML = ''; // Clear the current favorites list

    if (favorites.length > 0) {
        // If there are favorites, display them
        favoritesSection.style.display = 'block';
        favorites.forEach(fav => {
            const li = document.createElement('li'); // Create a new list item for each favorite
            li.textContent = fav; // Set the text to the country name
            favoritesList.appendChild(li); // Append to the favorites list
        });
    } else {
        // If there are no favorites, hide the favorites section
        favoritesSection.style.display = 'none';
    }
}

// Handle dropdown toggle for region and language filters
dropDown.addEventListener("click", () => {
    dropElem.classList.toggle("showDropDown"); // Show/hide dropdown menu
});

// Add event listeners for region filter options
region.forEach(element => {
    element.addEventListener("click", () => {
        currentFilter = 'region'; // Set the active filter type
        const selectedRegion = element.innerText; // Get the selected region
        filterCountries(selectedRegion, 'region'); // Filter countries by region
    });
});

// Placeholder for language filter - functionality not implemented in this version
language.forEach(element => {
    element.addEventListener("click", () => {
        currentFilter = 'language'; // Set the active filter type
        const selectedLanguage = element.innerText; // Get the selected language
        filterCountries(selectedLanguage, 'language'); // Filter countries by language
    });
});

// Function to filter countries based on the selected filter (region or language)
function filterCountries(selectedValue, filterType) {
    Array.from(countriesElem.children).forEach(countryElem => {
        const countryData = countryElem.countryData; // Get the stored country data
        const matchesRegion = countryData.region === selectedValue || selectedValue === "All"; // Match region
        const matchesLanguage = countryData.languages && Object.values(countryData.languages).some(lang => lang.toLowerCase() === selectedValue.toLowerCase()) || selectedValue === "All"; // Match language

        if (filterType === 'region' && matchesRegion) {
            countryElem.style.display = "grid"; // Show the country if region matches
        } else if (filterType === 'language' && matchesLanguage) {
            countryElem.style.display = "grid"; // Show the country if language matches
        } else {
            countryElem.style.display = "none"; // Hide countries that don't match the filter
        }
    });

    // Reset the other filter when one is active
    if (filterType === 'region') {
        language.forEach(lang => lang.classList.remove('active')); // Remove active class from language filter
    } else if (filterType === 'language') {
        region.forEach(reg => reg.classList.remove('active')); // Remove active class from region filter
    }
}

// Handle search input - filter countries by name as user types
search.addEventListener("input", () => {
    const searchText = search.value.toLowerCase(); // Convert search text to lowercase

    // Loop through all country elements and filter by name
    Array.from(countriesElem.children).forEach(elem => {
        const countryNameText = elem.querySelector('.countryName').innerText.toLowerCase();

        if (countryNameText.includes(searchText)) {
            elem.style.display = "grid"; // Show if the name matches
        } else {
            elem.style.display = "none"; // Hide if it doesn't match
        }
    });
});

// Toggle dark mode on click
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark"); // Toggle dark mode class on body
    moon.classList.toggle("fas"); // Toggle the moon icon style
});

// Handle country detail modal display
const countryModal = document.querySelector(".countryModal");

function showCountryDetail(data) {
    const flagUrl = data.flags.png; // Get the flag URL for the detailed view
    countryModal.classList.toggle("show"); // Show or hide the modal
    countryModal.innerHTML = `
    <button class="back">Back</button>
    <div class="modal">
        <div class="leftModal">
            <img src="${flagUrl}" alt="">
        </div>
        <div class="rightModal">
            <h1>${data.name.common}</h1>
            <div class="modalInfo">
                <div class="innerLeft inner">
                    <p><strong>Name:</strong> ${data.name.common || 'N/A'}</p> <!-- Display name -->
                    <p><strong>Population:</strong> ${data.population}</p> <!-- Display population -->
                    <p><strong>Region:</strong> ${data.region}</p> <!-- Display region -->
                    <p><strong>Sub-region:</strong> ${data.subregion}</p> <!-- Display subregion -->
                </div>
                <div class="innerRight inner">
                    <p><strong>Capital:</strong> ${data.capital}</p> <!-- Display capital -->
                    <p><strong>Top Level Domain:</strong> ${data.tld.join(", ")}</p> <!-- Display top-level domain -->
                    <p><strong>Currencies:</strong> ${getCurrencies(data.currencies)}</p> <!-- Display currencies -->
                    <p><strong>Languages:</strong> ${getLanguages(data.languages)}</p> <!-- Display languages -->
                </div>
            </div>
        </div>
    </div>`;
        // Add event listener to close the modal when the back button is clicked
    const backButton = countryModal.querySelector(".back");
    backButton.addEventListener("click", () => {
        countryModal.classList.remove("show"); // Hide the modal
        document.querySelector(".header-content").style.display = "flex"; // Show the header content again
    });
}

// Helper function to format currencies
function getCurrencies(currencies) {
    return Object.values(currencies).map(currency => currency.name).join(", ") || 'N/A'; // Join currency names as a string
}

// Helper function to format languages
function getLanguages(languages) {
    return Object.values(languages).join(", ") || 'N/A'; // Join language names as a string
}

// Initialize favorites section on page load
updateFavorites(); // Call this function to ensure favorites are displayed on page load
