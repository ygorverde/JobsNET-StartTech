module.exports = app => {
    
    app.route('/form')
    .post(app.api.forms.save)
    
    app.route('/form/count')
    .get(app.api.forms.getCount)
    
    app.route('/form/:candidateCPF')
    .get(app.api.forms.getById)
    
    
}