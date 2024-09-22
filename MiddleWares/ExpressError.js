class ExpressError extends Error{//the properties of the Error class is transfered to ExpressError to access the we are using the extends keyword
    constructor(status,message)
    {
        super();
        this.status=status;
        this.message=message;
    }
}

module.exports=ExpressError;