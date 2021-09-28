exports.handler = async (event, context) => {
    const guides = [
      { title: 'Beat all Zelda Bosses Like a Boss', author: 'mario' },
      { title: 'Mario Kart Shortcuts You Never Knew Existed', author: 'luigi' },
      { title: 'Ultimate Street Fighter Guide', author: 'chun-li' },
    ]
    
    // this contains the user info, it it's truthy it means that user is logged in 
    if (context.clientContext.user) {
      // fetch data & then return
      return {
        statusCode: 200,
        body: JSON.stringify(guides)
      }
    }
  
    // return error status
    return {
      statusCode: 401,
      body: JSON.stringify({ mssg: 'ah ah ah, you must be logged into see this' })
    }
  
  }