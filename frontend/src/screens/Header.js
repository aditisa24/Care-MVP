import React from "react";
import styled from "styled-components";

// ✅ Styled Header Component
const HeaderContainer = styled.header`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: linear-gradient(to right, #007bff, #0056b3);
    color: white;
    padding: 25px 0;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
`;

const Title = styled.h1`
    margin: 0;
    font-size: 2.5rem;
    font-weight: bold;
`;

const Subtitle = styled.p`
    margin: 5px 0 0;
    font-size: 1.2rem;
    font-weight: 300;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Title>CARE - NURSING APP</Title>
            <Subtitle>Your Trusted Healthcare Partner</Subtitle>
        </HeaderContainer>
    );
};

export default Header;
