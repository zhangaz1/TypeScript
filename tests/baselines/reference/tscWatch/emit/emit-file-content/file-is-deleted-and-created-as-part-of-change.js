/a/lib/tsc.js -w
//// [/home/username/project/app/file.ts]
var a = 10;

//// [/home/username/project/tsconfig.json]
{"include":["app/**/*.ts"]}

//// [/a/lib/lib.d.ts]
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

//// [/home/username/project/app/file.js]
var a = 10;



Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...


[[90m12:00:24 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/home/username/project/app/file.ts"]
Program options: {"watch":true,"configFilePath":"/home/username/project/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/home/username/project/app/file.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/home/username/project/app/file.ts

WatchedFiles::
/home/username/project/tsconfig.json:
  {"fileName":"/home/username/project/tsconfig.json","pollingInterval":250}
/home/username/project/app/file.ts:
  {"fileName":"/home/username/project/app/file.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/home/username/project/node_modules/@types:
  {"directoryName":"/home/username/project/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/home/username/project/app:
  {"directoryName":"/home/username/project/app","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: file is deleted and then created to modify content

//// [/home/username/project/app/file.js]
var a = 10;
var b = 10;


//// [/home/username/project/app/file.ts]
var a = 10;
var b = 10;


Output::
>> Screen clear
[[90m12:00:28 AM[0m] File change detected. Starting incremental compilation...


[[90m12:00:32 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/home/username/project/app/file.ts"]
Program options: {"watch":true,"configFilePath":"/home/username/project/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/home/username/project/app/file.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/home/username/project/app/file.ts

WatchedFiles::
/home/username/project/tsconfig.json:
  {"fileName":"/home/username/project/tsconfig.json","pollingInterval":250}
/home/username/project/app/file.ts:
  {"fileName":"/home/username/project/app/file.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/home/username/project/node_modules/@types:
  {"directoryName":"/home/username/project/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/home/username/project/app:
  {"directoryName":"/home/username/project/app","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined
