class ApiResponse{
    constructor(
        status,
        message,
        data,
        success=true,
    ){
            this.status= status 
            this.message= message 
            this.data= data
            this.success= true
    }
}

export { ApiResponse}