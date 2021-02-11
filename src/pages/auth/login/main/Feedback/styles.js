import styled from 'styled-components'

import colors from '../../../../../themes/colors'

export const FeedbackStyles = styled.div`
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

    @media(max-width: 1199px){
        margin-bottom: 20px;

        img{
            height: 12px;
            margin-right: 5px;
        }

        span{
            font-size: 14px;
            line-height: 12px;
            color: ${colors.error};
        }
    }
`
