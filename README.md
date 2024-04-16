# TMUCentral

Documentation is located within the GitHub repo named "Documentation.pdf".

## Video Demonstration

[![TMUCentral Demonstration Video](https://img.youtube.com/vi/i1lCskc4Rtc/0.jpg)](https://www.youtube.com/watch?v=i1lCskc4Rtc)\
Youtube Link: https://www.youtube.com/watch?v=i1lCskc4Rtc

## Setup

- To use RUN the server.js file you need to create a .env file in the tmucentral/Backend directory and include the following ENV Variables. Example shown below:
    - PORT = 3005
    - CONNECTION = mongodb+srv://<username>:<password>g@cps630.0t7rxxu.mongodb.net/?retryWrites=true&w=majority&appName=CPS630
- The connection string is obtained after signing
- This website will connect to our hosted database, backend, and authentication system.

## Description

TMUCentral is a commercial-grade web interface for a classified advertisement website tailored specifically for TMU students. Students can browse the many classified ads or post their own ad for other students to see and exchange/request for.

## Key Features
- User Authentication:
    - Secure login and registration system using Firebase as an authentication service.

- Responsive Design:
    - The interface supports both desktops and mobile screens.

- Mobile Optimization:
    - The interface is capable of being fully functional while providing a great user experience on mobile devices.

- Classified Ad Categories:
    - Items Wanted: Students can post what item they are seeking via an ad.
    - Items for Sale: Students can post an ad to sell a specific item.
    - Academic Services: A service for tutoring, textbook exchanges, and study groups.

- Search Functionality:
    - Title Search: Implemented a stop word parser using concepts of Natural Language Understanding from Artificial Intelligence. This helps to filter the search for keywords and return a better result from the database search query.
    - Category Filter: Display ads that follow a certain category. Either as "Items Wanted", "Items for Sale", or "Academic Services".
    - Price Filter: Filter ads to have only prices within either the pre-selected intervals or from a custom price range.
    - Location Filter: Search via the location of the provided ad.

- Ad Posting Interface:
    - The interface provides a user-friendly experience when posting new ads. These ads will include text, images, and relevant details.

- Communication Platform:
    - Students can communicate via a secure chatting platform within the website.

- Admin Dashboard:
    - A site for administrators to manage ads, users, and site content.

## Technical Requirements
- Front-End Development:
    - Implemented using React (a JavaScript framework), HTML and CSS

- Back-End Development:
    - Server uses Node.js to communicate between the database and front-end.

- Security:
    - Firebase acts as an authentication system while storing user credentials as a database.

- Database Management:
    - Developed with MongoDB for storing general user data and advertisement details.

- API Integration:
    - Use third-party API like Firebase for authentication and TalkJS for user communication over the website.

- Testing:
    - Comprehensive testing performed on various devices and browsers.
