import styled from 'styled-components'
import colors from '../../../../themes/colors'

export const FooterStyles = styled.footer`
    grid-area: footer;
    padding: 40px 0px 40px 50px;

    a, span{
        color: ${colors.dark}
    }

    a:hover, a:active, a:focus,
    span:hover, span:active, span:focus{
        text-decoration: underline;
        cursor: pointer;
    }

    @media(max-width: 1199px){
        font-size: 14px;
        padding: 30px 0px 30px 30px;
    }

    @media(max-width: 991px){
        font-size: 14px;
        padding: 0px 0px 0px 30px;
    }
`