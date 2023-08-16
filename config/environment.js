const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key: 'something',
    db: 'codeial_db',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'Shivrk3745',
            pass: 'ndqtlcpiizaugzul'
        }
    },
    google_client_id: "1030323171628-re7bms9vbvta6ulvco0l39lqa4smot79.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:5000/user/auth/google/callback",
    jwt_secret: 'codial',
}


const production = {
    name : 'production'
}


module.exports = development;