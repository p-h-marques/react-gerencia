import styled from "styled-components";

import colors from "../../../../../themes/colors";

export const UserInfoStyles = styled.div`
    margin-right: 50px;

    p.title {
        color: ${colors.gray_c};
        line-height: 16px;
        margin-bottom: 5px;
    }

    p.description {
        color: ${colors.green};
        font-weight: 700;
        line-height: 16px;
    }

    @media (max-width: 1199px) {
        margin-right: 30px;
    }

    @media (max-width: 767px) {
        display: none;
    }
`;
