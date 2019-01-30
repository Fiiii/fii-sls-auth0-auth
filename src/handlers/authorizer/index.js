import ApiAuthorizerHandler from './authorizerHandler'

const handler = async (event) => {
  try {
    console.log('Auth')
    const apiAuthorizerHandler = new ApiAuthorizerHandler()
    return await apiAuthorizerHandler._process(event)
  } catch (error) {
    console.log(error)
    throw new Error('Unauthorized')
  }
}

export default handler
