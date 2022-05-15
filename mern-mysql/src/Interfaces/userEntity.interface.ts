
export default interface userModelInterface {
    name: string,
    email: string
    password: string,
    role: string,
    createdAt: Date,
    resetPasswordToken: any,
    resetPasswordExpire: any,
    comparePassword(candidatePassword: string): Promise<boolean>,
    getJWTToken: any,
    getResetPasswordToken: any
} 