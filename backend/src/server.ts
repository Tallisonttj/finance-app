
import app from './app.js'
import { iniciarCronJob } from './services/crowService.js'


iniciarCronJob()
app.listen(3000, () => {
    console.log('servidor rodando em http://localhost:3000/')
})