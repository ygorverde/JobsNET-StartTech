const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .catch(e => {
        const msg = 'ERRO!! Não foi possível conectar com o MongoDB'
        console.log(msg)
    })

