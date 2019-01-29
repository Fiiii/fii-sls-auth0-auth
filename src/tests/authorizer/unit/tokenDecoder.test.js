import TokenDecoder from '../../../handlers/authorizer/tokenDecoder'

describe('TokenDecoder', () => {
  const event = {
    type: 'TOKEN',
    authorizationToken: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFUUkNRekJHUVRrMk5EQXlOVFkwUVRoQk1qZ3dNVVZGUkVNNVFUUkRSa1kzTnpBeE4wVXpNdyJ9.eyJpc3MiOiJodHRwczovL2ZpaS5hdXRoMC5jb20vIiwic3ViIjoiTUNBOTNrbVF0WDJYa1BYZEtXU1d4Ymh0MzZRU1h2VzdAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZmlpLWF1dGgtZGV2LyIsImlhdCI6MTU0ODE2OTg2NCwiZXhwIjoxNTQ4MjU2MjY0LCJhenAiOiJNQ0E5M2ttUXRYMlhrUFhkS1dTV3hiaHQzNlFTWHZXNyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.FEk4N3N8Rw7KFk1IHnKXY82CnKvA0IxLJsuyD8w-u9ynJ5DEJPO-E_QMdghVX34hiFIyQJj5lAGxYYxGsSR0bF91uk7l1-aplsnZ-I9H5W8Icbdi5S0dx4Xj6S6e9AKKWb2-Ce0nMpnJGRYz2qbzFQHZ8uhwl7qvrkeLqL4DVi6IiiwPAK7dVqBZxUyMGz32hPZ0-Hq3P66dcfbOup4mwugMkpCQuANFm26JF5L6FdbivfRSW9YW0kLUv-FmSzVWzFG3cy6390FjxaOZYmlZYJP7Q-DIDnrC5fcitPaOV0N-J0Ktz1XKzMEiBtVpzpeXzofCflRCTSQMCWLmXzglgA'
  }

  describe('getToken method', () => {
    describe('With proper bearer', () => {
      it('Returns proper matched token', async () => {
        const tokenDecoder = new TokenDecoder(event)
        tokenDecoder.getToken = jest.fn(() => 'proper token')
        const matchedToken = tokenDecoder.getToken(event)
        console.log(matchedToken)
      })
    })
  })

  describe('decodeJWT method', () => {

  })

  describe('generateSignKey method', () => {

  })
})
