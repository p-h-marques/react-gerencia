import styled from 'styled-components'

import colors from '../../../themes/colors'

export const LoginStyles = styled.div`
	color: black;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;

	.container{
		background: ${colors.light};
		margin-left: 100px;

		display: grid;
		grid-template-columns: 1fr 150px;
		grid-template-rows: auto auto auto;
		grid-template-areas:
			"header aside"
			"main aside"
			"footer aside"
	}

	@media(max-width: 1399px){
		.container{
			margin: 0px auto;
		}
	}

	@media(max-width: 1199px){
		padding: 0px 20px;

		.container{
			width: 100vw;
		}
	}
`