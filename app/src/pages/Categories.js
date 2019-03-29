import React from 'react';

import Paper from '@material-ui/core/Paper'

import Layout from '../Components/AuthLayout/Layout'
import Table from '../Components/Categories/TableFrame'
import DialogAdd from '../Components/Categories/DialogAdd'
import Grid from '@material-ui/core/Grid';

const Categories = () => {
	return (
		<Layout title="Categories">
			<Grid container>
				<Grid item md={5}>
					<Paper>
						<Table/>
						<DialogAdd />
					</Paper>
				</Grid>
			</Grid>
		</Layout>)
};

export default Categories
