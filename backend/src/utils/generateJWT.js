import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) =>{
   
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    // Cookie options: in production we need secure + SameSite=None for cross-site cookies.
    // For local development, avoid secure:true since localhost is not https.
    const cookieOptions = {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production'
    }

    res.cookie("jwt", token, cookieOptions)
    return token
}