const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500
};

const clientError = (response, message, data) => {
  const jsonResponse = {
    success: false,
    message: message
  }
  return response.status(HTTP_STATUS.BAD_REQUEST).json(jsonResponse)
}

const successDataResponse = (response, data) => {
  const jsonResponse = {
    success: true,
    data: data
  }
  return response.status(HTTP_STATUS.SUCCESS).json(jsonResponse)
}

const createdResponse = (response, message = 'Success') => {
  const jsonResponse = {
    success: true,
    message: message
  }
  return response.status(HTTP_STATUS.CREATED).json(jsonResponse)
}

const successPaginatedDataResponse = (response, data, page, limit) => {
  const jsonResponse = {
    success: true,
    data: {
      results: data.rows,
      limit: parseInt(limit),
      page: parseInt(page),
      total: data.count
    }
  }
  return response.status(HTTP_STATUS.SUCCESS).json(jsonResponse)
}

const serverError = (response, message = 'Something went wrong.') => {
  const jsonResponse = {
    success: false,
    message: message
  }
  return response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(jsonResponse)
}
const setCookiesToResponse = (response, data) => {
  return response.cookie(process.env.APP_NAME, data).send({
    success: true,
    data: data
  })

}
const unAuthorizedResponse = (response) => {
  const jsonResponse = {
    success: false,
    message: "Please login to access"
  }
  return response.status(HTTP_STATUS.SUCCESS).json(jsonResponse)

}
module.exports = {
  successDataResponse,
  successPaginatedDataResponse,
  serverError,
  createdResponse,
  clientError,
  setCookiesToResponse,
  unAuthorizedResponse
}