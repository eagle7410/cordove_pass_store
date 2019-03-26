import {
	PREFIX_MENU_LEFT as PREFIX,
} from '../const/prefix'

const initialState = {
	open : false,
	location : '/'
};

const MenuLeft = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}_OPEN`:
			return {
				...state,
				open : true
			};

		case `${PREFIX}_CLOSE`:
			return {
				...state,
				open : false
			};
	}

	return state;
};

export {MenuLeft};
