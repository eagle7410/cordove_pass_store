import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
	PREFIX_CATEGORY_ADD as PREFIX,
} from "../../const/prefix";

const FormDialog = (state) => {
	const {
		isOpen,
		name
	} = state.store;

	return (
		<div>

			<Dialog open={isOpen} onClose={state.close} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add category</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Category name"
						onChange={$ev => state.change($ev.target.value)}
						value={name}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={state.close} color="primary">
						Cancel
					</Button>
					<Button onClick={state.close} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default connect(
	state => ({
		store: state.CategoryAdd
	}),
	dispatch => ({
		close  : () => dispatch({type : `${PREFIX}Close`}),
		change : data => dispatch({type : `${PREFIX}ChaneName`, data}),
	})
)(FormDialog)
