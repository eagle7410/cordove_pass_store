import React from "react";

// MD
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import {lighten} from "@material-ui/core/styles/colorManipulator";

const TableTools = state => {

	const { classes } = state;

	return (
		<Toolbar className={classes.root} >
			<div className={classes.title}>
				{(
					<Typography variant="h6" id="tableTitle">
						Categories
					</Typography>
				)}
			</div>
			<div className={classes.spacer} />
			<div className={classes.actions}>
				{(
					<Tooltip title="Add to list">
						<Fab color="primary" aria-label="Add" className={classes.fab}>
							<AddIcon />
						</Fab>
					</Tooltip>
				)}
			</div>
		</Toolbar>
	);
};

const style = theme => ({
	root: {
		paddingRight: theme.spacing.unit,
	},
	highlight:
		theme.palette.type === 'light'
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	spacer: {
		flex: '1 1 100%',
	},
	actions: {
		color: theme.palette.text.secondary,
	},
	title: {
		flex: '0 0 auto',
	},
})

export default withStyles(style)(TableTools);
