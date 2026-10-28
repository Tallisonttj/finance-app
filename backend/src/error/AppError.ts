 class AppError extends Error { // criei a class que extende do objeto Error 
    statusCode:number // criei uma propriedade que recebe um number 

    constructor(message:string, statusCode:number){ // O construtor cria um item que recebe 
        super(message) // defino com o super que minha class pai receba a mensagem definida na minha classe filho
        this.statusCode = statusCode // defino o codigo de error 
    }
}

export default AppError // exporto o Error 

