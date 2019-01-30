import * as JWT from 'jsonwebtoken'
import * as jwksClient from 'jwks-rsa'
import * as util from 'util'

export default class TokenDecoder {
  constructor(event) {
    console.log('EVENT:', event)
    this.token = this.getToken(event)
    this.decodedToken = this.decodeJWT()
  }

  async decode() {
    console.log('Decoding')
    console.log('token', this.token)
    console.log('decodedToken', JSON.stringify(this.decodedToken, null, 4))
    try {
      const signingKey = await this.generateSignKey()
      const jwtOptions = {
        audience: process.env.AUDIENCE,
        issuer: process.env.TOKEN_ISSUER
      }

      const verifiedJWT = await JWT.verify(this.token, signingKey, jwtOptions)
      console.log('event', { event })
      console.log('verifiedJWT', { verifiedJWT })
      return verifiedJWT
    } catch (error) {
      throw new Error(error)
    }
  }

  async generateSignKey() {
    try {
      console.log('before jwks')
      const jwks = await jwksClient({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: process.env.JWKS_URI
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
