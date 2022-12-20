exports.success = (res,msg,data) => {
    const statusCode = 200;
    const respObj =  {
        statusCode,
        error:false,
        message:msg || "OK",
        data:data
    }
    res.status(statusCode).json(respObj);
}

exports.notFound = (res,msg,data) => {
    const statusCode = 404;
    const respObj =  {
        statusCode,
        error:true,
        message:msg || "Not found",
        data:data
    }
    res.status(statusCode).json(respObj);
}

exports.customError = (res,msg,data,statusCode) => {
    const respObj =  {
        statusCode: statusCode || 400,
        error:true,
        message:msg || "Error",
        data:data
    }
    res.status(200).json(respObj);
}

exports.internalServerError = (res,msg,data) => {
    const statusCode = 500;
    const respObj =  {
        statusCode,
        error:true,
        message:msg || "Internal Server Error",
        data:null
    }
    res.status(statusCode).json(respObj);
}

exports.validationError = (res,msg,data) => {
    const statusCode = 442;
    const respObj =  {
        statusCode,
        error:true,
        message:msg || "Validation Error",
        data:data || null
    }
    res.status(statusCode).json(respObj);
}

exports.unAuthorized = (res,msg,data) => {
    const statusCode = 401;
    const respObj =  {
        statusCode,
        error:true,
        message:msg || "Unauthorized",
        data:data || null
    }
    res.status(statusCode).json(respObj);
}

exports.forbidden = (res,msg,data) => {
    const statusCode = 403;
    const respObj =  {
        statusCode,
        error:true,
        message:msg || "Forbidden",
        data:data || null
    }
    res.status(statusCode).json(respObj);
}