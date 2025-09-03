# MeetUsAr Dashboard

A modern, full-stack web application built with Next.js 15 that provides a comprehensive dashboard for user authentication and management. This application features a beautiful UI with authentication flows, user profile management, and role-based access control.

## 🚀 Features

### Authentication & Authorization
- **Secure Login System**: Email/password authentication with form validation
- **JWT Token Management**: Secure token-based authentication with HTTP-only cookies
- **Route Protection**: Middleware-based route protection for authenticated routes
- **Automatic Redirects**: Smart redirects based on authentication status
- **Session Management**: Persistent login sessions with automatic token refresh

### User Management
- **User Profile Display**: Comprehensive user information dashboard
- **Role-Based Access**: Support for different user roles (Employee/Customer)
- **Organization & Shop Management**: Multi-tenant support with organization and shop IDs
- **User Status Tracking**: Active user status monitoring
- **Profile Initials**: Dynamic avatar generation with user initials

### User Interface
- **Modern Design**: Clean, responsive UI with glassmorphism effects
- **Form Validation**: Real-time form validation with error handling
- **Loading States**: Comprehensive loading indicators and states
- **Toast Notifications**: User-friendly success/error notifications
- **Responsive Layout**: Mobile-first responsive design
- **Dark/Light Theme Support**: Built-in theme switching capabilities

### State Management
- **Redux Toolkit**: Centralized state management for authentication
- **Context API**: React Context for user information sharing
- **Async Thunks**: Efficient async action handling for API calls
- **Error Handling**: Comprehensive error state management

## 🛠️ Technologies Used

### Frontend Framework
- **Next.js 15.2.4**: React framework with App Router
- **React 19.0.0**: Latest React with concurrent features
- **TypeScript 5**: Type-safe development

### UI & Styling
- **Tailwind CSS 4**: Utility-first CSS framework
- **Material-UI (MUI) 7.3.2**: React component library
- **Bootstrap 5.3.3**: Additional UI components
- **Styled Components 6.1.16**: CSS-in-JS styling
- **Lucide React**: Modern icon library
- **ABeeZee Font**: Google Fonts integration

### State Management
- **Redux Toolkit 2.6.1**: Predictable state container
- **React Redux 9.2.0**: React bindings for Redux
- **React Context API**: Component-level state sharing

### Form Handling
- **Formik 2.4.6**: Form library with validation
- **React Toastify 11.0.5**: Toast notification system

### HTTP Client
- **Axios 1.8.4**: Promise-based HTTP client
- **Custom Axios Instances**: Configured for API and server-side requests

### Development Tools
- **ESLint 9**: Code linting and formatting
- **PostCSS**: CSS processing
- **Turbopack**: Fast bundler for development

### Analytics & Performance
- **Vercel Analytics 1.5.0**: Web analytics
- **Vercel Speed Insights 1.2.0**: Performance monitoring

## 📁 Project Structure

```
src/
├── app/
│   ├── _components/           # Reusable UI components
│   │   ├── dashboardContent/  # Dashboard-specific components
│   │   └── LoginForm/         # Authentication form
│   ├── _contexts/            # React Context providers
│   ├── _redux/               # Redux store and slices
│   │   ├── services/         # API service configurations
│   │   └── slices/           # Redux slices (AuthSlice)
│   ├── _types/               # TypeScript type definitions
│   ├── _utils/               # Utility functions
│   ├── api/                  # Next.js API routes
│   │   └── auth/             # Authentication endpoints
│   ├── dashboard/            # Dashboard page
│   ├── login/                # Login page
│   └── globals.css           # Global styles
├── lib/                      # Library utilities
└── middleware.ts             # Next.js middleware
```

## 🔧 API Endpoints

### Authentication Routes
- `POST /api/auth/login` - User login
- `GET /api/auth/loggedInUser` - Get current user info
- `POST /api/auth/logOut` - User logout

### External API Integration
- **Base URL**: `https://api-yeshtery.dev.meetusvr.com/v1`
- **Login Endpoint**: `/yeshtery/token`
- **User Info Endpoint**: `/user/info`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MeetUsAr-Task
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 🔐 Authentication Flow

1. **Login Process**:
   - User enters email and password
   - Form validation ensures proper input format
   - API call to external authentication service
   - JWT token stored in HTTP-only cookie
   - User redirected to dashboard

2. **Route Protection**:
   - Middleware checks for authentication token
   - Unauthenticated users redirected to login
   - Authenticated users accessing login redirected to dashboard

3. **User Session**:
   - Token automatically included in API requests
   - User information fetched and stored in Redux
   - Session persists across browser refreshes

## 🎨 UI/UX Features

- **Glassmorphism Design**: Modern translucent card effects
- **Gradient Avatars**: Dynamic user initials with gradient backgrounds
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Loading Animations**: Smooth loading states and transitions
- **Error Handling**: User-friendly error messages and validation
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔒 Security Features

- **HTTP-Only Cookies**: Secure token storage
- **CSRF Protection**: Built-in Next.js CSRF protection
- **Input Validation**: Client and server-side validation
- **Error Sanitization**: Safe error message handling
- **Route Protection**: Middleware-based access control

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Breakpoint System**: Tailwind CSS responsive utilities
- **Flexible Layouts**: Adaptive component sizing
- **Touch-Friendly**: Optimized for touch interactions

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Configure environment variables if needed
   - Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to MeetUsAr.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using Next.js, React, and modern web technologies**