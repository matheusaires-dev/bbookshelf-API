const apiResponse = {
    success: (data?: any, message?:string) => ({ success: true, data, message }),
    fail: (message: string) => ({ success: false, message }),
}

export default apiResponse;
