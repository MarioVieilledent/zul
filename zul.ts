import {interpret} from './interpret.ts';

const text = await Deno.readTextFile(Deno.args[0]);

const mainModule = interpret(text);
// console.log(mainModule);
