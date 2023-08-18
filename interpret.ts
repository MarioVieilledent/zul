import * as zulSyntax from "./syntax.ts";
import * as regex from "./regexSyntax.ts";
import { Module } from "./Module.ts";

export function interpret(rawScript: string): any {
  let mainModule = new Module('main', 'void', rawScript); // Returned program

  const uncommentedScript = uncommentScript(rawScript);

  uncommentedScript.split("\n").forEach((line) => {
    line = line.trim(); // Trims the line
      let matches: any = [];
      let output: any = [];
      while (matches = regex.MATCH_DECLARATION.exec(line)) {
        output.push(matches);
      }
      // Is a declaration
      if (output.length > 0) {
        output.forEach((declaration => {
          const decName = declaration[1];
          const decType = declaration[2];
          const decContent = declaration[3];
          // Is a single line declaration
          if (declaration[5] == ";") {
            mainModule.modules.push(new Module(decName, decType, decContent));
          } else { // Open a multiline script for module declaration
          }
        }));
        // Is an expression
      } else {
        try {
          console.log(line);
          // console.log(eval(line));
        } catch (e) {
          console.error(e);
        }
      }
  });

  return mainModule;
}

// Remove all comments
function uncommentScript(script: string): string {
  let uncommentedScript: string = '';
  let inComment: 'no' | 'single_line' | 'multi_line' = 'no';

  for (let i = 0; i < script.length - 1; i++) {
    switch(inComment) {
      case 'no': {
        if (script[i] == '/' && script[i+1] == '/') {
          inComment = 'single_line';
        } else if (script[i] == '/' && script[i+1] == '*') {
          inComment = 'multi_line';
        } else {
          uncommentedScript += script[i];
        }
        break;
      }
      case 'single_line': {
        if (script[i] == '\n') {
          inComment = 'no';
          uncommentedScript += '\n';
        }
        break;
      }
      case 'multi_line': {
        if (script[i] == '*' && script[i+1] == '/') {
          inComment = 'no';
        }
        break;
      }
    }
  }

  if (inComment == 'no') {
    uncommentedScript += script[script.length - 1]; // Last char
  }

  return uncommentedScript;
}