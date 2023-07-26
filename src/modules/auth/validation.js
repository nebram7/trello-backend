import joi from "joi"
export const signup= joi.object({
    firstName: joi.string(),
    lastName:joi.string().min(5).max(25),
    userName: joi.string().alphanum().required(),
    email:joi.string().email({
        minDomainSegments:2 , maxDomainSegments:4,
        tlds:{allow:['com', 'edu', 'gov', 'hambozo']}
    }).required(),
    password: joi.string().pattern(
        new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    cPassword: joi.string().valid(joi.ref("password")).required(),

    // age:joi.number().integer().positive().min(18).max(90),
    // flage:joi.boolean().truthy("1").falsy("0").sensitive(),
    // ingredients: joi.array().items(string(),number(),object({
    //     title:joi.string().min(20).max(50)
    // }).required()).min(2).max(20).required()

    // params:joi.object({
    //     flag:joi.boolean().required()
    // })
}).required()


export const login= joi.object({
    email:joi.string().email({
        minDomainSegments:2 , maxDomainSegments:4,
        tlds:{allow:['com', 'edu', 'gov', 'hambozo']}
    }).required(),
    password:joi.string().pattern(
        new RegExp(/^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/)).required()
}).required()