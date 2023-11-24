const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const app = express();
const path = require('path');


const morgan = require('morgan');
const cors = require('cors');
app.use(cors());

// const accessLogStream = fs.createWriteStream(
//     path.join(__dirname, 'access.log'),
//     { flags: 'a' }
// );


// app.use(
//     helmet({
//       contentSecurityPolicy: false,
//     })
//   );



// const csp = {
//     directives: {
//         defaultSrc: ["'self'"],
//         imgSrc: ["'self'", "https://checkout.razorpay.com", "https://api.razorpay.com"],
//         frameSrc: ["'self'", "https://checkout.razorpay.com", "https://api.razorpay.com", "https://lumberjack-cx.razorpay.com"],
//         connectSrc: ["'self'", "https://lumberjack-cx.razorpay.com"],
//         scriptSrc: ["'self'", "http://65.0.125.89:3000", "https://checkout.razorpay.com", "https://api.razorpay.com/", "https://api.razorpay.com/", "'nonce-2726c7f26c'"],
//     },
// };

// app.use(helmet({
//     contentSecurityPolicy: csp,
// }));
// app.use(morgan('combined', { stream: accessLogStream }));

require('dotenv').config()

const User = require('./model/signup');
const Expense = require('./model/data');
const Order = require('./model/order');
const Request = require('./model/ForgotPasswordRequests');
const Link = require('./model/downloadfilelink');

app.set('view engine', 'ejs');
app.set('views', 'views');

const callRoute = require('./route/expense');
const signupRoute = require('./route/signup');
const purchaseRoute = require('./route/purchase');
const premiumRoute = require('./route/premium');
const forgetPasswordRoute = require('./route/passwordretrive');
const reportRoute = require('./route/reportgenerate');

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(signupRoute);
app.use(callRoute);
app.use(purchaseRoute);
app.use(premiumRoute);
app.use(forgetPasswordRoute);
app.use(reportRoute);

app.use((req,res) => {
    res.sendFile(path.join(__dirname, `public/login.html`));
})

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Request);
Request.belongsTo(User);

User.hasMany(Link);
Link.belongsTo(User);

// sequelize.sync({force:true})
sequelize.sync()
    // sequelize.sync({alter:true})
    .then(result => {
        console.log('app started');
        app.listen(3000);
    })
    .catch(err => console.log(err));