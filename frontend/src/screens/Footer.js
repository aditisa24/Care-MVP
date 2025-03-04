import React from "react";
import styled from "styled-components";

// ✅ Styled Footer Component
const FooterContainer = styled.footer`
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, #007bff, #0056b3);
    color: white;
    padding: 15px 0;
    text-align: center;
    font-size: 1rem;
    font-weight: 300;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.2);
`;

const Footer = () => {
    return (
        <FooterContainer>
            © {new Date().getFullYear()} Care - Nursing App | All Rights Reserved
        </FooterContainer>
    );
};

export default Footer;
