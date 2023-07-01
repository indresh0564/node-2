const path=require('path');

const express = require('express');

const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const sequelize = require('./util/database');

const Product = require('./models/product');
const costomer = require('./models/User');
const Cart = require('./models/cart');
const Cart_item = require('./models/cart-item');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    costomer.findByPk(1)
    .then((costomer)=>{
       req.costomer = costomer;
       next();
    })
    .catch((err)=>{
        console.log("app.js se ");
        console.log(err);
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(costomer, {constraints: true, onDelete:'CASCADE'});
costomer.hasMany(Product);
costomer.hasOne(Cart);
Cart.belongsTo(costomer);
Cart.belongsToMany(Product, { through : Cart_item } );
Product.belongsToMany(Cart, { through : Cart_item } );

sequelize
// .sync({forse:true})
.sync()
.then((result)=>{
    // console.log(result);
    return costomer.findByPk(1);
})
.then((co)=>{
    if(!co){
         return costomer.create({name:'indresh', email:'dgdgf'});
    }
    return co;
})
.then((costomer)=>{
    // app.listen(3000);
    return costomer.createCart();
})
.then((costomer)=>{
    app.listen(3000);
})
.catch(err=>console.log(err));

