//// [/lib/incremental-declaration-changesOutput.txt]
/lib/tsc --b /src --verbose
[[90m12:04:00 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:04:00 AM[0m] Project 'src/tsconfig.json' is out of date because oldest output 'src/obj/bar.js' is older than newest input 'src/bar.ts'

[[90m12:04:00 AM[0m] Building project '/src/tsconfig.json'...

[[90m12:04:00 AM[0m] Updating unchanged output timestamps of project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/bar.ts]
interface RawAction {
    (...args: any[]): Promise<any> | void;
}
interface ActionFactory {
    <T extends RawAction>(target: T): T;
}
declare function foo<U extends any[] = any[]>(): ActionFactory;
export default foo()(function foobar(): void {
});

//// [/src/obj/bar.d.ts]
declare const _default: () => void;
export default _default;


//// [/src/obj/bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo()(function foobar() {
});


//// [/src/obj/index.d.ts]
import { LazyAction } from './bundling';
export declare const lazyBar: LazyAction<() => void, typeof import("./lazyIndex")>;


//// [/src/obj/lazyIndex.d.ts] file written with same contents
//// [/src/obj/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../bar.ts": {
        "version": "747071916-interface RawAction {\r\n    (...args: any[]): Promise<any> | void;\r\n}\r\ninterface ActionFactory {\r\n    <T extends RawAction>(target: T): T;\r\n}\r\ndeclare function foo<U extends any[] = any[]>(): ActionFactory;\r\nexport default foo()(function foobar(): void {\r\n});",
        "signature": "-9232740537-declare const _default: () => void;\r\nexport default _default;\r\n",
        "affectsGlobalScope": false
      },
      "../bundling.ts": {
        "version": "-21659820217-export class LazyModule<TModule> {\r\n    constructor(private importCallback: () => Promise<TModule>) {}\r\n}\r\n\r\nexport class LazyAction<\r\n    TAction extends (...args: any[]) => any,\r\n    TModule\r\n>  {\r\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {\r\n    }\r\n}\r\n",
        "signature": "-40032907372-export declare class LazyModule<TModule> {\r\n    private importCallback;\r\n    constructor(importCallback: () => Promise<TModule>);\r\n}\r\nexport declare class LazyAction<TAction extends (...args: any[]) => any, TModule> {\r\n    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction);\r\n}\r\n",
        "affectsGlobalScope": false
      },
      "../global.d.ts": {
        "version": "-9780226215-interface PromiseConstructor {\r\n    new <T>(): Promise<T>;\r\n}\r\ndeclare var Promise: PromiseConstructor;\r\ninterface Promise<T> {\r\n}",
        "signature": "-9780226215-interface PromiseConstructor {\r\n    new <T>(): Promise<T>;\r\n}\r\ndeclare var Promise: PromiseConstructor;\r\ninterface Promise<T> {\r\n}",
        "affectsGlobalScope": true
      },
      "../lazyindex.ts": {
        "version": "-6956449754-export { default as bar } from './bar';\n",
        "signature": "-6224542381-export { default as bar } from './bar';\r\n",
        "affectsGlobalScope": false
      },
      "../index.ts": {
        "version": "-11602502901-import { LazyAction, LazyModule } from './bundling';\r\nconst lazyModule = new LazyModule(() =>\r\n    import('./lazyIndex')\r\n);\r\nexport const lazyBar = new LazyAction(lazyModule, m => m.bar);",
        "signature": "6256067474-import { LazyAction } from './bundling';\r\nexport declare const lazyBar: LazyAction<() => void, typeof import(\"./lazyIndex\")>;\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "target": 1,
      "declaration": true,
      "outDir": "./",
      "incremental": true,
      "isolatedModules": true,
      "configFilePath": "../tsconfig.json"
    },
    "referencedMap": {
      "../index.ts": [
        "../bundling.ts",
        "../lazyindex.ts"
      ],
      "../lazyindex.ts": [
        "../bar.ts"
      ]
    },
    "exportedModulesMap": {
      "../index.ts": [
        "../bundling.ts",
        "../lazyindex.ts"
      ],
      "../lazyindex.ts": [
        "../bar.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../bar.ts",
      "../bundling.ts",
      "../global.d.ts",
      "../index.ts",
      "../lazyindex.ts"
    ]
  },
  "version": "FakeTSVersion"
}

