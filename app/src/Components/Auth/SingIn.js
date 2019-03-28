import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import {
	PREFIX_ACCOUNT as PREFIX,
	PREFIX_ALERT as ALERT,
	PREFIX_CATEGORIES as CATEGORIES,
	PREFIX_STORE as STORE
} from "../../const/prefix";
import {Firebase} from "../../Api";
import {PathAfterAuth} from "../../const/path";

const SignIn = (state) => {
	const {classes} = state;

	const {
		credentials,
		emailSelected,
		isLoad
	} = state.store;

	let selectedList = [];

	for (let {email} of credentials)
		selectedList.push(<MenuItem value={email} key={`singItem${email}`}>{email}</MenuItem>);

	const handlerChange = ($ev) => state.selectedEmail($ev.target.value);

	const handlerSingIn = async () => {
		state.configLoadRun();

		try {
			const data = credentials.find(cr => cr.email === emailSelected);

			if (!data) return false;

			const {email, credential, password} = data;

			await Firebase.authUser(credential, email, password);

			const {store, categories} = await Firebase.getData();

			state.setCategories(categories);
			state.setStore(store);
			state.isAuth();

			state.history.push(PathAfterAuth);

		} catch (e) {
			state.showError(`Error load config: ${e.message || e}`);
		} finally {
			state.configLoadStop();
		}
	};

	const loadIndicator = isLoad ? <CircularProgress size={24}/> : <span/>;

	return (
		<main className={classes.main}>
			<CssBaseline/>
			<Paper className={classes.paper}>
				<div className={classes.form}>
					<FormControl className={classes.formControl} fullWidth>
						<InputLabel htmlFor="credentials-helper">Credential</InputLabel>
						<Select
							value={emailSelected}
							onChange={handlerChange}
							input={<Input name="credentials" id="credentials-helper" />}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{selectedList}
						</Select>
						<FormHelperText>Select you credentials by email</FormHelperText>
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={!emailSelected.length || isLoad}
						onClick={handlerSingIn}
					>
						Sign in
						{loadIndicator}
					</Button>
				</div>
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
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
});

export default connect(
	state => ({
		store: state.Account
	}),
	dispatch => ({
		isAuth: (data) => dispatch({type: `${PREFIX}IsAuth`}),
		setStore: (data) => dispatch({type: `${STORE}Set`, data}),
		setCategories: (data) => dispatch({type: `${CATEGORIES}Set`, data}),
		selectedEmail: (email) => dispatch({type: `${PREFIX}SelectEmail`, data : email}),
		setCredentials: (credentials) => dispatch({type: `${PREFIX}SetCredential`, data : credentials}),
		configLoadRun: () => dispatch({type: `${PREFIX}ConfigLoadRun`}),
		configLoadStop: () => dispatch({type: `${PREFIX}ConfigLoadStop`}),
		showError: (message) => dispatch({type: `${ALERT}OpenError`, message}),
	})
)(withRouter(withStyles(styles)(SignIn)))
