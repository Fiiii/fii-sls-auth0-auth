const handler = async (event) => {
  try {
    return {
      body: JSON.stringify({
        message: 'OK'
      })
    }
  } catch (error) {
    throw new Error('Unauthorized')
  }
}

export default handler
