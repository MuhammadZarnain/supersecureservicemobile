const textflow = require("textflow.js");
textflow.useKey("GFnIZ9tw8Vm30CXn4MgKakyYDqbfbYnJd0oayIRofijy8KcDvqs0l4r7CdmKtofl"); // dont forget to change this

const sendVerificationCode = async(req, res) =>{

    const {phone_number} = req.body;

    const verificationOptions ={
        service_name: 'Super Secure Services',
        seconds: 600,
    }

    const result = await textflow.sendVerificationSMS(phone_number, verificationOptions);

    return res.status(result.status).json(result.message)

}

const verifyCode = async(req, res) =>{

    const {phone_number, code} = req.body;


    let result = await textflow.verifyCode(phone_number, code); 

    if(result.valid)
    {
        // your server logic
        return res.status(200).json(result.message)
    }
    return res.status(result.status).json(result.message)
    }



module.exports={
    sendVerificationCode,
    verifyCode
}