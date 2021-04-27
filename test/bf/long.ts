import { readFileSync } from "fs";
import { join } from "path";
import { BfLongCompiler } from "../../bf/compiler";

const long = new BfLongCompiler(
    readFileSync(join('test', 'bf', 'test.bf')).toString()
)