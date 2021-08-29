import ModalBootstrap from 'react-bootstrap/Modal'
import { LottieSuccess } from '../LottieSuccess';
import purpleHeartIcon from '../../assets/images/purple-heart.svg';

import './styles.css';

type Props = {
    modalShow: boolean;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Modal({ ...props }: Props) {
    const handleClose = () => props.setModalShow(false);

    return (
        <ModalBootstrap
            show={props.modalShow}
            animation={false}
            onHide={handleClose}
        >
            <ModalBootstrap.Header closeButton>
                <ModalBootstrap.Title id="example-custom-modal-styling-title">
                    {/* Formulário enviado com sucesso! */}
                </ModalBootstrap.Title>
            </ModalBootstrap.Header>
            <ModalBootstrap.Body id="lottie">
                <h1>Parabéns!!</h1>
                <h2>Enviado com sucesso!</h2>
                <LottieSuccess />
            </ModalBootstrap.Body>
            <ModalBootstrap.Footer id="footer">
                <div id="icons">
                    <a href="https://github.com/ygorverde" target="_blank" id="github" 
                    rel="noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/ygor-verde/" target="_blank" id="linkedin" 
                    rel="noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://www.instagram.com/ygorverde/" target="_blank" id="instagram" 
                    rel="noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
                <div>
                    por
                    <strong> Ygor Verde</strong>
                    <img src={purpleHeartIcon} alt="Coração roxo" />
                </div>
            </ModalBootstrap.Footer>
        </ModalBootstrap>
    )
}