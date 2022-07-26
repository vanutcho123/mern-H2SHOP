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
22. Create SignUp Screen
    1. Create input form
    2. Handle submit
    3. Create backend api
23. Fix Interface
    1. Header
    2. SignIn
    3. SignUp
    4. Shipping address
24. Implement Select Payment Method
    1. Create input forms
    2. Handle Submit
25. Create Place Order Screen
    1. show cart items, payment and address
    2. handle place order action
    3. create order create api
26. Create Order Screen
    1. Create backend api for order/:id
    2. Fetch order api in frontend
    3. Show order information in 2 columns
27. Pay Order By PayPal
    1. generate paypal client id
    2. create api to return client id
    3. install react-paypal-js
    4. use PayPalScriptProvider in index.js
    5. use usePayPalScriptReducer in Order Screen
    6. implement loadPaypalScript function
    7. render paypal button
    8. implement onApprove payment function
    9. create pay order api in backend
28. Display Order History
    1. create order screen
    2. create order history api
    3. use api in the frontend
29. Create Profile Screen
    1. get user info from context
    2. show user information
    3. create user update api
    4. update user info
30. Fix UI
31. Publish to heroku
    1. Create and config node project
    2. Server build folder in frontend folder
    3. Connect it to github
    4. Create mongodb atlas database
    5. Set database connection in heroku env variables
    6. Commit and push
32. Fix UI
33. Create Dashboard Screen
    1. create dashboard ui
    2. implement backend api
    3. connect ui to backend
34. Manage Products
    1. create products list ui
    2. implement backend api
    3. fetch data
35. Create Product
    1. create products button
    2. implement backend api
    3. handle on click
36. Create Edit Product
    1. create edit button
    2. create edit product ui
    3. Display product info in the input boxes
37. Implement Update Product
    1. create edit product backend api
    2. handle update click
38. Upload Product Image
    1. create cloudinary account
    2. use the api key in env file
    3. handle upload file
    4. implement backend api to upload
39. Delete Product
    1. show delete button
    2. implement backend api
    3. handle on click
40. List Orders
    1. create order list screen
    2. implement backend api
    3. fetch and display orders
41. Deliver Order
    1. add deliver button
    2. handle click action
    3. implement backend api for deliver
42. Delete Order
    1. add delete button
    2. handle click action
    3. implement backend api for delete
43. List Users
    1. create user list screen
    2. implement backend api
    3. fetch and display users
44. Edit User
    1. create edit button
    2. create edit product ui
    3. display product info in the input boxes
    4. implement backend api
    5. handle edit click
45. Delete User
    1. add delete button
    2. handle click action
    3. implement backend api for delete
