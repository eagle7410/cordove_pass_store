
import React from 'react';
import {connect} from 'react-redux';

// My cmp
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CopyIcon from '@material-ui/icons/FileCopy';

import {classes} from "../../const/styles";
import Tools from './TableTools'
import {PREFIX_STORE as PREFIX} from "../../const/prefix";

const TableFrame = (state) => {
	const {classes} = state;
	const {
		items,
		page,
		rowsPerPage,
		selected,
		order,
		orderBy
	} = state.store;
	const {items:data} = state.data;

	let rows = [].concat(items);

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const handleChangeRowsPerPage = (event) => state.rowsOnPage(event.target.value);
	const handleChangePage = (event, page) => state.page(page);
	const handleDataDelete = ($ev, category) => {
		$ev.preventDefault();
		console.log('delete category', category);
	};

	return (
		<div>
			<Tools  />
			<div className={classes.tableWrapper}>
				<Table className={classes.table} aria-labelledby="tableTitle">
					<TableBody>
						{stableSort(rows, getSorting(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								const isSelect = selected.includes(n.id);

								return (
									<TableRow
										hover
										role="checkbox"
										aria-checked={isSelect}
										tabIndex={-1}
										key={`cat${n.id}`}
										selected={isSelect}
									>
										<TableCell component="td" scope="row">
											<Button onClick={($ev) => handleDataDelete($ev, n)}
											>
												<DeleteIcon key={`icoDel${n.id}`}/>
											</Button>
											<Button onClick={($ev) => handleDataDelete($ev, n)}
											>
												<EditIcon key={`icoEdit${n.id}`}/>
											</Button>
											<Button onClick={($ev) => handleDataDelete($ev, n)}
											>
												<CopyIcon key={`icoCopy${n.id}`}/>
											</Button>
										</TableCell>
										<TableCell component="td" scope="row">
											{n.title}<br/>
											{n.login}
										</TableCell>
										<TableCell component="td" scope="row">
											{n.pass}
										</TableCell>
										<TableCell component="td" scope="row">
											{n.category}
										</TableCell>
										<TableCell component="td" scope="row">
											{n.answer}
										</TableCell>
										<TableCell component="td" scope="row">
											{n.desc}
										</TableCell>
									</TableRow>
								);
							})}
						{emptyRows > 0 && (
							<TableRow style={{ height: 49 * emptyRows }} key={'catEmpty'} />
						)}
					</TableBody>
				</Table>
			</div>
			<TablePagination
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page',
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page',
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
};

export default connect(
	state => ({
		store: state.Store,
		data: state.Categories
	}),
	dispatch => ({
		page: data => dispatch({type: `${PREFIX}SetPage`, data}),
		rowsOnPage: data => dispatch({type: `${PREFIX}SetRowsOnPage`, data})
	})
)(withStyles(classes)(TableFrame));

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === 'desc'
		? (a, b) => desc(a, b, orderBy)
		: (a, b) => -desc(a, b, orderBy);
}
