const fs = require('fs-extra');
const cmd = require('node-cmd');

let path = (`${__dirname}/../`).replace(/\s/g, '\\ ');

const fileContentChange = async (pathRead, pathWrite, promiseWrite) => {
	let data = await fs.readFile(pathRead, 'utf8');

	data = await promiseWrite(data.toString());

	await fs.writeFile(pathWrite, data);

};

const rebuildAndMoveWWW = () => new Promise((ok, bad) => {
	cmd.get(
		`
			rm -r ${path}/www
            cd ${path}/app
            npm run build
            cp -R ./build ../www
        `,
		function (err, data, stderr) {
			if (err) {
				console.log('Err rebuildStatic', err);
				return bad();
			}

			console.log('rebuildStatic ok', data);
			ok();

		}
	)
});

const correctIndex = async () => {
	const transform = data => new Promise(
		write => {

			let res = data.match(/js\/main\.(.*)\.js/);

			if (!res) return write(data);

			write(data = data
				.replace(/\/css\//g, 'css/')
				.replace(/\<script type=\"text\/javascript" src="\/js\/main\.(.*)\/script\>/, '')
				.replace(/cordova\.js\">\<\/script\>/, `cordova.js"></script><script type="text/javascript" src="js/main.${res[1]}.js"></script>`)
			);

		}
	);

	let path = (`${__dirname}/../`).replace(/\s/g, '\ ');

	await fileContentChange(`${path}www/index.html`, `${path}www/index.html`, transform);

	console.log('Index create is ok.');

};

const process = async () => {
	try {
		await rebuildAndMoveWWW();
		await correctIndex();
		console.log('SUCCESS build');
	} catch (e) {
		console.log(`ERROR:`, e);
	}
};

process();
