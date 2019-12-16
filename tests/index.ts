import execa from 'execa';
import fs from 'fs';
import _glob from 'glob';
import { ncp } from 'ncp';
import { join } from 'path';
import rimraf from 'rimraf';
import { promisify } from 'util';

const copy = promisify(ncp);
const glob = promisify(_glob);
const remove = promisify(rimraf);
const readFile = promisify(fs.readFile);

const tests = fs.readdirSync(__dirname).filter(file => !file.includes('.ts'));

const executablePath = join(__filename, '../../build/index.js');

async function verify(outputDir: string, testName: string) {
  const files = await glob(`${outputDir}/**/*.*`);

  for (const file of files) {
    expect(await readFile(file, 'utf8')).toEqual(
      await readFile(
        file.replace(`${testName}/output`, `${testName}/execution`),
        'utf8',
      ),
    );
  }
}

for (const test of tests) {
  describe(test, () => {
    const testDir = join(__filename, '..', test);
    const inputDir = join(testDir, 'input');
    const executionDir = join(testDir, 'execution');
    const outputDir = join(testDir, 'output');

    beforeAll(async () => {
      await copy(inputDir, executionDir);
    });

    it('should produce the correct output', async () => {
      await execa(executablePath, [], {
        cwd: executionDir,
      });

      await verify(outputDir, test);
    });

    afterAll(async () => {
      await remove(executionDir);
    });
  });
}
