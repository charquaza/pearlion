
# Pearlion

**A full-stack e-commerce platform for custom jewelry, featuring secure Stripe payment integration, responsive design, and robust cloud deployment.**

![Pearlion Home Page](client/public/pearlion-main-screenshot.png)

---

## Table of Contents

- [Project Links](#project-links)
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Future Enhancements](#future-enhancements)
- [Development Timeline](#development-timeline)

---

## Project Links

- **Live Application:** [pearlion.vercel.app](https://pearlion.vercel.app)
- **Repository:** [github.com/charquaza/pearlion](https://github.com/charquaza/pearlion)

---

## Overview

Pearlion is a modern e-commerce platform built to showcase and sell jewelry products. The application supports dynamic product listings, user-generated ratings and reviews, authentication and role-based authorization, secure checkout and accurate tax calculations using Stripe, and a responsive, accessible design. Pearlion is optimized for performance and scalability, deployed using a multi-cloud approach.

Developed as a proof of concept for my wife, who has aspirations of selling her own handmade jewelry, Pearlion is adaptable to any business that needs a platform for showcasing products/services and securely handling transactions.

---

## Tech Stack

- **Frontend:** React, Next.js (with SWR for data fetching), CSS Modules
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Sequelize ORM)
- **Authentication:** Passport.js, JSON Web Tokens (JWT), bcryptjs
- **Payments:** Stripe API and webhooks
- **DevOps:** Git, Docker, Google Cloud Run, Vercel, AWS
- **Storage:** Google Cloud Storage for image hosting

---

## Features

- **Product Catalog:** Dynamic product listings with images, descriptions, and customer reviews.
- **User Dashboard:** Personalized space for order history, payment status, and profile settings.
- **Secure Checkout:** Stripe integration for accurate tax calculations and reliable, PCI-compliant payment processing.
- **Authentication & Authorization:** JWT-based authentication with role-based access control.
- **Order Management:** Automated order confirmation and webhook-driven fulfillment.
- **Deployment:** Frontend on Vercel, backend on Google Cloud Run, PostgreSQL on AWS RDS, and image storage on Google Cloud.

---

## System Architecture

Pearlion is designed with a service-oriented architecture to ensure modularity and performance:

- **Frontend:** Next.js with server-side rendering (SSR) for improved SEO and performance.
- **Backend:** Express.js handles RESTful APIs, business logic, and Stripe webhook integration.
- **Database:** PostgreSQL stores relational data including users, products, and orders.
- **Storage:** Product images are hosted on Google Cloud Storage.
- **Deployment:** 
  - Frontend: Vercel (automatic CI/CD from GitHub)
  - Backend: Google Cloud Run (Dockerized Node.js service)
  - Database: AWS RDS for high availability and scalability

---

## Getting Started

### Prerequisites

- Node.js v14 or higher
- PostgreSQL database
- Stripe developer account

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/charquaza/pearlion.git
   cd pearlion
   ```

2. **Install dependencies:**

   - **Backend:**
     ```bash
     cd server
     npm install
     ```

   - **Frontend:**
     ```bash
     cd ../client
     npm install
     ```

3. **Set up environment variables:**

   - For the backend, create a `.env` file in the `server` directory and add the following:

     ```env
     FRONTEND_DOMAIN=your_frontend_url

     DB_DATABASE=your_database_name
     DB_USERNAME=your_database_username
     DB_PASSWORD=your_database_password
     DB_HOST=your_database_host
     DB_PORT=your_database_port
     DB_DIALECT=postgres

     JWT_SECRET=your_jwt_secret
     JWT_EXPIRES_IN=your_jwt_time_until_expiration

     STRIPE_API_KEY=your_stripe_api_key
     STRIPE_ENDPOINT_SECRET=your_stripe_endpoint_secret
     ```

   `FRONTEND_DOMAIN` will be `localhost` in development.  
   `STRIPE_API_KEY` can be obtained by creating a Stripe developer account ([learn more here](https://docs.stripe.com/keys)).  
   `STRIPE_ENDPOINT_SECRET` is used with webhooks ([learn more here](https://docs.stripe.com/webhooks)).  

   - For the frontend, create a `.env` file in the `client` directory and add:

     ```env
     NEXT_PUBLIC_API_URL=your_backend_url
     NEXT_PUBLIC_STRIPE_API_KEY=your_public_stripe_api_key
     ```

   `NEXT_PUBLIC_API_URL` will be `localhost` in development.  
   `NEXT_PUBLIC_STRIPE_API_KEY` can be obtained by creating a Stripe developer account ([learn more here](https://docs.stripe.com/keys)).

4. **Run the development servers:**

   - **Backend:**
     ```bash
     cd ../server
     npm run devstart
     ```

   - **Frontend (in a new terminal):**
     ```bash
     cd ../client
     npm run dev
     ```

   Both the frontend and backend will be available on `localhost` (ports may vary based on your configuration).

---

## Future Enhancements

- **Admin Dashboard:** Build UI for managing inventory, users, and analytics.
- **Wishlist & Favorites:** Enhance user engagement and shopping experience with wishlist and favorites.
- **Search & Filter Tools:** Improve product discovery with tags, categories, and fuzzy search.

---

## Development Timeline

### 2025

- **Week 30 (Mar 17 - Mar 23):** Store images in Google Cloud, refactor authentication from sessions and cookies to JWT

- **Week 29 (Mar 10 - Mar 16):** Research options to improve website speed (slow image loading)

- **Week 28 (Mar 3 - Mar 9):** Deploy Pearlion

### 2024

- **Week 27 (Dec 22 - Dec 28):** Finalize styling, fine-tune checkout process (including storing purchase data in database for later reference by Stripe, since Stripe paymentIntent cannot store this data)

- **Week 26 (Dec 15 - Dec 21):** Connect signup page to API, continue styling and responsive styling for cart and checkout

- **Week 25 (Dec 8 - Dec 14):** Continue polishing styling, add responsive styling

- **Week 24 (Dec 1 - Dec 7):** Polish styling

- **Nov 11 - Nov 30:** _take time off for family responsibilities_

- **Week 23 (Nov 10 - Nov 16):** Style orders table on account page  
  _Busy with family responsibilities_

- **Week 22 (Nov 3 - Nov 9):** Integrate Stripe Tax API, build account page (frontend and backend to fetch order history), implement functionality to edit reviews and images

- **Week 21 (Oct 27 - Nov 2):** Add guest user for guest checkout, integrate Stripe webhooks for logging orders to database

- **Week 20 (Oct 20 - Oct 26):** Implement frontend checkout flow (get items from localStorage, delete after checkout, etc.), research more into Stripe API and webhooks for interacting with database after checkout

- **Oct 13 - Oct 19:** _1 week break_

- **Week 19 (Oct 6 - Oct 12):** Research checkout methods, Stripe API; create checkout page and form; integrate Stripe API to backend and connect to frontend

- **Week 18 (Sep 29 - Oct 5):** Fetch reviews from API (connect frontend to backend for reviews), connect cart to API

- **Week 17 (Sep 22 - Sep 28):** Review database schema after recent changes (remove unnecessary join tables, add associations to Sequelize, etc.), connect API to frontend (including home page for products, get from database and not hardcoded file)

- **Week 16 (Sep 15 - Sep 21):** Add seeder for products and images, allow filtering of getAll call to product controller (by category, status, etc.)

- **Week 15 (Sep 8 - Sep 14):** Handle image upload and storage on frontend and backend (CRUD), add product seeder to migrate from hardcoded project demo data to data stored in database (excluding images)

- **Week 14 (Sep 1 - Sep 7):** Research methods to store images in database (multer, binary data/buffers, etc.)

- **Week 13 (Aug 25 - Aug 31):** Connect login to API; add not found page and account page; add images and reviews models, routes, controllers to database

- **Aug 18 - Aug 24** Continue researching data fetching methods

- **Week 12 (Aug 11 - Aug 17):** Add seeder file for users, learn about data fetching with Next.js (SWR)

- **Aug 4 - Aug 10:** _1 week break_

- **Week 11 (Jul 29 - Aug 3):** Implement popover view for reviews for larger image viewing

- **Week 10 (Jun 16 - Jun 22):** Add image slideshow for all reviews section of product and individual reviews

- **Week 9 (Jun 2 - Jun 8):** Implement dynamic rating bar (calculates average rating from all reviews and displays it using star SVGs)

- **Week 8 (May 19 - May 25):** Implement new review form, including creating SVG for review stars

- **Week 7 (May 12 - May 18):** Implement cart functionality and review pagination

- **Week 6 (Apr 21 - Apr 27):** Build login popover, finalize fonts

- **Week 5 (Mar 17 - Mar 23):** Build product details page, sign up page, cart page

- **Week 4 (Mar 10 - Mar 16):** Build frontend skeleton, find and edit photos for products, start building the base of all pages (except product details, sign up, cart)

- **Week 3 (Mar 3 - Mar 9):** Add user, product, order routes and controllers; set up authentication

- **Feb 25 - Mar 2:** _take time off for family responsibilities_

- **Week 2 (Feb 18 - Feb 24):** Set up database and models

- **Week 1 (Feb 4 - Feb 17):** Learn about relational database (Postgres) and Sequelize, design database schema for Pearlion (join tables, primary/foreign keys, datatypes, etc.)