#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.0.3')
  .description('Compares two configuration files and shows a difference.')
  .usage(' [options] <firstConfig> <secondConfig>', '?')
  .option('-f, --format [type]', 'Output format')
  .action((beforePath, afterPath) => {
    console.log(genDiff(beforePath, afterPath));
  })
  .parse(process.argv);
