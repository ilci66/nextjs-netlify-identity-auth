// think of this as writing server side code without the server side 
// this is going to be used by netlify to create the api point for me
exports.handler = async () => {
    // for viewing later
    console.log('function ran')

    const data = { name: 'mario', age: 35, job: "plumber" }

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}
// don't forget to include this functions.js file in the netlify.toml 