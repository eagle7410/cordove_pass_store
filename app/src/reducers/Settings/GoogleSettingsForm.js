import {GoogleConnect, StepsConnect} from '../../const/Events'

const initialState = {
	init         : false,
	isHaveConfig : false,
	isToolsOpen  : false
};

const googleSettingsForm = (state = initialState, action) => {

	// eslint-disable-next-line
	switch (action.type) {
		case GoogleConnect.toolsOpen:
			return {
				...state,
				isToolsOpen : true
			};

		case GoogleConnect.toolsClose:
			return {
				...state,
				isToolsOpen : false
			};

		case GoogleConnect.isHaveConfig:
			return {
				...state,
				isHaveConfig : true
			};
		case GoogleConnect.init:
			return {
				...state,
				init: true
			};

		case StepsConnect.init:

			return {
				...state,
				...action.data.google
			};

	}

	return state;
};

export {googleSettingsForm};
