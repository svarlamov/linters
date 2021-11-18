import ESlint from 'eslint';
import path from 'path';

describe('member-ordering / happy path', () => {
  const cli = new ESlint.CLIEngine({
    cwd: path.join(__dirname, '..'),
    useEslintrc: false,
    baseConfig: {
      ...require('../../index.js'),
      overrides: [
        {
          files: ['*.ts'],
          plugins: ['@typescript-eslint'],
          parser: '@typescript-eslint/parser',
          rules: require('../../rules/member-ordering'),
        },
      ],
    },
  });

  it('happy', () => {
    const codeframe = cli.getFormatter('codeframe');
    const report = cli.executeOnFiles([
      path.join(__dirname, './__fixtures__/member-ordering-happy.fixture.ts'),
    ]);

    expect(codeframe(report.results)).toMatchSnapshot();
  });
});