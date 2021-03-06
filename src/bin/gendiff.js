#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.1.7')
  .description('Compares two configuration files and shows a difference.')
  .usage(' [options] <firstConfig> <secondConfig>', '?')
  .option('-f, --format [type] <format> ', 'Output format')
  .action((beforePath, afterPath) => {
    const format = program.format === undefined ? 'tree' : program.format;
    console.log(genDiff(beforePath, afterPath, format));
  })
  .parse(process.argv);
