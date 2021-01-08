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
        margin-bottom: 45px;;
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

    div.message{
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;

        img{
            height: 16px;
            margin-right: 10px;
        }

        span{
            line-height: 16px;
            color: ${colors.error};
        }
    }

    button{
        padding: 20px 30px;
        margin-right: 25px;
        font-size: 24px;
        line-height: 24px;
        border-radius: 0px;
        border: 1px solid ${colors.green};
        background: ${colors.light};
        color: ${colors.green};

        &:hover, &:focus, &:active{
            background: ${colors.gray_a};
        }

        &.highlight{
            background: ${colors.green};
            color: ${colors.light};

            &:hover, &:focus, &:active{
                background: ${colors.green_hover};
            }
        }
    }
`