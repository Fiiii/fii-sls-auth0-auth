import * as JWT from 'jsonwebtoken'
import * as jwksClient from 'jwks-rsa'
import * as util from 'util'

export default class TokenDecoder {
  constructor(event) {
    this.token = this.getToken(event)
    this.decodedToken = this.decodeJWT()
  }

  async decode() {
    try {
      const signingKey = await this.generateSignKey()
      const jwtOptions = {
        // audience: process.env.AUDIENCE,
        issuer: process.env.TOKEN_ISSUER_COGNITO
      }

      return await JWT.verify(this.token, signingKey, jwtOptions)
    } catch (error) {
      throw new Error(error)
    }
  }

  async generateSignKey() {
    try {
      const jwks = await jwksClient({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: process.env.JWKS_URI_COGNITO
      })

      const getSigningKey = util.promisify(jwks.getSigningKey)
      const key = await getSigningKey(this.decodedToken.header.kid)
      return key.publicKey || key.rsaPublicKey
    } catch (error) {
      throw new Error(error)
    }
  }

  decodeJWT() {
    const decodedJwt = JWT.decode(this.token, { complete: true })
    if (!decodedJwt || !decodedJwt.header || !decodedJwt.header.kid) {
      throw new Error('invalid token')
    }
    return decodedJwt
  }

  getToken(event) {
    if (!event.type || event.type !== 'TOKEN') {
      throw new Error('Expected "event.type" parameter to have value "TOKEN"')
    }

    const tokenString = event.authorizationToken
    if (!tokenString) {
      throw new Error('Expected "event.authorizationToken" parameter to be set')
    }

    const match = tokenString.match(/^Bearer (.*)$/)
    if (!match || match.length < 2) {
      throw new Error(`Invalid Authorization token - ${tokenString} does not match "Bearer token"`)
    }
    return match[1]
  }
}
