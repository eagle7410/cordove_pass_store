import {
	PREFIX_ALERT as PREFIX
} from '../const/prefix'
import {
	ICON_TYPES,
	TYPES
} from '../const/alert'

const initialState = {
	isOpen     : false,
	type       : TYPES.OK,
	message    : '',
	isShowIcon : true,
	showIcon   : ICON_TYPES.OK,
	labelOk    : 'Read',
};

const Alert = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}Close`:
			return {...initialState};

		case `${PREFIX}Open`:
			return {
				...state,
				...action.data,
				isOpen : true
			};
		case `${PREFIX}OpenError`:
			return {
				...state,
				message  : action.message,
				isOpen   : true,
				showIcon : ICON_TYPES.BAD,
				type     : TYPES.BAD
			};
		case `${PREFIX}OpenOk`:
			return {
				...state,
				message  : action.message,
				isOpen   : true,
				showIcon : ICON_TYPES.OK,
				type     : TYPES.OK
			};
	}

	return state;
};

export {Alert};
