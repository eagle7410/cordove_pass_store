import React from 'react';
import {connect} from 'react-redux';
// MD
import Tooltip from '@material-ui/core/Tooltip';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CopyIcon from '@material-ui/icons/FileCopy';
import ShowIcon from '@material-ui/icons/Visibility';
import HideIcon from '@material-ui/icons/VisibilityOff';
// My
import {
	PREFIX_ALERT as ALERT,
	PREFIX_STORE as PREFIX,
	PREFIX_STORE_ADD as STORE_ADD
} from '../../const/prefix'
import {
	Firebase
} from '../../Api'

const TableRowAction = (state) => {
	const row = state.row;

	const handleCopy = () => {
		try {

			const $buffer = document.createElement('textarea');
			$buffer.innerHTML = row.pass;
			document.body.appendChild($buffer);
			$buffer.select();
			document.execCommand('copy');
			$buffer.remove();
		} catch (e) {
			state.showError("Error copy to buffer");
		}
	};

	const handleToggleShowPassword = () => state.toggleShowPassword(row.id);

	const handleDataEdit = ($ev) => {
		$ev.preventDefault();
		state.openEdit(row);
	};

	const handleDataDelete = async ($ev) => {
		$ev.preventDefault();
		if (!window.confirm()) return false;

		try {
			await Firebase.removeByKey('store', row.dbId);
			state.remove(row);
		} catch (e) {
			state.showError(e.message || e);
		}
	};

	return (
		<span>
			<Tooltip title="Delete">
				<Button onClick={($ev) => handleDataDelete($ev)}>
					<DeleteIcon key={`icoDel${row.id}`}/>
				</Button>
			</Tooltip>

			<Tooltip title="Edit">
				<Button onClick={($ev) => handleDataEdit($ev)}
				>
					<EditIcon key={`icoEdit${row.id}`}/>
				</Button>
			</Tooltip>

			<Tooltip title="Copy password">
				<Button onClick={($ev) => handleCopy($ev)}
				>
					<CopyIcon key={`icoCopy${row.id}`}/>
				</Button>
			</Tooltip>

			<Tooltip title={row.isShowPassword ? 'Hide password' : 'Show password'}>
				<Button onClick={($ev) => handleToggleShowPassword($ev)}>
					{row.isShowPassword ? <HideIcon/> : <ShowIcon/>}
				</Button>
			</Tooltip>
		</span>
	);
};

export default connect(
	state => ({
		store: state.Store
	}),
	dispatch => ({
		openEdit: (data) => dispatch({type:`${STORE_ADD}Edit`, data}),
		remove: (data) => dispatch({type:`${PREFIX}Remove`, data}),
		toggleShowPassword: (data) => dispatch({type:`${PREFIX}ToggleShowPass`, data}),
		showError: (message) => dispatch({type: `${ALERT}OpenError`, message}),
	})
)(TableRowAction);

