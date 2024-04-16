# TMUCentral

Documentation can be found within the GitHub repo named "Documentation.pdf".

## Video Demonstration

[![TMUCentral Demonstration Video](https://img.youtube.com/vi/i1lCskc4Rtc/0.jpg)](https://www.youtube.com/watch?v=i1lCskc4Rtc)\
Youtube Link: https://www.youtube.com/watch?v=i1lCskc4Rtc

## Setup

- To use RUN the server.js file you need to create a .env file in the tmucentral/Backend directory and include the following ENV Variables. Example shown below:
    - PORT = 3005
    - CONNECTION = mongodb+srv://<username>:<password>g@cps630.0t7rxxu.mongodb.net/?retryWrites=true&w=majority&appName=CPS630
- The connection string will be obtained after signing
- This website will be connected to our hosted database, backend, and authentication system.

## Description

TMUCentral is a commercial-grade web interface for a classifed advertisement website tailored specifically for TMU students. Students can browse the many classifed ads or post their own ad for other students to see and exchange/request for.

## Key Features
- User Authentication:
    - Secure login and registration system using Firebase as an autentication service.

- Responsive Design:
    - The interface is supported for both desktops and mobile screens.

- Mobile Optimization:
    - The interface is capable of being fully functionaly while providing a great user experience on mobile devices.

- Classified Ad Categories:
    - Items Wanted: Students can post what item they are seeking for via an ad.
    - Items for Sale: Students can post an ad to sell a specific item.
    - Academic Services: A service for tutoring, textbook excahnges, and study groups.

- Search Functionality:
    - Title Search: Implemented a stop word parser using concepts of Natural Language Understanding from Artifical Intelegence. This helps to filter the search for keywords and return a better result from the database search query.
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
- Front-End Developement:
    - Implemented using React (a JavaScript framework), HTML and CSS

- Back-End Developement:
    - Server uses Node.js to communicate between the database and front-end.

- Security:
    - Firebase acts as an authetication system while storing user cedentials as a database.

- Database Management:
    - Developed with MongoDB for storing general user data and advertisement details.

- API Integration:
    - Use third party API's like Firebase for authentication and TalkJS for user communcation over the website.

- Testing:
    - Comprehensive testing was preformed on various devices and browsers.