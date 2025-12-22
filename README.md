# BCard - Business Card Management Platform

A modern web application for creating, sharing, and managing digital business cards. Built with React and TypeScript, BCard provides a seamless experience for businesses to showcase their information online.

## 🎯 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Business Card Management**: Create, read, update, and delete business cards
- **Business Card Details**: Display comprehensive information including contact details, location, and business number
- **Search Functionality**: Real-time search across all business cards
- **Favorites System**: Save and manage favorite business cards
- **User Profiles**: Customize and manage personal profile information
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Role-Based Access**: Different permission levels for Regular, Business, and Admin users
- **Admin CRM System**: Comprehensive user management panel for administrators
- **Responsive Design**: Fully responsive interface optimized for all device sizes
- **Location Integration**: Display business locations with embedded maps

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+
- **Language**: TypeScript
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: Context API
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS3 with CSS Variables
- **Icons**: React Icons
- **Build Tool**: Vite

## 📦 Project Structure

```
src/
├── components/ # React components
│ ├── Navbar.tsx # Navigation bar
│ ├── Footer.tsx # Footer component
│ ├── Card.tsx # Business card display
│ ├── ProtectedRoute.tsx # Route protection wrapper
│ └── pages/ # Page components
│ ├── Home.tsx
│ ├── Login.tsx
│ ├── Register.tsx
│ ├── CardDetail.tsx
│ ├── CreateCard.tsx
│ ├── EditCard.tsx
│ ├── MyCards.tsx
│ ├── Favorites.tsx
│ ├── Profile.tsx
│ ├── CRM.tsx
│ └── About.tsx
├── context/ # Context API
│ ├── AuthContext.tsx # Authentication context
│ └── ThemeContext.tsx # Theme management
├── services/ # API services
│ └── api.ts # API client configuration
├── types/ # TypeScript interfaces
│ └── index.ts # Type definitions
├── hooks/ # Custom React hooks
│ ├── useAuth.ts
│ ├── useTheme.ts
│ └── useCards.ts
├── styles/ # CSS stylesheets
│ ├── index.css
│ ├── navbar.css
│ ├── cards.css
│ └── forms.css
├── App.tsx # Main app component
└── main.tsx # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/bcard.git
cd bcard
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🔐 Test Credentials

### Admin Account
- **Email**: admin@gmail.com
- **Password**: Abc!123Abc
- **Role**: Admin (full system access)

### Business Accounts
- **Email**: margol@gmail.com
- **Password**: Thering2@

- **Email**: margol1@gmail.com
- **Password**: Thering2@

- **Email**: margol2@gmail.com
- **Password**: Thering2@

### Create Your Own Account
1. Click "Register"
2. Fill in your details
3. Choose account type:
   - **Regular**: View and favorite cards
   - **Business**: Create and manage business cards

## 📱 User Roles

### Regular User
- View all business cards
- Search for cards
- Like/favorite cards
- Manage personal profile
- Access favorites list

### Business User
- All Regular User features
- Create new business cards
- Edit their own cards
- Delete their own cards
- Manage their profile

### Admin User
- All Business User features
- Access CRM system
- View all users
- Change user status (Regular ↔ Business)
- Delete users (except other admins)

## 🌐 API Endpoints

Base URL: `https://bcard-ojqa.onrender.com`

### Authentication
- `POST /users/login` - User login
- `POST /users/register` - User registration
- `POST /users` - Create new user (alias for register)

### Users
- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user profile
- `DELETE /users/:id` - Delete user (admin only)
- `PATCH /users/:id` - Change user status (admin only)

### Cards
- `GET /cards` - Get all cards
- `GET /cards/:id` - Get card by ID
- `GET /cards/user/:userId` - Get cards by user
- `POST /cards` - Create new card (business only)
- `PUT /cards/:id` - Update card (business owner only)
- `DELETE /cards/:id` - Delete card (business owner only)
- `PATCH /cards/:id` - Like/Unlike card

## 🎨 Features Details

### Dark Mode
- Toggle between light and dark themes
- Preference is saved to localStorage
- Smooth transition between modes

### Search Functionality
- Real-time search across all cards
- Search by card title and description
- Shows matching results in dropdown
- Navigate directly from search results

### Business Card Details
Each business card displays:
- Business name and subtitle
- Description
- Contact information (phone, email, website)
- Business address with location map
- Business registration number
- Like count and favorited status

### User Profiles
Users can:
- View their personal information
- Edit name, phone, address
- Update profile image
- View account type (Regular/Business)

### CRM System (Admin Only)
Administrators can:
- View all users in a table
- See user details (name, email, phone, account type)
- Change user status from Regular to Business
- Delete users (except other admins)
- View total user count

## 🔒 Security Features

- JWT token-based authentication
- Secure password requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character (!@#$%^&*-_)
- Tokens stored in localStorage
- Automatic redirect on authentication errors
- Protected routes based on user role

## 📝 Form Validation

All forms include:
- Real-time validation feedback
- Visual indicators for valid/invalid fields
- Helpful error messages
- Required field indicators
- Proper input type restrictions

## 🌍 Localization

The application supports:
- English (primary language)
- Hebrew (partial)
- Russian (partial)

## 📱 Responsive Design

The application is optimized for:
- Desktop computers (1920px and above)
- Tablets (768px - 1024px)
- Mobile devices (320px - 767px)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"
6. Your app will be live with a unique URL

### Deploy to Other Platforms

The project can also be deployed to:
- Netlify
- GitHub Pages
- Heroku
- AWS
- Azure

## 🐛 Known Issues

- Some external image URLs may not load due to CORS restrictions
- Dark mode toggle requires page refresh to fully apply in some cases

## 🔄 Future Enhancements

- Advanced filtering and sorting options
- User messaging system
- Card analytics and statistics
- Social media sharing
- Multiple language support
- Card templates
- QR code generation for cards
- Email notifications
- Two-factor authentication

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Created with Leonid Rubinshteyn using React and TypeScript

## 📞 Support

For support, please contact:
- Email: support@bcard.com
- Website: https://bcard.com

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Status**: Active Development
