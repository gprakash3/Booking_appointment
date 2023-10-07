const User = require('../model/user');

//adding user to database
exports.postAddUser = async (req, res, next) => {
    try {
        //if phone number not found then throw error
        if(!req.body.aphone){
            throw new Error('Phone number is mandatory');
        }
        const name = req.body.aname;
        const email = req.body.aemail;
        const phone = req.body.aphone;
        //adding object to database
        const userData = await User.create({
            name: name,
            email: email,
            phone: phone
        })
        console.log('data inserted to table');
        res.status(201).json({ userdata: userData });
        // res.redirect('F:\web development\Booking_appointment\reg_page1.html');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

//getting all data of table
exports.getAllData = async (req, res, next) => {
    try {
        const alldata = await User.findAll();
        res.status(201).json({ alldata: alldata });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}

//deleting user data where phone number match in database.
exports.postDeleteUser = async(req,res,next) => {
    try{
        const delphone=req.body.phone;       
        User.findAll({ where: { phone: delphone } })        
        .then(users => {
          return users[0].destroy()
        })
    }
    catch(err){
        console.log('deletion failed from axios');
        res.status(500).json({error:err});
    }
}