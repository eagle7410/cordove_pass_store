import React from 'react';
import {getPath, setConfigFile, initConnect} from '../../api/Cloud'
import ActionDown from 'material-ui/svg-icons/file/cloud-download';
import ActionUp from 'material-ui/svg-icons/file/cloud-upload';
import {Tabs, Tab} from 'material-ui/Tabs';
import {connect} from 'react-redux';
import Download from './DataFileTravel/Download'
import Upload from './DataFileTravel/Upload'
import {Alert} from '../../const/Events'
import AlertStatus from '../../const/AlertStatus'

const DataFileTravel = (state) => {
	const type = {type : 'google'};

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

	// TODO: Back Use
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
			<Tab label='Download' icon={<ActionDown />} >
				<Download steps={state.stepsDownload} type={type} />
			</Tab>
			<Tab label='Upload' icon={<ActionUp />} >
				<Upload  steps={state.stepsUpload} type={type} />
			</Tab>

		</Tabs>
	);

}

export default connect(
	state => ({
		stepsUpload : state.stepsUpload,
		stepsDownload : state.stepsDownload,
	}),
	dispatch => ({
		showAlert   : (mess, type) => dispatch({
			type: Alert.show,
			data: {
				message: mess,
				status: type
			}
		}),
	})
)(DataFileTravel);
