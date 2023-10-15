const loginValidate = (req, res, next) => {
    const {login, pass} = req.body
    if (login === undefined || login === '') res.status(400).json({message: "Login field is required!"})
    if (pass === '' || pass === undefined) res.status(400).json({message: "Password field is required!"})
    next()
}

const signInValidate = (req, res, next) => {
    const {login, pass, email, level, admin} = req.body

    if (login === undefined || login === '') res.status(400).json({message: "Login field is required!"})
    if (login.length > 25) res.status(400).json({message: "Login field is too long!"})
    
    if (email === undefined || email === '') res.status(400).json({message: "Email field is required!"})
    if (email.length > 50) res.status(400).json({message: "Email field is too long!"})
    
    if (pass === undefined || pass === '') res.status(400).json({message: "Password field is required!"})
    if (pass.length > 25) res.status(400).json({message: "Password field is too long!"})

    if (level === undefined || level === '') res.status(400).json({message: "Level field is required!"})
    if (level !== '1' && level !== '2') res.status(400).json({message: "Level field must be 1 or 2"})

    if (admin === undefined || admin === '') res.status(400).json({message: "Login field is required!"})
    if (typeof admin !== 'boolean') res.status(400).json({message: "Admin field must have a boolean value!"})


    next()
}

module.exports = {
    loginValidate,
    signInValidate
}