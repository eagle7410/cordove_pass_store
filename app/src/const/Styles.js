import {
	panelUsers,
	panelSettings,
	rowStoreLabel,
	ok,
	bad
} from './Colors'

const tabUsers = {
	background: panelUsers
};
const tabSettings = {
	background: panelSettings
};

const styleDataLabel = {
	color : rowStoreLabel
};
const styleRow = {
	overflow: 'visible',
	fontSize : '16px'
};
const styleBlockInCell = {
	display : 'inline-block'
};
const styleArea = {
	width : '80%',
	marginLeft: '15px',
	fontSize : '16px'
};
const styleBlock = {
	width: '100%',
	maxWidth: 700,
	margin: 'auto'
};
const styleButtonBlock = {
	marginTop: 24,
	marginBottom: 12
};
const styleContent = {
	overflow: 'hidden',
	position : 'absolute',
	left : '120%',
};
const styleCategoryEdit = {
	top: '23px'
};

const styleInputFile = {
	cursor: 'pointer',
	position: 'absolute',
	top: 0,
	bottom: 0,
	right: 0,
	left: 0,
	width: '100%',
	opacity: 0,
};

export {
	tabUsers,
	tabSettings,
	styleDataLabel, styleRow, styleBlockInCell, styleArea,
	styleBlock, styleButtonBlock,
	styleContent,
	styleCategoryEdit,
	styleInputFile
}
