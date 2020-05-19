//// [/lib/incremental-declaration-changesOutput.txt]
/lib/tsc --b /src --verbose
[[90m12:04:00 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:04:00 AM[0m] Project 'src/tsconfig.json' is out of date because oldest output 'src/lib/a.d.ts' is older than newest input 'src/src/a.ts'

[[90m12:04:00 AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/lib/a.d.ts]
export declare class B {
    prop: string;
}
export interface A {
    b: B;
    foo: any;
}
//# sourceMappingURL=a.d.ts.map

//// [/src/lib/a.d.ts.map]
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["../src/a.ts"],"names":[],"mappings":"AAAA,qBAAa,CAAC;IAAG,IAAI,SAAW;CAAE;AAElC,MAAM,WAAW,CAAC;IAChB,CAAC,EAAE,CAAC,CAAC;IAAC,GAAG,EAAE,GAAG,CAAC;CAChB"}

//// [/src/lib/b.d.ts] file written with same contents
//// [/src/lib/b.d.ts.map] file written with same contents
//// [/src/lib/c.d.ts] file written with same contents
//// [/src/lib/c.d.ts.map] file written with same contents
//// [/src/src/a.ts]
export class B { prop = "hello"; }

export interface A {
  b: B; foo: any;
}


//// [/src/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/a.ts": {
        "version": "7973388544-export class B { prop = \"hello\"; }\n\nexport interface A {\n  b: B; foo: any;\n}\n",
        "signature": "3224647069-export declare class B {\r\n    prop: string;\r\n}\r\nexport interface A {\r\n    b: B;\r\n    foo: any;\r\n}\r\n//# sourceMappingURL=a.d.ts.map",
        "affectsGlobalScope": false
      },
      "./src/c.ts": {
        "version": "429593025-import { A } from \"./a\";\n\nexport interface C {\n  a: A;\n}\n",
        "signature": "-21569163793-import { A } from \"./a\";\r\nexport interface C {\r\n    a: A;\r\n}\r\n//# sourceMappingURL=c.d.ts.map",
        "affectsGlobalScope": false
      },
      "./src/b.ts": {
        "version": "-2273488249-import { C } from \"./c\";\n\nexport interface B {\n  b: C;\n}\n",
        "signature": "25318058868-import { C } from \"./c\";\r\nexport interface B {\r\n    b: C;\r\n}\r\n//# sourceMappingURL=b.d.ts.map",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "incremental": true,
      "target": 1,
      "module": 1,
      "declaration": true,
      "declarationMap": true,
      "sourceMap": true,
      "outDir": "./lib",
      "composite": true,
      "strict": true,
      "esModuleInterop": true,
      "alwaysStrict": true,
      "rootDir": "./src",
      "emitDeclarationOnly": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "./src/b.ts": [
        "./src/c.ts"
      ],
      "./src/c.ts": [
        "./src/a.ts"
      ]
    },
    "exportedModulesMap": {
      "./src/b.ts": [
        "./src/c.ts"
      ],
      "./src/c.ts": [
        "./src/a.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts"
    ]
  },
  "version": "FakeTSVersion"
}

