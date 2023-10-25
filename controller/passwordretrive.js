
exports.sendEmail = async (req, res, next) => {
    try {
        const Sib = require('sib-api-v3-sdk');

        require('dotenv').config();
        // console.log(req.body.email);

        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.API_KEY;
        console.log(process.env.API_KEY);
        // apiKey.apiKey =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;

        const transEmailApi = new Sib.TransactionalEmailsApi();

        const sender = {
            email: 'gyan.p3008@gmail.com'
        }

        const receivers = [{
            email: req.body.email
        },]

        const promise = await transEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Testing forget password functionality',
            textContent: 'If received email then successful'
        })
        console.log(promise);
        res.status(201).json({message:'Email sent', datas:promise});

    }
    catch (err) {
        console.log(err);
        res.status(500).json({error:err, message:'Not able to send email'})
    }
}