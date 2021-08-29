module.exports = app => {
    const FormSchema = new app.mongoose.Schema({
        name: { type: String, required: true },
        profession: { type: String, required: true },
        birthDate: { type: Date, required: true },
        maritalStatus: { type: String, required: true },
        gender: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        address: {
            cep: { type: String, required: true },
            street: { type: String, required: true },
            neighborhood: { type: String, required: true },
            city: { type: String, required: true },
            uf: { type: String, required: true }
        },
        documents: {
            rg: { type: String, required: true },
            cpf: { type: String, required: true, unique: true },
            vehicle: { type: String, required: true },
            cnh: { type: String, required: true },
        }

    })

    const model = app.mongoose.model('Forms', FormSchema);

    return { model }
}