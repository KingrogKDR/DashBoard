# DashBoard

A modern Next.js dashboard application with authentication, protected routes, and data visualization.

## Overview

This project is a comprehensive dashboard built with Next.js that features user authentication, protected routes, and various data visualization components. It provides a clean interface for monitoring and analyzing data, with a focus on security and performance.

## Features

- **User Authentication**: Secure login system with JWT token management
- **Protected Routes**: Client and server-side route protection
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Server-Side Rendering**: Enhanced performance and SEO with Next.js SSR
- **Modern UI**: Clean, intuitive interface built with modern design principles

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [React](https://reactjs.org/) - Frontend library with Shadcn UI components
- [JWT](https://jwt.io/) - Authentication token management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KingrogKDR/DashBoard.git
   cd DashBoard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add necessary environment variables:
   ```
   NEXT_PUBLIC_ADMIN_USERNAME=your_admin_username
   NEXT_PUBLIC_ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_admin_password
   JWT_SECRET=your_jwt_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```
/
├── app/                # Next.js app directory
│   ├── login/          # Loginroutes
│   ├── profile/        # profile pages
│   ├── settings/       # settings pages
│   └── layout.jsx      # Root layout component
│   └── providers.jss   # Providers component
│   └── services.jsx    # for server-side functions
├── components/         # Reusable React components
├── hooks/              # Reusable React hooks
├── lib/                # Utility functions and helpers
├── public/             # Static assets
```

## Authentication Implementation

The application uses JWT for authentication. The authentication flow works as follows:

1. User logs in through the `/login` page
2. Upon successful authentication, a JWT token is stored in localStorage 
3. Protected routes check for valid JWT tokens

## Deployment

This application can be deployed to Vercel.

```bash
npm run build
# or
yarn build
```
