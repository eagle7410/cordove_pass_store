import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Head from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const cellProps = {
	tap: "th",
	align:"left"
};
const cellPropsAction = {
	...cellProps,
	align:"right"
};

const TableHead = () => (
	<Head>
		<TableRow >
			<TableCell {...cellPropsAction}>Action</TableCell>
			<TableCell {...cellProps} >Title <br/> Login</TableCell>
			<TableCell {...cellProps} >Password</TableCell>
			<TableCell {...cellProps} >Category</TableCell>
			<TableCell {...cellProps} >Answer</TableCell>
			<TableCell {...cellProps} >Description</TableCell>
		</TableRow>
	</Head>
);

export default TableHead;
