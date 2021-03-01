import styled from 'styled-components'

import colors from '../../../../themes/colors'

export const AsideStyles = styled.aside`
    grid-area: aside;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: ${colors.green};

    &:hover{
        cursor: pointer;
        background: ${colors.green_hover};
    }

    &.disabled{
        background: ${colors.gray_c};
        cursor: unset;
    }

    @media(max-width: 991px){
        img{
            height: 36px;
        }
    }
`