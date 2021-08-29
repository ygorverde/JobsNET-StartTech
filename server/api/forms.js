module.exports = app => {

    const save = async (req, res) => {
        try {
            if (await app.models.form.model.findOne({ email: req.body.email })) { // CPF exists?
                return res.status(400).send({ error: 'Oops! E-mail já cadastrado!' })
            } else if (await app.models.form.model.findOne({ 'documents.cpf': `${req.body.documents.cpf}` })) {
                return res.status(400).send({ error: 'Oops! CPF já cadastrado!' });
            }

            await app.models.form.model.create(req.body);
            return res.status(201).send({ msg: 'Formulário enviado com sucesso! :)' });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: 'Internal Server Error!' });
        }
    }

    const getById = async (req, res) => {
        try {
            const form = await app.models.form.model.findOne({ 'documents.cpf': `${req.params.candidateCPF}` });
            if (!form){
                return res.status(404).send({ error: 'Formulário não encontrado!'});
            }
                return res.status(200).send({ form });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: 'Internal Server Error!' });
        }
    }

    const getCount = async (req, res) => {
        try {
            const count = await app.models.form.model.countDocuments();
            res.status(200).send({ count });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: 'Internal Server Error!' })
        }
    }

    return { save, getById, getCount }
}