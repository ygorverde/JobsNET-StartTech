import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { LottieHome } from '../../components/LottieHome';
import purpleHeartIcon from '../../assets/images/purple-heart.svg';

import api from '../../services/api';

import './styles.css';

export function Home() {
    const [totalForms, setTotalForms] = useState(0);

    useEffect(() => {
        api.get('/form/count').then(resp => {
            setTotalForms(resp.data.count);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div id="home">
            <main id="main">
                <h1>As melhores oportunidades estão aqui</h1>

                <p>Ajudamos pessoas a encontrarem as melhores oportunidades no mercado de trabalho.</p>

                <Link to="/form" className="link">
                    <span></span>
                    <strong>Preencher formulário</strong>
                </Link>
                <span className="total-forms">
                    Já recebemos cerca de {totalForms} formulários. <img src={purpleHeartIcon} alt="Coração roxo"/>
                </span>
            </main>
            <div className="homebackground">
                <LottieHome />
            </div>
        </div>
    );
}