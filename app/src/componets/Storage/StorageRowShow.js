import React from 'react';
import {connect} from 'react-redux';
import { TableRowColumn, TableRow } from 'material-ui/Table';
import ActionButtonDelete from '../tools/ActionButtonDelete'
import ActionButtonEdit from '../tools/ActionButtonEdit'
import {Storage, Confirm as ConfirmAction} from '../../const/Events'
import {Confirm} from '../../const/Messages'
import AlertStatus from '../../const/AlertStatus'
import {del} from '../../api/Storage'
import {styleDataLabel, styleRow, styleBlockInCell, styleArea} from '../../const/Styles'

const StorageRowShow = (state) => {
	const row = state.row;
	const onDelete = id => {
		state.confirm(id, ()=> new Promise((ok, bad) =>
			del(id)
				.then(r => ok(true))
				.catch(e => {
					state.showAlert(Storage.move, AlertStatus.BAD);
					bad();
				})
		));
	};

	const showDesc = (row) => {
		if (!row.desc || !row.desc.length)
			return '';

		return (
			<div>
				<span style={styleDataLabel}>Description:</span><br/>
				<textarea  rows='4' style={styleArea} readOnly={true} defaultValue={row.desc} />
			</div>
		);
	}

	return (
		<TableRow >
			<TableRowColumn style={styleRow}>
				<div style={styleBlockInCell}>
					<div>
						<ActionButtonDelete id={row.id} onTouch={onDelete}/>
						<ActionButtonEdit id={row.id} onTouch={state.onEdit}/>
					</div>
				</div>
				<div style={styleBlockInCell}>
					<span style={styleDataLabel}>Category :</span> {state.categories.list[row.category]} <br/>
					<span style={styleDataLabel}>Title    :</span> {row.title} <br/>
					<span style={styleDataLabel}>Login    :</span> {row.login} <br/>
					<span style={styleDataLabel}>Pass     :</span> {row.pass} <br/>
					<span style={styleDataLabel}>Answer   :</span> {row.answer}
					{showDesc(row)}
				</div>
			 </TableRowColumn>
		</TableRow>
	);
};

export default connect(
	state => ({
		store: state.storage,
		categories : state.storageCategories
	}),
	dispatch => ({
		onEdit : id => dispatch({type : Storage.modeEdit, data : id}),
		confirm : (id, backPromise) => dispatch({
			type : ConfirmAction.show,
			data : {
				actionCancel       : Storage.moveCancel,
				actionConfirm      : Storage.move,
				question           : Confirm.question,
				dataConfirm        : id,
				callPromiseConfirm : backPromise
			}
		})
	})
)(StorageRowShow);
