import { config } from 'dotenv'

const envFound = config()
if (!envFound) {
  throw new Error("Couldn't find .env file")
}

export default {
  port: Number(process.env.PORT)
}
