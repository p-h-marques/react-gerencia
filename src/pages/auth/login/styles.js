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
			grid-template-columns: 1fr 120px;
			width: 100vw;
		}
	}

	@media(max-width: 991px){
		padding: 0px;

		.container{
			width: 100vw;
			height: 100vh;

			grid-template-columns: auto;
			grid-template-rows: 100px auto 40px 80px;
			grid-template-areas:
				"header"
				"main"
				"footer"
				"aside"
		}
	}
`