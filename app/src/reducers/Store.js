import {
	PREFIX_STORE as PREFIX
} from '../const/prefix'

const initialState = {
	items : []
};

const Store = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}Set`:
			return {
				...state,
				items: action.data
			};
	}

	return state;
};

export {Store};
