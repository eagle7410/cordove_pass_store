import React from 'react';

import Paper from '@material-ui/core/Paper'

import Layout from '../Components/AuthLayout/Layout'
import Table from '../Components/Categories/TableFrame'
import Grid from '@material-ui/core/Grid';

const Categories = (state) => {
	return (
		<Layout title="Categories">
			<Grid container>
				<Grid item md={3}>
					<Paper>
						<Table/>
					</Paper>
				</Grid>
			</Grid>
		</Layout>)
};

export default Categories
