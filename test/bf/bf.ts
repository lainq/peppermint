import {readFileSync} from 'fs';
import {join} from 'path';
import {BfInterpreter} from '../../bf/bf';

const i = BfInterpreter.execute(
  readFileSync(join('test', 'bf', 'test.bf')).toString()
);
