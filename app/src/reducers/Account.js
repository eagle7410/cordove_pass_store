import {PREFIX_ACCOUNT as PREFIX} from '../const/prefix'

const initialState = {
	isAuth: false,
	accountActiveTab: 1,
	credentials: [],
	newCredentials: {
		isShowConfig: false,
		isShowPassword: false,
		isLoad: false,
		email: '',
		password: '',
		config: ''
	}
};

const Account = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}ConfigLoadStop`:
			return {
				...state,
				newCredentials: {
					...state.newCredentials,
					isLoad: false
				}
			};
		case `${PREFIX}ConfigLoadRun`:
			return {
				...state,
				newCredentials: {
					...state.newCredentials,
					isLoad: true
				}
			};
		case `${PREFIX}ToggleShowPassword`:
			return {
				...state,
				newCredentials: {
					...state.newCredentials,
					isShowPassword: !state.newCredentials.isShowPassword
				}
			};
		case `${PREFIX}ToggleShowConfig`:
			return {
				...state,
				newCredentials: {
					...state.newCredentials,
					isShowConfig: !state.newCredentials.isShowConfig
				}
			}
		case `${PREFIX}ChangeConfig`:
			return {
				...state,
				newCredentials: {
					...state.newCredentials,
					config: action.value
				}
			};
		case `${PREFIX}ChangeTab`:
			return {
				...state,
				accountActiveTab: action.value
			};
		case `${PREFIX}ChangePassword`:
			return {
				...state,
				newCredentials: {
					...state.newCredentials,
					password: action.value
				}
			};
		case `${PREFIX}ChangeEmail`:
			return {
				...state,
				newCredentials: {
					...state.newCredentials,
					email: action.value
				}
			};
	}

	return state
}

export {Account}
