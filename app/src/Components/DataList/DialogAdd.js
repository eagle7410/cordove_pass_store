import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from "@material-ui/core";
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {
	PREFIX_ALERT as ALERT,
	PREFIX_STORE_ADD as PREFIX,
	PREFIX_STORE as STORE,
	PREFIX_CATEGORIES as CATEGORIES,
} from "../../const/prefix";

import {
	Firebase
} from '../../Api'

const FormDialog = (state) => {
	const {classes} = state;

	const {
		id,
		dbId,
		isOpen,
		isLoad,
		title,
		login,
		isShowPassword,
		pass,
		category,
		answer,
		desc,
	} = state.store;

	const {items} = state.categories;
	const {items:rows} = state.data;

	const handleAdd = async () => {
		state.load();

		try {

			const titleLogin = title + login;

			if (!titleLogin.length)
				throw new Error(`Must have login or title`);

			if (category === -1)
				throw new Error('Category is required');

			if (!pass.length)
				throw new Error('Password is required');

			const titleLoginCat = title + login + category;

			if (id !== null) {
				for (let {title, login, category, id:ID} of rows) {
					if (title + login + category === titleLoginCat && ID !==id )
						throw new Error(`In category ${items[category]} has record with title, login: ${title}, ${login}`);
				}

				const record = {
					title     : title.trim(),
					login     : login.trim(),
					pass      : pass.trim(),
					answer    : answer.trim(),
					desc      : desc.trim(),
					id,
					category
				};

				await Firebase.setNew('store', dbId, record);

				state.editInStore(record);

				return state.close();
			}

			for (let {title, login, category} of rows) {
				if (title + login + category === titleLoginCat)
					throw new Error(`In category ${items[category]} has record with title, login: ${title}, ${login}`);
			}

			const record = {
				id        : Date.now(),
				title     : title.trim(),
				login     : login.trim(),
				pass      : pass.trim(),
				answer    : answer.trim(),
				desc      : desc.trim(),
				category
			};

			await Firebase.addNew('store', record);

			state.addToStore(record);

			state.close()

		} catch (e) {
			console.error(e);
			state.showError(e.message || e)
		} finally {
			state.loadStop();
		}
	};

	let Title = 'Add new record';
	let ButtonLabel = 'Add';

	if (id !== null) {
		Title = 'Edit record';
		ButtonLabel = 'Edit';
	}

	return (
		<div>
			<Dialog open={isOpen} onClose={state.close} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">{Title}</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="title"
						label="Title"
						onChange={$ev => state.change('title', $ev.target.value)}
						disabled={isLoad}
						value={title}
						fullWidth
					/>
					<TextField
						autoFocus
						margin="dense"
						id="login"
						label="Login"
						onChange={$ev => state.change('login', $ev.target.value)}
						disabled={isLoad}
						value={login}
						fullWidth
					/>
					<FormControl className={classNames(classes.margin, classes.textField)} fullWidth>
						<InputLabel htmlFor='adornment-password'>Password</InputLabel>
						<Input
							id='adornment-password'
							type={isShowPassword ? 'text' : 'password'}
							value={pass}
							onChange={event => state.change('pass', event.target.value)}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='Toggle password visibility'
										onClick={() => state.toggleShowPassword()}
									>
										{isShowPassword ? <Visibility/> : <VisibilityOff/>}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					<FormControl className={classes.formControlMoreTop} fullWidth>
						<Select
							value={category}
							onChange={$ev => state.change('category', $ev.target.value)}
							inputProps={{name: 'category', id: 'category'}}
						>
							{Object.entries(items).map(([id, name], inx) => (
								<MenuItem value={Number(id)} key={`catNewRecord${inx}`}>{name}</MenuItem>
							))}
						</Select>
						<FormHelperText>Need selected category</FormHelperText>
					</FormControl>
					<TextField
						autoFocus
						margin="dense"
						id="answer"
						label="answer"
						onChange={$ev => state.change('answer', $ev.target.value)}
						disabled={isLoad}
						value={answer}
						fullWidth
					/>
					<TextField
						id="desc"
						label="Description"
						placeholder="Description"
						className={classes.textField}
						rowsMax={10}
						value={desc}
						onChange={$ev => state.change('desc', $ev.target.value)}
						margin="normal"
						multiline
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={state.close} disabled={isLoad} color="primary">
						Cancel
					</Button>
					<Button onClick={handleAdd} disabled={isLoad} color="primary">
						{ButtonLabel}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

//Custom theme styles
const style = theme => ({
	formControlMoreTop : {
		...theme.formControl,
		paddingTop: 15
	}
});

export default connect(
	state => ({
		categories: state.Categories,
		store: state.StoreAdd,
		data: state.Store
	}),
	dispatch => ({
		editInStore        : (data) => dispatch({type : `${STORE}EditRecord`, data}),
		addToStore         : (data) => dispatch({type : `${STORE}AddRecord`, data}),
		toggleShowPassword : () => dispatch({type : `${PREFIX}ToggleShowPassword`}),
		updateCategories   : data => dispatch({type : `${CATEGORIES}Set`, data}),
		load               : () => dispatch({type : `${PREFIX}LoadRun`}),
		loadStop           : () => dispatch({type : `${PREFIX}LoadStop`}),
		close              : () => dispatch({type : `${PREFIX}Close`}),
		change             : (field, value) => dispatch({type : `${PREFIX}ChangeField`, data : {field, value}}),
		showError          : (message) => dispatch({type: `${ALERT}OpenError`, message}),
	})
)(withStyles(style)(FormDialog))
