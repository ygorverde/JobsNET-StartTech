import axios from 'axios';
import api from '../../services/api';

import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Modal } from '../../components/Modal';

import './styles.css';

type Address = {
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    uf: string;
}

type Documents = {
    rg: string;
    cpf: string;
    vehicle: string;
    cnh: string;
}

const initialAddress: Address = { cep: '', street: '', neighborhood: '', city: '', uf: '' };

const initialDocuments: Documents = { rg: '', cpf: '', vehicle: '', cnh: '' };

export function Form() {
    const [name, setName] = useState('');
    const [profession, setProfession] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [maritalStatus, setMarital] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState(initialAddress);
    const [documents, setDocuments] = useState(initialDocuments)
    const [modalShow, setModalShow] = useState(false);

    async function clear() {
        setName('');
        setProfession('');
        setBirthDate('');
        setMarital('');
        setGender('');
        setPhone('');
        setEmail('');
        setAddress(initialAddress);
        setDocuments(initialDocuments);
    }

    async function searchCep(e: string) {
        if (e.length === 8) {
            try {
                const resp = await axios.get(`https://viacep.com.br/ws/${e}/json/`);
                const { data } = resp;
                if (data.erro) {
                    toast.error('CEP Inválido!')
                } else {
                    setAddress({
                        ...address,
                        cep: e,
                        street: data.logradouro,
                        neighborhood: data.bairro,
                        city: data.localidade,
                        uf: data.uf
                    })
                }
            } catch (error) {
                toast.error('Erro ao consultar CEP!')
            }
        } else {
            setAddress({ ...address, cep: '' })
        }
    }

    // function validateCPF() { // Desabilitado em razão de ser um formulário de teste.
    //     let sum;
    //     let rest;
    //     sum = 0;
    //     let strCPF = documents.cpf;
    //     if (strCPF.length !== 11) return false;
    //     if (strCPF === "00000000000") return false;

    //     for (let i = 1; i <= 9; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    //     rest = (sum * 10) % 11;

    //     if ((rest === 10) || (rest === 11)) rest = 0;
    //     if (rest !== parseInt(strCPF.substring(9, 10))) return false;

    //     sum = 0;
    //     for (let i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    //     rest = (sum * 10) % 11;

    //     if ((rest === 10) || (rest === 11)) rest = 0;
    //     if (rest !== parseInt(strCPF.substring(10, 11))) return false;
    //     return true;
    // }

    async function validateFields() {
        if (address.cep.length !== 8) {
            toast.error('CEP inválido!')
            return false;
        } else if (documents.cpf.length !== 11) {
            toast.error('CPF inválido!')
            return false;
        } else {
            return true
        }

    }

    async function submitForm(e: FormEvent) {
        e.preventDefault();
        if (await validateFields()) {
            try {
                await api.post('/form', {
                    name,
                    profession,
                    birthDate,
                    maritalStatus,
                    gender,
                    phone,
                    email,
                    address,
                    documents
                })
                await clear();
                setModalShow(true);
            } catch (e) {
                if (e && e.response && e.response.data) {
                    toast.error(e.response.data.error);
                } else {
                    toast.error('Ocorreu um erro ao tentar enviar o formulário!')
                }
            }
        }
    }

    return (
        <div id="page-form" onSubmit={submitForm}>
            <Link to="/">
                <span></span>
                <p>Voltar para home</p>
            </Link>
            <Modal modalShow={modalShow} setModalShow={setModalShow}/>
            <form>
                <h1>Formulário do candidato</h1>
                <fieldset>
                    <legend>
                        <h2>Dados pessoais</h2>
                    </legend>
                    <hr />

                    <div className="form-row">
                        <div className="form-group col-md-8">
                            <label>Nome Completo *</label>
                            <input type="name" className="form-control"
                                onChange={e => setName(e.target.value)}
                                value={name}
                                required
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Cargo Pretendido *</label>
                            <input type="name" className="form-control"
                                onChange={e => setProfession(e.target.value)}
                                value={profession}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Data de nascimento *</label>
                            <input id="datepickerfrom" className="form-control" type="date"
                                onChange={e => setBirthDate(e.target.value)}
                                value={birthDate}
                                required
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Estado Civil *</label>
                            <select className="custom-select" value={maritalStatus}
                                onChange={e => setMarital(e.target.value)} required>
                                <option value="" disabled>Selecione..</option>
                                <option value="single">Solteiro</option>
                                <option value="married">Casado</option>
                                <option value="widower">Divorciado</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Sexo *</label>
                            <select className="custom-select" value={gender}
                                onChange={e => setGender(e.target.value)} required>
                                <option value="">Selecione..</option>
                                <option value="mascCis">Masculino Cis</option>
                                <option value="mascTrans">Masculino Trans</option>
                                <option value="femCis">Feminino Cis</option>
                                <option value="femTrans">Feminino Trans</option>
                                <option value="NBINARY">Não Binário</option>
                                <option value="Outro">Outro</option>
                                <option value="nr">Prefiro não responder</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>CEP *</label>
                            <input type="text" className="form-control"
                                placeholder="8 dígitos (números)"
                                value={address.cep}
                                onChange={(e) => setAddress({ ...address, cep: e.target.value })}
                                onBlur={e => searchCep(e.target.value)}
                                maxLength={8}
                                required
                            />
                        </div>
                        <div className="form-group col-md-8">
                            <label>Endereço *</label>
                            <input type="text" className="form-control"
                                placeholder="ex: Nome da Rua, 56."
                                value={address.street}
                                onChange={e => setAddress({ ...address, street: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Estado</label>
                            <input type="text" className="form-control"
                                disabled={true} placeholder="consulte o CEP acima"
                                value={address.uf}
                                onChange={e => setAddress({ ...address, uf: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Bairro *</label>
                            <input type="text" className="form-control"
                                value={address.neighborhood}
                                onChange={e => setAddress({ ...address, neighborhood: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Cidade *</label>
                            <input type="text" className="form-control"
                                value={address.city}
                                onChange={e => setAddress({ ...address, city: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Celular *</label>
                            <input type="text" className="form-control"
                                placeholder="somente números"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                maxLength={11}
                                required
                            />
                        </div>
                        <div className="form-group col-md-8">
                            <label>E-mail *</label>
                            <input type="email" className="form-control"
                                placeholder="ex: seuemail@exemplo.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <legend>
                        <h2>Documentos</h2>
                    </legend>
                    <hr />
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Identidade *</label>
                            <input type="text" className="form-control"
                                placeholder="somente números"
                                value={documents.rg}
                                onChange={e => setDocuments({ ...documents, rg: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>CPF *</label>
                            <input type="text" className="form-control"
                                placeholder="somente números"
                                maxLength={11}
                                value={documents.cpf}
                                onChange={e => setDocuments({ ...documents, cpf: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Veículo? *</label>
                            <select className="custom-select" value={documents.vehicle}
                                onChange={e => setDocuments({ ...documents, vehicle: e.target.value })} required>
                                <option disabled></option>
                                <option value="true">Sim</option>
                                <option value="false">Não</option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label>CNH? *</label>
                            <select className="custom-select" value={documents.cnh}
                                onChange={e => setDocuments({ ...documents, cnh: e.target.value })} required>
                                <option disabled></option>
                                <option value="true">Sim</option>
                                <option value="false">Não</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                <hr />
                <button id="submitButton" type="submit">
                    <strong>Enviar formulário</strong>
                </button>
            </form>
        </div>
    );
}