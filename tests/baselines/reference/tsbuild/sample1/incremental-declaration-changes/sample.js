//// [/lib/incremental-declaration-changesOutput.txt]
/lib/tsc --b /src/tests --verbose
[[90m12:04:00 AM[0m] Projects in this build: 
    * src/core/tsconfig.json
    * src/logic/tsconfig.json
    * src/tests/tsconfig.json

[[90m12:04:00 AM[0m] Project 'src/core/tsconfig.json' is out of date because oldest output 'src/core/anotherModule.js' is older than newest input 'src/core/index.ts'

[[90m12:04:00 AM[0m] Building project '/src/core/tsconfig.json'...

[[90m12:04:00 AM[0m] Updating unchanged output timestamps of project '/src/core/tsconfig.json'...

[[90m12:04:00 AM[0m] Project 'src/logic/tsconfig.json' is out of date because oldest output 'src/logic/index.js' is older than newest input 'src/core'

[[90m12:04:00 AM[0m] Building project '/src/logic/tsconfig.json'...

[[90m12:04:00 AM[0m] Project 'src/tests/tsconfig.json' is out of date because oldest output 'src/tests/index.js' is older than newest input 'src/core'

[[90m12:04:00 AM[0m] Building project '/src/tests/tsconfig.json'...

exitCode:: ExitStatus.Success
readFiles:: {
 "/src/tests/tsconfig.json": 1,
 "/src/core/tsconfig.json": 1,
 "/src/logic/tsconfig.json": 1,
 "/src/core/tsconfig.tsbuildinfo": 1,
 "/src/core/anotherModule.ts": 1,
 "/src/core/index.ts": 1,
 "/src/core/some_decl.d.ts": 1,
 "/src/core/index.d.ts": 2,
 "/src/logic/tsconfig.tsbuildinfo": 1,
 "/src/logic/index.ts": 1,
 "/src/core/anotherModule.d.ts": 1,
 "/src/logic/index.d.ts": 1,
 "/src/tests/tsconfig.tsbuildinfo": 1,
 "/src/tests/index.ts": 1,
 "/src/tests/index.d.ts": 1
} 

//// [/src/core/index.d.ts]
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;
export declare class someClass {
}
//# sourceMappingURL=index.d.ts.map

//// [/src/core/index.d.ts.map]
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,UAAU,EAAE,MAAsB,CAAC;AAChD,wBAAgB,OAAO,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAC/D,wBAAgB,QAAQ,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAEhE,qBAAa,SAAS;CAAI"}

//// [/src/core/index.d.ts.map.baseline.txt]
===================================================================
JsFile: index.d.ts
mapUrl: index.d.ts.map
sourceRoot: 
sources: index.ts
===================================================================
-------------------------------------------------------------------
emittedFile:/src/core/index.d.ts
sourceFile:index.ts
-------------------------------------------------------------------
>>>export declare const someString: string;
1 >
2 >^^^^^^^^^^^^^^^
3 >               ^^^^^^
4 >                     ^^^^^^^^^^
5 >                               ^^
6 >                                 ^^^^^^
7 >                                       ^
8 >                                        ^^^^^^^^^^^^^^^^^^^^^^^->
1 >
2 >export 
3 >               const 
4 >                     someString
5 >                               : 
6 >                                 string = "HELLO WORLD"
7 >                                       ;
1 >Emitted(1, 1) Source(1, 1) + SourceIndex(0)
2 >Emitted(1, 16) Source(1, 8) + SourceIndex(0)
3 >Emitted(1, 22) Source(1, 14) + SourceIndex(0)
4 >Emitted(1, 32) Source(1, 24) + SourceIndex(0)
5 >Emitted(1, 34) Source(1, 26) + SourceIndex(0)
6 >Emitted(1, 40) Source(1, 48) + SourceIndex(0)
7 >Emitted(1, 41) Source(1, 49) + SourceIndex(0)
---
>>>export declare function leftPad(s: string, n: number): string;
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^
3 >                        ^^^^^^^
4 >                               ^
5 >                                ^
6 >                                 ^^
7 >                                   ^^^^^^
8 >                                         ^^
9 >                                           ^
10>                                            ^^
11>                                              ^^^^^^
12>                                                    ^^^^^^^^^^
13>                                                              ^^->
1->
  >
2 >export function 
3 >                        leftPad
4 >                               (
5 >                                s
6 >                                 : 
7 >                                   string
8 >                                         , 
9 >                                           n
10>                                            : 
11>                                              number
12>                                                    ) { return s + n; }
1->Emitted(2, 1) Source(2, 1) + SourceIndex(0)
2 >Emitted(2, 25) Source(2, 17) + SourceIndex(0)
3 >Emitted(2, 32) Source(2, 24) + SourceIndex(0)
4 >Emitted(2, 33) Source(2, 25) + SourceIndex(0)
5 >Emitted(2, 34) Source(2, 26) + SourceIndex(0)
6 >Emitted(2, 36) Source(2, 28) + SourceIndex(0)
7 >Emitted(2, 42) Source(2, 34) + SourceIndex(0)
8 >Emitted(2, 44) Source(2, 36) + SourceIndex(0)
9 >Emitted(2, 45) Source(2, 37) + SourceIndex(0)
10>Emitted(2, 47) Source(2, 39) + SourceIndex(0)
11>Emitted(2, 53) Source(2, 45) + SourceIndex(0)
12>Emitted(2, 63) Source(2, 64) + SourceIndex(0)
---
>>>export declare function multiply(a: number, b: number): number;
1->
2 >^^^^^^^^^^^^^^^^^^^^^^^^
3 >                        ^^^^^^^^
4 >                                ^
5 >                                 ^
6 >                                  ^^
7 >                                    ^^^^^^
8 >                                          ^^
9 >                                            ^
10>                                             ^^
11>                                               ^^^^^^
12>                                                     ^^^^^^^^^^
1->
  >
2 >export function 
3 >                        multiply
4 >                                (
5 >                                 a
6 >                                  : 
7 >                                    number
8 >                                          , 
9 >                                            b
10>                                             : 
11>                                               number
12>                                                     ) { return a * b; }
1->Emitted(3, 1) Source(3, 1) + SourceIndex(0)
2 >Emitted(3, 25) Source(3, 17) + SourceIndex(0)
3 >Emitted(3, 33) Source(3, 25) + SourceIndex(0)
4 >Emitted(3, 34) Source(3, 26) + SourceIndex(0)
5 >Emitted(3, 35) Source(3, 27) + SourceIndex(0)
6 >Emitted(3, 37) Source(3, 29) + SourceIndex(0)
7 >Emitted(3, 43) Source(3, 35) + SourceIndex(0)
8 >Emitted(3, 45) Source(3, 37) + SourceIndex(0)
9 >Emitted(3, 46) Source(3, 38) + SourceIndex(0)
10>Emitted(3, 48) Source(3, 40) + SourceIndex(0)
11>Emitted(3, 54) Source(3, 46) + SourceIndex(0)
12>Emitted(3, 64) Source(3, 65) + SourceIndex(0)
---
>>>export declare class someClass {
1 >
2 >^^^^^^^^^^^^^^^^^^^^^
3 >                     ^^^^^^^^^
1 >
  >
  >
2 >export class 
3 >                     someClass
1 >Emitted(4, 1) Source(5, 1) + SourceIndex(0)
2 >Emitted(4, 22) Source(5, 14) + SourceIndex(0)
3 >Emitted(4, 31) Source(5, 23) + SourceIndex(0)
---
>>>}
1 >^
2 > ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^->
1 > { }
1 >Emitted(5, 2) Source(5, 27) + SourceIndex(0)
---
>>>//# sourceMappingURL=index.d.ts.map

//// [/src/core/index.js]
"use strict";
exports.__esModule = true;
exports.someClass = exports.multiply = exports.leftPad = exports.someString = void 0;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
exports.leftPad = leftPad;
function multiply(a, b) { return a * b; }
exports.multiply = multiply;
var someClass = /** @class */ (function () {
    function someClass() {
    }
    return someClass;
}());
exports.someClass = someClass;


//// [/src/core/index.ts]
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }

export class someClass { }

//// [/src/core/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./anothermodule.ts": {
        "version": "-2676574883-export const World = \"hello\";\r\n",
        "signature": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "affectsGlobalScope": false
      },
      "./index.ts": {
        "version": "-13387000654-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n\nexport class someClass { }",
        "signature": "-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map",
        "affectsGlobalScope": false
      },
      "./some_decl.d.ts": {
        "version": "-9253692965-declare const dts: any;\r\n",
        "signature": "-9253692965-declare const dts: any;\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "skipDefaultLibCheck": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./anothermodule.ts",
      "./index.ts",
      "./some_decl.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/logic/index.d.ts] file written with same contents
//// [/src/logic/index.js] file written with same contents
//// [/src/logic/index.js.map] file written with same contents
//// [/src/logic/index.js.map.baseline.txt] file written with same contents
//// [/src/logic/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../core/index.d.ts": {
        "version": "-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map",
        "signature": "-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map",
        "affectsGlobalScope": false
      },
      "../core/anothermodule.d.ts": {
        "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "signature": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "affectsGlobalScope": false
      },
      "./index.ts": {
        "version": "-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
        "signature": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "sourceMap": true,
      "forceConsistentCasingInFileNames": true,
      "skipDefaultLibCheck": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "./index.ts": [
        "../core/anothermodule.d.ts",
        "../core/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./index.ts": [
        "../core/anothermodule.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../core/anothermodule.d.ts",
      "../core/index.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/tests/index.d.ts] file written with same contents
//// [/src/tests/index.js] file written with same contents
//// [/src/tests/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../core/index.d.ts": {
        "version": "-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map",
        "signature": "-2069755619-export declare const someString: string;\r\nexport declare function leftPad(s: string, n: number): string;\r\nexport declare function multiply(a: number, b: number): number;\r\nexport declare class someClass {\r\n}\r\n//# sourceMappingURL=index.d.ts.map",
        "affectsGlobalScope": false
      },
      "../core/anothermodule.d.ts": {
        "version": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "signature": "7652028357-export declare const World = \"hello\";\r\n//# sourceMappingURL=anotherModule.d.ts.map",
        "affectsGlobalScope": false
      },
      "../logic/index.d.ts": {
        "version": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
        "signature": "-6548680073-export declare function getSecondsInDay(): number;\r\nimport * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
        "affectsGlobalScope": false
      },
      "./index.ts": {
        "version": "12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n",
        "signature": "-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "forceConsistentCasingInFileNames": true,
      "skipDefaultLibCheck": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "../logic/index.d.ts": [
        "../core/anothermodule.d.ts"
      ],
      "./index.ts": [
        "../core/anothermodule.d.ts",
        "../core/index.d.ts",
        "../logic/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../logic/index.d.ts": [
        "../core/anothermodule.d.ts"
      ],
      "./index.ts": [
        "../core/anothermodule.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../core/anothermodule.d.ts",
      "../core/index.d.ts",
      "../logic/index.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion"
}

