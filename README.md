# Garden Glimpse

A comprehensive full-stack web application for **gardening enthusiasts and professionals** to share, discover, and engage with gardening knowledge. Users can find `insightful tips`, `plant care advice`, `seasonal guides`, and techniques while contributing to a vibrant gardening community. Users can share their gardening knowledge, interact with others, and explore premium content through seamless payment integration.


## Table of Contents

- [Garden Glimpse](#garden-glimpse)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Core Features](#core-features)
  - [Usage](#usage)
  - [Technologies Used](#technologies-used)
  - [Key Objectives](#key-objectives)
  - [Purpose and Goal](#purpose-and-goal)
    - [Goals:](#goals)
  - [Installation Guideline](#installation-guideline)
    - [Prerequisites](#prerequisites)
    - [Frontend Installation](#frontend-installation)
    - [Backend Installation](#backend-installation)
  - [Contributing](#contributing)

## Project Overview

**Garden Glimpse** is designed for gardening lovers to share their experiences and discover insights from others. This full-stack web application enables users to:

- Create and share gardening tips, guides, and images.
- Access premium content via payment integration.
- Engage in social activities such as upvoting, commenting, and following other users.
- Enjoy an interactive community experience with micro animations, infinite scroll, and a rich text editor.

## Core Features

1.  **User Authentication**: Secure login, registration, and profile management using `JWT`.
2.  **Rich Text Editor**: Create and edit gardening tips and guides with support for multimedia content.
3.  **Social Interaction**: `Upvoting`, `commenting`, `following users`, and `premium content access`.
4.  **Payment Integration**: Enable premium features via `AAMARPAY`.
5.  **News Feed**: A dynamic news feed with infinite scrolling and sorting based on upvotes.
6.  **PDF Generation**: Users can `generate PDFs` of gardening tips for offline use.
7.  **Profile Verification**: Profiles can be verified after achieving specific milestones (e.g., 5+ upvotes on posts).
8.  **Admin Dashboard**: Manage users, content, and payments.
9.  **Gardening Quotes**: Inspirational quotes to add a positive touch to the user experience.

## Usage

- **Login/Registration**: Users can register with an email and password, then log in.
- **Create a Post**: Use rich text editor to create gardening tips or guides. Attach images for more visual content.
- **Upvote/Comment**: Users can upvote, comment on, or reply to comments on posts.
- **Follow Users**: Follow other gardening enthusiasts to see their posts in your feed.
- **Premium Content**: Make payments to access exclusive gardening content.
- **Admin Dashboard**: Admin users can manage posts, payments, and users from the admin panel.
- **PDF Generation**: Generate a PDF version of posts for offline use.

## Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/) for building a dynamic and responsive user interface, styled with [Tailwind CSS](https://tailwindcss.com/) for a modern look.
- **Backend**: [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/) for creating a scalable and robust server-side application.
- **Database**: [MongoDB](https://www.mongodb.com/) for efficient data storage and management.
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) for secure user authentication and authorization processes.
- **Payment Integration**: [AAMARPAY](https://aamarpay.com/) for handling secure payment processing.
- **Rich Text Editor**: [Quill](https://quilljs.com/) or [Slate.js](https://slatejs.org/) for enabling rich text editing capabilities in user-generated content.
- **Hosting**: [Vercel](https://vercel.com/) for deploying both frontend and backend applications, ensuring reliable performance.

## Key Objectives

- **User-Friendly Interface**: Create an intuitive and easy-to-navigate interface for users to search, view, and share gardening content.
- **Community Engagement**: Enable social interactions such as upvoting, commenting, and following to foster a vibrant gardening community.
- **Secure Transactions**: Implement secure payment processing for premium content access and user authentication to protect sensitive information.
- **Responsive Design**: Ensure the application is fully responsive and functional across different devices and screen sizes.
- **Rich Content Creation**: Integrate a rich text editor for users to create and share multimedia gardening tips and guides.
- **Admin Management**: Provide tools for administrators to effectively manage users, posts, and payments.
- **Dynamic Content Display**: Implement a news feed that displays the latest gardening content with infinite scrolling and filtering options.
- **Profile Verification**: Enable users to achieve verification status to unlock premium features and enhance credibility.

## Purpose and Goal

The primary purpose of **Garden Glimpse** is to create a vibrant online community where gardening enthusiasts and professionals can share their knowledge, experiences, and resources. By providing a platform that facilitates interaction, collaboration, and access to valuable gardening content, we aim to enhance the overall gardening experience for users.

### Goals:

- **Foster Community Engagement**: Build a supportive community where users can connect, share tips, and inspire one another through gardening experiences.
- **Provide Valuable Resources**: Offer a wealth of gardening information, including tips, guides, and seasonal advice, to help users improve their gardening skills.
- **Encourage Knowledge Sharing**: Enable users to contribute their own insights and experiences, promoting a culture of learning and collaboration.
- **Support User Growth**: Create opportunities for users to verify their expertise and access premium content, helping them grow within the gardening community.
- **Streamline Access to Information**: Develop an intuitive platform that makes it easy for users to find, create, and share gardening knowledge, enhancing their overall experience.

## Installation Guideline

### Prerequisites

- **Node.js**

- **MongoDB**

- **Yarn or npm**

### Frontend Installation

1.  **Clone the repository**:

```bash
git clone https://github.com/nirjhorsaha/garden-glimpse.git
cd garden-glimpse
```

2.  **Install dependencies**:

```bash
npm install
```

3.  **Create a `.env` file** in the root directory and add necessary configuration variables:

```bash
# MongoDB connection string
MONGODB_URI=mongodb://<username>:<password>@<host>:<port>/<database>

# JWT secret for authentication
JWT_SECRET=your_jwt_secret

# Payment gateway keys
AAMARPAY_KEY=your_aamarpay_key

# Base URL for API
API_BASE_URL=http://localhost:5000/api

# Next.js environment settings
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4.  **Start the development server**:

```bash
npm run dev
```

5.  **Build the project for production**:

```bash
npm run build
```

6. Start the production server:

```bash
npm run start
```

### Backend Installation

1.  **Clone the repository**:

```bash
git clone https://github.com/nirjhorsaha/garden-glimpse-server.git
cd garden-glimpse-server
```

2.  **Install dependencies**:

```bash
npm install
```

3.  **Create a `.env` file** in the root directory and add necessary configuration variables:

```bash
PORT = 5000
DB_URL = <your_mongodb_connection_uri>
JWT_SECRET = <your_jwt_secret>
```

4.  **Start the development server**:

```bash
npm run dev
```

## Contributing

Contributions are welcome.! If you'd like to contribute to this project, please follow these steps:

- Fork the repository.

- Create your feature branch: `git checkout -b feature-name`.

- Commit your changes: `git commit -m 'Add some feature'`.

- Push to the branch: `git push origin feature-name`.

- Submit a pull request.
