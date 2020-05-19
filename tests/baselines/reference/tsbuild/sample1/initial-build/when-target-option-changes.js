//// [/lib/initial-buildOutput.txt]
/lib/tsc --b /src/core --verbose
[[90m12:01:00 AM[0m] Projects in this build: 
    * src/core/tsconfig.json

[[90m12:01:00 AM[0m] Project 'src/core/tsconfig.json' is out of date because output file 'src/core/anotherModule.js' does not exist

[[90m12:01:00 AM[0m] Building project '/src/core/tsconfig.json'...

TSFILE: /src/core/anotherModule.js
TSFILE: /src/core/index.js
TSFILE: /src/core/tsconfig.tsbuildinfo
/lib/lib.esnext.d.ts
/lib/lib.esnext.full.d.ts
/src/core/anotherModule.ts
/src/core/index.ts
/src/core/some_decl.d.ts
exitCode:: ExitStatus.Success


//// [/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />

//// [/lib/lib.esnext.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

//// [/lib/lib.esnext.full.d.ts]
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />

//// [/src/core/anotherModule.js]
export const World = "hello";


//// [/src/core/index.js]
export const someString = "HELLO WORLD";
export function leftPad(s, n) { return s + n; }
export function multiply(a, b) { return a * b; }


//// [/src/core/tsconfig.json]
{
    "compilerOptions": {
        "incremental": true,
"listFiles": true,
"listEmittedFiles": true,
        "target": "esnext",
    }
}

//// [/src/core/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.esnext.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../lib/lib.esnext.full.d.ts": {
        "version": "8926001564-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />",
        "signature": "8926001564-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />",
        "affectsGlobalScope": false
      },
      "./anothermodule.ts": {
        "version": "-2676574883-export const World = \"hello\";\r\n",
        "signature": "-8396256275-export declare const World = \"hello\";\r\n",
        "affectsGlobalScope": false
      },
      "./index.ts": {
        "version": "-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n",
        "signature": "1874987148-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\n",
        "affectsGlobalScope": false
      },
      "./some_decl.d.ts": {
        "version": "-9253692965-declare const dts: any;\r\n",
        "signature": "-9253692965-declare const dts: any;\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "incremental": true,
      "listFiles": true,
      "listEmittedFiles": true,
      "target": 99,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.esnext.d.ts",
      "../../lib/lib.esnext.full.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

