# MERN H2SHOP

# Start 24/7 ->

1. Create-react-app
2. SetUp
   1. Npm i sass
3. List Products
   1. Create products array
   2. Add Product images
   3. Render products
   4. Style Products
4. Add Routing
   1. npm i react-route-dom
   2. Create file route
   3. Create route for product
5. Create Node.JS Server
   1. Run npm init in root folder
   2. Update package.json set type: module
   3. Add .js to imports
   4. npm install express
   5. Create server.js
   6. Add start command as node backend/server.js
   7. Require express
   8. Create route for / return backend is ready
   9. Move product.js from frontend to backend
   10. Create route for /api/products
   11. return products
   12. run npm start
6. Fetch Products From Backend
   1. set proxy in package.json
   2. npm install axios
   3. use state hook
   4. use effect hook
   5. use reducer hook
7. Manage State By Reducer Hook
   1. define reducer
   2. update fetch data
   3. get state from usReducer
8. Add bootstrap UI Framework
   1. npm install react-bootstrap bootstrap
   2. update App.js
9. Create Product and Rating Component
   1. Create rating component
   2. Create product component
   3. Use rating component in Product component
10. Create product details screen
    1. Fetch product from backend
    2. Create 3 columns for image, info and action
11. Create Loading and Message Component
    1. Create loading component
    2. Use spinner component
    3. Create message component
    4. Create utils.js to define getError function
12. Implement Add to cart
    1. Create react context
    2. Define reducer
    3. Create Store Provider
    4. Implement add to cart button click handler
13. Create Cart Page
    1. Create 2 columns
    2. Display items list
    3. Create action column
14. Complete Cart
    1. Click handler for inc/dec item
    2. Click handler remove item
    3. Click handler for checkout
15. Create SignIn Screen
    1. Create sign in form
    2. Add email and password
    3. Add SignIn button
16. Connect to MongoDB Database
    1. Create atlas mongodb database
    2. Connect to mongodb database
17. Seed Sample Data
    1. Create Product Model
    2. Create User Model
    3. Create Seed Route
    4. Use Route in Server.js
    5. Seed Sample Product
18. Seed Sample Users
    1. Create User Model
    2. Seed Sample Users
    3. Create User Routes
19. Create SignIn Backend API
    1. Create SignIn API
    2. Npm install jsonwebtoken
    3. Define generateToken
20. Complete SignIn Screen
    1. Handle Submit Action
    2. Save token in store and local storage
    3. Show user name in header
21. Create Shipping Screen
    1. Create form inputs
    2. Handle save shipping address
    3. Add checkout wizard bar
