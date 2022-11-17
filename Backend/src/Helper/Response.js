const Success = (res, data, transactionId) => {

    const response = {
        status : true,
        code : 200,
        transactionId : transactionId,
        data : data
    }
    res.json(response)
}

const Failed = (res, data, transactionId) => {

    const response = {
        status : false,
        code : 404,
        transactionId : transactionId,
        data : data
    }
    res.json(response)
}

module.exports = {
    Success,
    Failed,
}
