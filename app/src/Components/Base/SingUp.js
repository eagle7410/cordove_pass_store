import React from 'react';
import {connect} from 'react-redux';
import {
	PREFIX_ALERT as ALERT
} from '../../const/prefix'

//MD
import Button from '@material-ui/core/Button';
import ApplyIco from '@material-ui/icons/LockOpen';
import {PREFIX_ACCOUNT as PREFIX} from "../../const/prefix";
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import FormControl from "@material-ui/core/FormControl";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

const SingUp = (state) => {
	const { classes } = state;
	const {
		newCredentials
	} = state.store;

	const {
		label,
		isShowConfig,
		config,
		isLoad
	} = newCredentials;

	const loadIndicator = isLoad ? <CircularProgress size={24} /> : <span />;

	const handlerLoadConfig = ($ev)=> {


		state.configLoadRun();

		try {
			if (!label.length) {
				return state.showError('Label is required')
			}

			// TODO: Back check unique label

			if (!config.length) {
				return state.showError('Credentials is required')
			}

			try {
				const {apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId} = JSON.parse(config);
				const credentials = {apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId};

				for (let prop of Object.values(credentials)) if (!prop) return state.showError('Credentials is invalid')

			} catch (e) {
				return state.showError(`Error parse config: ${e.message || e}`)
			}

			state.showOk('Success ...');
		} finally {
			state.configLoadStop();
		}
	};

	return (
		<main className={classes.main}>
			<CssBaseline/>
			<Paper className={classes.paper}>

				<FormControl margin="normal" required fullWidth>
					<InputLabel htmlFor="label">Label</InputLabel>
					<Input id="label" name="label" autoFocus
					       value={label}
					       onChange={event => state.changeLabel(event.target.value)}
					/>
				</FormControl>

				<FormControl className={classNames(classes.margin, classes.textField)} fullWidth>
					<InputLabel htmlFor="adornment-config">Credentials</InputLabel>
					<Input
						id="adornment-config"
						type={isShowConfig ? 'text' : 'password'}
						value={config}
						onChange={event => state.changeConfig(event.target.value)}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="Toggle config visibility"
									onClick={state.toggleShowConfig}
								>
									{isShowConfig ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
			</FormControl>

				<FormControl margin="normal" fullWidth>
					<Button variant="contained" color="primary"
					        onClick={handlerLoadConfig}
					        className={classes.button}
					        disabled={!label.length || !config.length || isLoad}
					        fullWidth
					>
						Apply
						<ApplyIco className={classes.extendedIcon} />
						{loadIndicator}
					</Button>
				</FormControl>
			</Paper>
		</main>
	);
};

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 360,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	button: {
		margin: theme.spacing.unit,
	},
	extendedIcon: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
});

export default connect(
	state => ({
		store : state.Account
	}),
	dispatch => ({
		changeLabel  : (value) => dispatch({type : `${PREFIX}ChangeLabel`, value}),
		changeConfig : (value) => dispatch({type : `${PREFIX}ChangeConfig`, value}),
		toggleShowConfig : ()  => dispatch({type : `${PREFIX}ToggleShowConfig`}),
		configLoadRun : ()     => dispatch({type : `${PREFIX}ConfigLoadRun`}),
		configLoadStop : ()    => dispatch({type : `${PREFIX}ConfigLoadStop`}),
		showError : (message)  => dispatch({type : `${ALERT}OpenError`, message}),
		showOk    : (message)  => dispatch({type : `${ALERT}OpenOk`, message}),
	})
)(withStyles(styles)(SingUp))
