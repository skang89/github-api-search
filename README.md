GitHub Repository Browser
=========================

I use Vite as my build tool to initiate my project with the use of React and Redux Toolkit as my state management to store my data. I used Fetch API to fetch Github API data.

Building a simple search funciton with a a couple of filters (for coding language and star count), as well as the ability to sort results.

This is an SPA, I used React Router to handle the route for the home page and the repo details page.

I used SCSS to style the app

Tech Stack Used:
--------------

-   React 18 with Vite

-   State Management: Redux Toolkit

-   Routing: React Router v6

-   Styling: Scss with custom components

-   API Integration: GitHub REST API v3 using Fetch API

-   Build Tool: Vite

-   Linting: ESLint with React plugins

Installation Instructions
----------------------------

### Prerequisites

-   Node.js (version 16.0 or higher)

-   npm or yarn package manager

-   Git

### Setup Steps

Clone the repository

```
git clone <repository-url>

cd github-repository-browser
```

1.  Install dependencies

```
npm install

# or

yarn install
```

1.  Start the development server

```
npm run dev

# or

yarn dev
```

2.  Open your browser Navigate to http://localhost:5173 to view the application

### Available Scripts

-   npm run dev - Start development server

-   npm run build - Build for production

-   npm run preview - Preview production build locally

-   npm run lint - Run ESLint for code quality checks

Project Structure
---------------------

```bash
src/

├── components/

│   ├── FilterPanel/          # Advanced filtering controls

│   ├── LoadingSpinner/       # Loading state component

│   ├── RepositoryCard/       # Repository list item display

│   ├── RepositoryDetails/    # Detailed repository modal

│   └── SearchBar/            # Main search input

├── pages/

│   ├── SearchPage.jsx        # Main search and results page

│   └── RepositoryDetailsPage.jsx  # Detailed repository view

├── services/

│   └── githubAPI.jsx         # GitHub API integration

├── store/

│   ├── index.jsx             # Redux store configuration

│   └── repositoriesSlice.jsx # Repository state management

├── styles/

│   └── _global.scss          # Global styles partials

│   └── _mixin.scss           # Mixins styles partials

├── App.jsx                   # Main application component

├── App.scss                  # Main application component

└── main.jsx                  # Application entry point
```

Struggles & Challenges
-------------------------

### Technical Challenges

-   The deprecation of Create React App and having to look for another build tool to start off my App.

-   GitHub API Rate Limiting: Encountering rate limit errors when testing the search functionality. This was actually also a good thing because it allowed me to easily build/test the error handling for the app

-   Complex filtering for the star count

-   styled-components being in maintenance mode, which suggests it may become deprecated so styled the app in a different manner. 

Improvements
----------------------

Given more time, I would implement the following improvements:

Adding TypeScript

-   I felt like I wouldn't have time to add typescript and finish the app within the timeframe so didn't implement TypeScript

Add styles with the use of Material UI

-   Having worked with other component libraries in the past, it would have been nice to implement Material UI, but left like I needed to allow extra time to look through the documentation 

Testing with Jest 

Add versioning script to update my Package,json version number with every commit

Authentication and various UI and style Improvements

-   Implement GitHub OAuth for higher API rate limits
-   Add features such as:
    -   Display number of results
    -   More search filters
    -   Pagination

Performance based improvements:
-   As mentioned above, using pagination
-   Caching repository data to reduce API calls
-   Lazy loading repository details

License
----------

This project is open source and available under the[  MIT License](https://claude.ai/chat/LICENSE).

* * * * *

Note: This application uses the public GitHub API without authentication, which limits the rate to 60 requests per hour per IP address. For production use, implementing GitHub OAuth would provide much higher rate limits and additional features.