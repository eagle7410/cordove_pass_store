import React from 'react';
import {getPath, setConfigFile, initConnect} from '../../api/Cloud'
import ActionDown from 'material-ui/svg-icons/file/cloud-download';
import ActionUp from 'material-ui/svg-icons/file/cloud-upload';
import {Tabs, Tab} from 'material-ui/Tabs';
import {connect} from 'react-redux';
import CouldConnect from './Cloud/CouldConnect'
import StepsDownload from './Cloud/StepsDownload'
import StepsUpload from './Cloud/StepsUpload'
import {Alert, GoogleConnect} from '../../const/Events'
import AlertStatus from '../../const/AlertStatus'

const Google = (state) => {
	const type = {type : 'google'};

	const InitConnect = () => {
		initConnect(type)
			.then(data => {
				state.init();
				state.showAlert('Google drive is init', AlertStatus.OK)
			})
			.catch(err => state.showAlert('No init google drive', AlertStatus.BAD));
	};

	const getFileContent = ($ev) => new Promise((ok, bad) => {
		let files = $ev.target.files;

		if (!files.length) {
			return ok('');
		}

		let reader = new FileReader();

		reader.onload = () => {
			ok(reader.result);
		};

		reader.readAsText(files[0]);
	});

	const loadConfig = async ($ev) => {
		try {
			let text = await getFileContent($ev);

			if (!text) {
				return state.showAlert('File empty', AlertStatus.BAD)
			}

			let data = JSON.parse(text);
			await setConfigFile({config: data, type : 'google'});

			state.isHaveConfig(data);
			state.showAlert('Config is save', AlertStatus.OK)

		} catch (e) {
			console.log('Err: ', e);
			state.showAlert('No load config', AlertStatus.BAD)
		}

	};

	return (
		<Tabs >
			<Tab label='Upload to Google' icon={<ActionUp />} >
				<CouldConnect
					store={state.connect}
					init={InitConnect}
					load_config={loadConfig}
					tools_open={state.toolsOpen}
					tools_close={state.toolsClose}
					handel_file_change={loadConfig}
				/>
				<StepsUpload  steps={state.stepsUpload} type={type} connect={state.connect}  />
			</Tab>
			<Tab label='Download from Google' icon={<ActionDown />} >
				<CouldConnect  store={state.connect} init={InitConnect} load_config={loadConfig}
				               tools_open={state.toolsOpen}
				               tools_close={state.toolsClose}
				               handel_file_change={loadConfig}
				/>
				<StepsDownload steps={state.stepsDownload} type={type} connect={state.connect}  />
			</Tab>
		</Tabs>
	);

}

export default connect(
	state => ({
		connect : state.googleSettingsForm,
		stepsUpload : state.googleStepsUpload,
		stepsDownload : state.googleStepsDownload,
	}),
	dispatch => ({
		showAlert   : (mess, type) => dispatch({
			type: Alert.show,
			data: {
				message: mess,
				status: type
			}
		}),
		isHaveConfig : () => dispatch({type : GoogleConnect.isHaveConfig}),
		init : () => dispatch({type : GoogleConnect.init}),
		toolsOpen : () => dispatch({type : GoogleConnect.toolsOpen}),
		toolsClose : () => dispatch({type : GoogleConnect.toolsClose}),
	})
)(Google);
