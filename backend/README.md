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

# Iyzico Sandbox Configuration
IYZICO_API_KEY=your_iyzico_sandbox_api_key
IYZICO_SECRET_KEY=your_iyzico_sandbox_secret_key
IYZICO_CALLBACK_URL=http://localhost:5000/api/payments/iyzico/callback
```

**Note:** Get your Iyzico Sandbox credentials from [Iyzico Developer Portal](https://dev.iyzipay.com/tr)

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

### Payments (Iyzico)
- `POST /api/payments/iyzico/initiate` - Initiate payment with Iyzico (protected)
- `POST /api/payments/iyzico/callback` - Iyzico payment callback (public)
- `GET /api/payments/status/:orderId` - Get payment status (protected)

### Products
- `GET /api/products` - Get all products (with optional filters: gender, line, category, isLimitedEdition, featured, search)
- `GET /api/products/donna` - Get Donna products only (with optional filters: featured, isLimitedEdition)
- `GET /api/products/:id` - Get single product by ID
- `POST /api/products` - Create new product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

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

### Iyzico Payment Errors
- Make sure IYZICO_API_KEY and IYZICO_SECRET_KEY are set in `.env`
- Use Iyzico Sandbox test cards for testing
- Test cards: 5528 7900 0000 0000 (Visa), 5456 1600 0000 0000 (Mastercard)
- Expiry: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)

