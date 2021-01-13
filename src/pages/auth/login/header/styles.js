import styled from 'styled-components'

import colors from '../../../../themes/colors'

export const HeaderStyles = styled.header`
    /* border: 1px solid red; */
    grid-area: header;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 40px 0px 40px 50px; //padding-bottom provisório

    .border{
        border-left: 2px solid ${colors.dark};
    }

    img{
        height: 52px;
    }

    div.infos{
        margin-left: 40px;
        padding: 18px 0px 18px 30px;
        display: flex;
        flex-direction: row;
    }

    div.info{
        margin-right: 50px;

        p.title{
            color: ${colors.gray_c};
            line-height: 16px;
            margin-bottom: 5px;
        }

        p.description{
            color: ${colors.green};
            font-weight: 700;
            line-height: 16px;
        }
    }

    @media(max-width: 1199px){
        padding: 30px 0px 30px 30px;

        img{
            height: 40px;
        }

        div.infos{
            margin-left: 30px;
            padding: 10px 0px 10px 20px;
        }

        div.info{
            margin-right: 30px;
        }
    }

    @media(max-width: 991px){
        padding: 20px 0px 20px 30px;
    }
`