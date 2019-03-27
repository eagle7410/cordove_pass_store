import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {
	PREFIX_ACCOUNT as PREFIX,
	PREFIX_ALERT as ALERT,
	PREFIX_CATEGORIES as CATEGORIES,
	PREFIX_STORE as STORE
} from '../../const/prefix';

import {PathAfterAuth} from '../../const/path';
// MD
import Button from '@material-ui/core/Button';
import ApplyIco from '@material-ui/icons/LockOpen';
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';
import {Firebase, LocalStore,} from '../../Api';

const SingUp = (state) => {
	const {classes} = state;
	const {
		newCredentials,
		credentials,
	} = state.store;

	const {
		email,
		password,
		isShowConfig,
		isShowPassword,
		config,
		isLoad
	} = newCredentials;

	const loadIndicator = isLoad ? <CircularProgress size={24}/> : <span/>;

	const handlerApply = async () => {
		state.configLoadRun();

		try {
			if (!email.length) {
				return state.showError('Email is required')
			}

			if (!password.length) {
				return state.showError('Password is required')
			}

			if (!config.length) {
				return state.showError('Credentials is required')
			}

			let configObj = {};

			try {
				const {apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId} = JSON.parse(config);
				configObj = {apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId}
			} catch (e) {
				return state.showError(`Error parse config: ${e.message || e}`)
			}

			for (let prop of Object.values(configObj)) if (!prop) return state.showError('Credentials is invalid');
			const user = await Firebase.authUser(configObj, email, password);

			if (!user) throw new Error('User not found');
			if (user.isAnonymous) throw new Error('Bad user authorization in firebase');

			state.addCredential(email, password, configObj);

			LocalStore.setItem('credentials', JSON.stringify(credentials.concat([{
				email,
				password,
				credential: configObj
			}])));

			const {store, categories} = await Firebase.getData();

			state.setCategories(categories);
			state.setStore(store);

			state.history.push(PathAfterAuth);

		} catch (e) {
			state.showError(`Error load config: ${e.message || e}`);
		} finally {
			state.configLoadStop();
		}
	};

	return (
		<main className={classes.main}>
			<CssBaseline/>
			<Paper className={classes.paper}>

				<FormControl margin='normal' required fullWidth>
					<InputLabel htmlFor='email'>Email</InputLabel>
					<Input id='email' name='email' autoFocus
					       value={email}
					       onChange={event => state.changeEmail(event.target.value)}
					/>
				</FormControl>

				<FormControl className={classNames(classes.margin, classes.textField)} fullWidth>
					<InputLabel htmlFor='adornment-password'>Password</InputLabel>
					<Input
						id='adornment-password'
						type={isShowPassword ? 'text' : 'password'}
						value={password}
						onChange={event => state.changePassword(event.target.value)}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									aria-label='Toggle password visibility'
									onClick={state.toggleShowPassword}
								>
									{isShowPassword ? <Visibility/> : <VisibilityOff/>}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>

				<FormControl className={classNames(classes.margin, classes.textField)} fullWidth>
					<InputLabel htmlFor='adornment-config'>Credentials</InputLabel>
					<Input
						id='adornment-config'
						type={isShowConfig ? 'text' : 'password'}
						value={config}
						onChange={event => state.changeConfig(event.target.value)}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									aria-label='Toggle config visibility'
									onClick={state.toggleShowConfig}
								>
									{isShowConfig ? <Visibility/> : <VisibilityOff/>}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>

				<FormControl margin='normal' fullWidth>
					<Button variant='contained' color='primary'
					        onClick={handlerApply}
					        className={classes.button}
					        disabled={!email.length || !config.length || !password.length || isLoad}
					        fullWidth
					>
						Apply
						<ApplyIco className={classes.extendedIcon}/>
						{loadIndicator}
					</Button>
				</FormControl>
			</Paper>
		</main>
	)
}

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 360,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
	},
	button: {
		margin: theme.spacing.unit
	},
	extendedIcon: {
		margin: theme.spacing.unit
	},
	input: {
		display: 'none'
	}
});

export default connect(
	state => ({
		store: state.Account
	}),
	dispatch => ({
		setStore: (data) => dispatch({type: `${STORE}Set`, data}),
		setCategories: (data) => dispatch({type: `${CATEGORIES}Set`, data}),
		addCredential: (email, password, credential) => dispatch({
			type: `${PREFIX}AddCredential`,
			data: {email, password, credential}
		}),
		changeEmail: (value) => dispatch({type: `${PREFIX}ChangeEmail`, value}),
		changePassword: (value) => dispatch({type: `${PREFIX}ChangePassword`, value}),
		changeConfig: (value) => dispatch({type: `${PREFIX}ChangeConfig`, value}),
		toggleShowConfig: () => dispatch({type: `${PREFIX}ToggleShowConfig`}),
		toggleShowPassword: () => dispatch({type: `${PREFIX}ToggleShowPassword`}),
		configLoadRun: () => dispatch({type: `${PREFIX}ConfigLoadRun`}),
		configLoadStop: () => dispatch({type: `${PREFIX}ConfigLoadStop`}),
		showError: (message) => dispatch({type: `${ALERT}OpenError`, message}),
		showOk: (message) => dispatch({type: `${ALERT}OpenOk`, message})
	})
)(withRouter(withStyles(styles)(SingUp)))
