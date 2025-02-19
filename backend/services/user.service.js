import userModel from '../models/user.model.js'

export const createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All feilds are required')
    }
    // console.log("email: ", email);

    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })
    // console.log(user);

    return user
}