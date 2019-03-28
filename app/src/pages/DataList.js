import React from 'react';
import Layout from '../Components/AuthLayout/Layout'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "../Components/DataList/TableFrame";

const DataList = (state) => {
	return (
		<Layout title="Data List">
			<Grid container>
				<Grid item>
					<Paper>
						<Table/>
					</Paper>
				</Grid>
			</Grid>
		</Layout>)
};

export default DataList
