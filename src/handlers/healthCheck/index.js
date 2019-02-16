import { getConnection } from '/opt/dbconnection/dbconnector'

const handler = async (event) => {

  console.log(await getConnection())
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
