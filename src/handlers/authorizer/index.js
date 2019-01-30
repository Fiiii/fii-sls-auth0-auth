import ApiAuthorizerHandler from './authorizerHandler'

const handler = async (event) => {
  try {
    console.log('Auth')
    const apiAuthorizerHandler = new ApiAuthorizerHandler()
    const policy = await apiAuthorizerHandler._process(event)
    return policy
  } catch (error) {
    console.log(error)
    throw new Error('Unauthorized')
  }
}

export default handler
