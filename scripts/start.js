
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('./exec');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { vars, cmd } = require('./env');

const [ , , type, heapSize = '1700', headerSize = '16000' ] = process.argv;

switch (type) {
	case '':
	case null:
	case void 0:
		exec(cmd.node, [ './build/start.js', `--max_old_space_size=${heapSize}`, `--max-http-header-size=${headerSize}` ], {
			env: vars()
		});
		break;
}
