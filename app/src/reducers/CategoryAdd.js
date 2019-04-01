import {
	PREFIX_CATEGORY_ADD as PREFIX
} from '../const/prefix'

const initialState = {
	isOpen : false,
	isLoad : false,
	name   : ''
};

const CategoryAdd = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}LoadRun`:
			return {
				...state,
				isLoad : true
			};
		case `${PREFIX}LoadStop`:
			return {
				...state,
				isLoad : false
			};
		case `${PREFIX}ChaneName`:
			return {
				...state,
				name : action.data.trim()
			};
		case `${PREFIX}Open`:
			return {
				...initialState,
				isOpen : true
			};
		case `${PREFIX}Close`:
			return {
				...state,
				isOpen : false
			};
	}

	return state;
};

export {CategoryAdd};

