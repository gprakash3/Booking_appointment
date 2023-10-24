const Razorpay = require('razorpay');
const Order = require('../model/order');

const RAZORPAY_KEY_ID = 'rzp_test_TGWQeTflLpor6j';
const RAZORPAY_KEY_SECRET = 'DEMEkIs3azHtk4DbJeV3W2IK';

exports.purchasePremium = async (req, res, next) => {
    try {
        // console.log(process.env.RAZORPAY_KEY_ID , process.env.RAZORPAY_KEY_SECRET);
        var rzp = new Razorpay({
            // key_id: process.env.RAZORPAY_KEY_ID,
            // key_secret: process.env.RAZORPAY_KEY_SECRET
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET
        })
        const amount = 500;

        rzp.orders.create({ amount, currency: 'INR' }, (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({ orderid: order.id,paymentid:'Pending', status: 'PENDING' }).then(() => {
                return res.status(201).json({ order, key_id: rzp.key_id });
            })
                .catch(err => {
                    throw new Error(err);
                })
        })
    }
    catch (err) {
        console.log(err);
        res.status(403).json({ message: 'something went wrong', error: err });
    }
}

exports.updatetransactionstatus = async (req, res, next) => {
    try {
        const { payment_id, order_id } = req.body;
        console.log('updatetransaction request body', req.body);

        const order = await Order.findOne({where:{orderid: order_id}})
        const promise = await order.update({paymentid:payment_id, status:'SUCCESSFUL'});
        const promise2 =await req.user.update({isPremiumUser:true});

        Promise.all([promise, promise2]).then(() => {
            return res.status(202).json({success:true, message:'Transaction successful'});
          });
    }
    catch (err) {
       
        console.log(err);
        res.status(403).json({error:err , message:'something went wrong'});
    }
}

exports.updatefailed = async(req,res,next) => {
    try{
    const order_id  = req.body.order_id;

    const order = await Order.findOne({where:{orderid: order_id}})
    const promise = await order.update({paymentid:'Failed payment', status:'Failed'});
    const promise2 =await req.user.update({isPremiumUser:false});

    Promise.all([promise, promise2]).then(() => {
        return res.status(500).json({success:true, message:'Transaction Failed'});
      });
    }
    catch(err){
        console.log(err);
        res.status(403).json({error:err , message:'something went wrong'});
    }
}