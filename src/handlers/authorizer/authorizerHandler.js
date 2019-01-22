import BaseHandler from '../../lib/BaseHandler'
import TokenDecoder from '../authorizer/tokenDecoder'

export default class ApiAuthorizerHandler extends BaseHandler {
  constructor() {
    super()
  }

  async _process(event, context) {
    const tokenDecoder = new TokenDecoder(event)
    const verifiedJWT = tokenDecoder.decode()

    return {
      principalId: verifiedJWT.sub,
      policyDocument: this.getPolicyDocument('Allow', event.methodArn),
      context: { scope: verifiedJWT.scope }
    }
  }

  getPolicyDocument(effect, resource) {
    const policyDocument = {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      }]
    }

    return policyDocument
  }
}
