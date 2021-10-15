/* eslint-disable @typescript-eslint/camelcase */
const env = exports.env = process.env.NODE_ENV || 'qa';

if (process.env.PORT) {
	process.env.http_port = +process.env.PORT;
};

// Various executable commands called in scripts
exports.cmd = {
	node: 'node',
	tsNode: 'ts-node'
};

exports.vars = (opts = { }) => {
	const extraEnv = opts.envFiles || [ ];
	const envFiles = [ ...extraEnv, '.env' ];

	return Object.assign({ }, process.env, {
		TS_NODE_FILES: 'true',
		nucfg_env_file: envFiles.join(';')
	});
};
