import express from 'express'
import helmet from 'helmet'
import path from 'node:path'
import cors from 'cors'
import { healthController } from './controllers/health.js'
const app = express()

app.use(
  express.static(path.join(process.cwd(), "uploads"))
);

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get('/health', healthController )

export default app