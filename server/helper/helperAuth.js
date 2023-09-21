import bcrypt from 'bcrypt';

export const hashedpwd=async(password)=>{
    const saltpwd=10;
    const hashpwd=await bcrypt.hash(password,saltpwd);
    return hashpwd;
}
export const comparepwd=async(password,hashpwd)=>{
    const comparepwd=await bcrypt.compare(password,hashpwd);
    return comparepwd;
}