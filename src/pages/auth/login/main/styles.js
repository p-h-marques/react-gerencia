import styled from 'styled-components'

import colors from '../../../../themes/colors'

export const MainStyles = styled.main`
    padding: 50px 100px 50px 50px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 900px;

    h1{
        font-size: 36px;
        line-height: 60px;
        font-weight: 400;
        color: ${colors.green};
        margin-bottom: 45px;
    }

    input{
        border: 0px;
        border-bottom: 2px solid ${colors.dark};
        width: 100%;
        font-size: 30px;
        line-height: auto;
        color: ${colors.dark};
        padding: 0px 0px 10px 10px;
        margin-bottom: 50px;

        &:focus, &:active, &:hover{
            border-bottom: 2px solid ${colors.green};
        }

        &::placeholder{
            color: ${colors.gray_b};
        }
    }

    div.messages{
        display: flex;
        flex-direction: column;
        padding-left: 30px;
    }

    @media(max-width: 1199px){
        padding: 30px;
        min-height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: unset;

        h1{
            font-size: 26px;
            line-height: 36px;
            margin-bottom: 36px;
        }

        input{
            font-size: 22px;
            padding: 0px 0px 5px 5px;
            margin-bottom: 50px;
        }

        div.messages{
            padding-left: 15px;
        }
    }

    @media(max-width: 767px){
        min-height: unset;
    }

    @media(max-width: 575px){
        h1{
            margin-bottom: 20px;
        }
    }
`