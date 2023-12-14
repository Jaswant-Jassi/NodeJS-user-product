require('dotenv').config()
const { connect } = require('mongoose')
const userSchema = require('../schemas/userschema')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const nodeMailer = require('nodemailer')


const allUsers = async (req, res) => {
    try {
        const db = await connect(process.env.MONGO_URI)
        const allUsers = await userSchema.find()
        res.status(201).json({ users: allUsers })

    } catch (error) {
        res.status(400).send(error.message)
    }
}

const userByEmail = async (req, res) => {
    const { email } = req.query;

    try {
        const db = await connect(process.env.MONGO_URI)
        const user = await userSchema.findOne({ email: email })
        res.json({ user })

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const userByID = async (req, res) => {
    const { id } = req.params;

    try {
        const db = await connect(process.env.MONGO_URI)
        const user = await userSchema.findOne({ _id: id })
        res.json({ user })

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        try {
            await connect(process.env.MONGO_URI)
            const checkUser = await userSchema.findOne({ email })
            if (checkUser) {
                const decryptPass = await compare(password, checkUser.password)
                
                if (decryptPass && email ==checkUser.email) {
                    const token = sign({
                        name: checkUser.username,
                        email: checkUser.email,
                        gender: checkUser.gender,
                        joining: checkUser.joining,
                        role : checkUser.role
                    },
                    process.env.JWT_SECRET
                    )
                    res.json({
                        message: "Successfully Login",
                        token
                    })
                } 
                else {
                    res.status(400).json({message: "Incorrect Password"})
                }

            }
            else {
                res.status(404).json({ message: "User Not Found" })
            }
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    else { res.status(400).json({ message: "Required Field Missing" }) }
}

const signup = async (req, res) => {
    const { username, email, password, gender } = req.body;

    if (username && email && password && gender) {
        try {
            const db = await connect(process.env.MONGO_URI)
            const checkUser = await userSchema.exists({ email })
            if (!checkUser) {
                await userSchema.create({ username, email, gender, password: await hash(password, 16) })
            

                try {
                    const config = {
                        service: "gmail",
                        auth: {
                            user: process.env.NEWS_EMAIL,
                            pass: process.env.NEWS_PASS,
                        }
                    }
                
                    const transporter = nodeMailer.createTransport(config)
                
                    if (!email) {
                        res.json({ message: "email required"})    
                    } 
                    else {
                        try {
                            const emailText = {
                                from : process.env.NEWS_EMAIL,
                                to: email,
                                subject: "With Signup",
                                html: "<h1>Ram Ram Sa</h1> <p>User Created Successfully & Email sent Successfully</p>"
                            }
                            const info = await transporter.sendMail(emailText)
                            res.json({ message: "User Created Successfully & Email sent Successfully"})
                        } 
                        catch (error) {
                            res.json({ message: "something is wrong"})    
                        }
                    }
                } 
                catch (error) {
                    res.json({ message: error.message})
                }
            }

            else {
                res.json({
                    message: "user already Exists"
                })
            }
        } 

        catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    else {
        res.status(403).json({
            message: "Required Field Missing"
        })
    };

}

const newsLetter = async (req, res) => {
    

    const {email} = req.body;

    const config = {
        service: "gmail",
        auth: {
            user: process.env.NEWS_EMAIL,
            pass: process.env.NEWS_PASS,
        }
    }

    const transporter = nodeMailer.createTransport(config)

    if (!email) {
        res.json({ message: "email required"})    
    } 
    else {
        try {
            const emailText = {
                from : process.env.NEWS_EMAIL,
                to: email,
                subject: "thank you",
                html: "<h1>Ram Ram Sa"
            }
            const info = await transporter.sendMail(emailText)
            res.json({ message: "Email sent Successfully"})
        } 
        catch (error) {
            res.json({ message: error.message})    
        }
    }
}


const updateProfile = async (req, res) => {
    const { email, username, profile_pic, gender } = req.body;

    try {
        const filter = { email }
        const update = { username, profile_pic, gender }
        const db = await connect(process.env.MONGO_URI)
        const doc = await userSchema.findOneAndUpdate(filter, update, {
            new: true
        });

        res.json({ user: doc, message: "Profile Updated Sucessfully" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })

    }
}


// const deleteUser = async (req, res) => {

//     try {
//         const db = await connect(process.env.MONGO_URI)
//         const deleteUser = await userSchema.findOneAndDelete({ email: req.body.email })
//         const updatedUsers = await userSchema.find()
//         res.json({
//             message: "Successfully Deleted",
//             users: updatedUsers
//         })

//     }

//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }

const deleteUser = async (req, res) => {

    try {
        const db = await connect(process.env.MONGO_URI)
        const deleteUser = await userSchema.findOneAndDelete({ email: req.body.email })
        const updatedUsers = await userSchema.find()
        res.json({
            message: "Successfully Deleted",
            users: updatedUsers
        })

    }

    catch (error) {
        res.status(400).json({ message: error.message })
    }
}


module.exports = { allUsers, userByEmail, userByID, login, signup, newsLetter, updateProfile, deleteUser }
