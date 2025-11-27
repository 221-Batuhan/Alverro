# ALVERRO Backend API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend root:
```env
MONGODB_URI=mongodb://localhost:27017/alverro
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

3. Make sure MongoDB is running:
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)

### User Profile
- `GET /api/user/profile` - Get profile (protected)
- `PUT /api/user/profile` - Update profile (protected)

### Addresses
- `GET /api/user/addresses` - Get all addresses (protected)
- `POST /api/user/addresses` - Add address (protected)
- `PUT /api/user/addresses/:addressId` - Update address (protected)
- `DELETE /api/user/addresses/:addressId` - Delete address (protected)

### Payment Cards
- `GET /api/user/cards` - Get all cards (protected)
- `POST /api/user/cards` - Add card (protected)
- `PUT /api/user/cards/:cardId` - Update card (protected)
- `DELETE /api/user/cards/:cardId` - Delete card (protected)

### Orders
- `GET /api/user/orders` - Get order history (protected)

## Troubleshooting

### MongoDB Connection Errors
- Make sure MongoDB is running
- Check the connection string in `.env`
- The server will start even if MongoDB is not available (in development mode)

### Port Already in Use
- Change the PORT in `.env` or kill the process using port 5000

### JWT Errors
- Make sure JWT_SECRET is set in `.env`
- Tokens are stored in HTTP-only cookies

