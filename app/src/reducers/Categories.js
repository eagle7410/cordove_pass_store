import {
	PREFIX_CATEGORIES as PREFIX
} from '../const/prefix'

const initialState = {
	items: {},
};

const Categories = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}Set`:
			return {
				...state,
				items : action.data
			};
	}

	return state;
};

export {Categories};
