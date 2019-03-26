import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

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

const SignIn = (state) => {
	const {classes} = state;

	const handlerChange = ($ev) => {
		// TODO: Back
	}

	return (
		<main className={classes.main}>
			<CssBaseline/>
			<Paper className={classes.paper}>
				<form className={classes.form}>
					<FormControl className={classes.formControl} fullWidth>
						<InputLabel htmlFor="credentials-helper">Credential</InputLabel>
						<Select
							value={""}
							onChange={handlerChange}
							input={<Input name="credentials" id="credentials-helper" />}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
						</Select>
						<FormHelperText>Select you credentials by label</FormHelperText>
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign in
					</Button>
				</form>
			</Paper>
		</main>
	);
};

export default withStyles(styles)(SignIn);
