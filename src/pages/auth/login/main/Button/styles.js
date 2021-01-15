import styled from "styled-components";

import colors from "../../../../../themes/colors";

export const ButtonStyles = styled.button`
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

    @media(max-width: 1199px){
        button{
            padding: 15px 20px;
            margin-right: 20px;
            font-size: 20px;
            line-height: 20px;
        }
    }

    @media(max-width: 575px){
        button{
            margin: 20px 20px 0px 0px;
        }
    }
`;
