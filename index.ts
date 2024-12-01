import { argv } from 'node:process';
import { DayRunner } from './DayRunner.js';

new DayRunner(argv[2]).run();
