module.exports = {
    "google": {
        "client_id": process.env.GOOGLE_CLIENT_ID,
        "project_id":"smiling-basis-194307",
        "auth_uri":"https://accounts.google.com/o/oauth2/auth",
        "token_uri":"https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": process.env.GOOGLE_CLIENT_SECRET
    },
    "mongoose":{
        "uri" : process.env.MONGOOSE_URI
    },
    "cookieSession": {
        "key": process.env.COOKIESESSION_KEY
    },
    "stripe": {
        "publishable_key": process.env.STRIPE_PUBLISHABLE_KEY,
        "secret_key": process.env.STRIPE_SECRET_KEY
    },
    "sendGrid":{
        "api_key": process.env.SENDGRID_API_KEY,
        "redirect": "https://frozen-hamlet-54218.herokuapp.com"
    }
};
