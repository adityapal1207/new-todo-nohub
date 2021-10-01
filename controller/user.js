const e = require('express');
const { Model, model } = require('mongoose');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const userController = {
    create: async (req, res) => {
        try {
            const { firstname, email, password, age, dob } = req.body;
            let existingUserMail = await Users.findOne({ email });
            console.log(`user already exist`);
            if (existingUserMail) {
                return res.send({
                    message: "user already exist",
                    status: false
                })
            }
            //const randomUniqueId=Math.floor(Math.random()*1000000)
            const user = new User({
                firstname,
                email,
                password,
                age,
                dob
            })
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            //here we are encrypting the password entered by the user 
            //{{hash()// this is the one way encryption of the password 
            //that means once encrypted can't be decrypted back}}
            //{{here genSalt() is a function to generate the salt and 
            // the numeric value 10 in parameters is used the length of the salt which will be produced}}

            const newUser = await user.save();
            res.send({
                message: "Account created successfully...",
                status: true,
                newUser

            });
        } catch (err) {
            console.log("error", err);
            res.send({
                message: "Account creation Failed...",
                status: false
            })

        }

    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).send({
                    message: "login credentials are not valid",
                    status: false
                });

            }
            let userExist = await Users.findOne({ email });

            if (userExist) {
                const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
                if (isPasswordCorrect) {
                    console.log("passwordIsCorrect");
                    const payload = {
                        user: {
                            id: userExist.id
                        }
                    };console.log("passwordIsCorrec2");
                    const jwtToken = await jwt.sign(payload,
                        config.get('jwtSecretCode'),
                        {expiresIn: 360000});
                        


                    return res.status(200).send({
                        message: "logined successfully..",
                        status: true,
                        token:jwtToken


                    })
                }
            }
            else {
                return res.send({
                    message: "wrong login crdentials...try again",
                    status: false
                });

            }
        } catch (err) {
            res.send({
                message: "Sorry...something went wrong,please try later",
                status: false


            });

        }
    }
}
module.exports = userController;
//Querry functions

// Model.find()//all the records mathing the querry
// Model.update()//to update single records
// Model.updateMany()//updates all the querry
// Model.deleteOne()//deletes on record
// Model.deleteMany()//deletes all the querry
// Model.findById()
// Model.findByIdAndDelete()//finds the record at that Id
// Model.findOneAndDelete()//deletes the single record ,the which is  found first
// Model.FindOneAndUpdate()
// Model.findOneAndReplace() 