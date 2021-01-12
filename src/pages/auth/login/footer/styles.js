import styled from 'styled-components'

export const FooterStyles = styled.footer`
    grid-area: footer;
    padding: 40px 0px 40px 50px;

    a:hover, a:active, a:focus{
        text-decoration: underline;
    }

    @media(max-width: 1199px){
        font-size: 14px;
        padding: 30px 0px 30px 30px;
    }
`