import del from 'del'
import fs from  'fs'
import log from 'gutil-color-log'

const paths_ = JSON.parse(fs.readFileSync('./paths.json'));
 
export function clear(cb) {
	del([paths_.dist], cb()).then(paths => {
        console.log('-----------------------------------------------------------------------------------');
	    console.log('Deleted files and folders:\n', paths.join('\n'));
        console.log('-----------------------------------------------------------------------------------');
	});
}