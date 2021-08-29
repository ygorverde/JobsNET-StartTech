import { ReactNode } from "react";

import logoImg from '../../assets/images/logo.png';

import './styles.css';

type LayoutProps = {
    children: ReactNode;
}

export function Template({ children }: LayoutProps) {
    return (
        <div id="template">
            <header>
                <div>
                    <img src={logoImg} alt="Logomarca" />
                    <strong>JobsNET</strong>
                </div>
            </header>
            <main>{children}</main>
        </div>
    );
}