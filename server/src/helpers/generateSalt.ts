import { genSalt } from "bcrypt"
export default async () => await genSalt(parseInt(process.env.SAlT_ROUNDS as string))