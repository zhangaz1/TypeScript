/a/lib/tsc.js --w /f.ts --preserveWatchOutput
//// [/f.ts]


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

//// [/f.js]



Output::
[[90m12:00:11 AM[0m] Starting compilation in watch mode...


[[90m12:00:14 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/f.ts"]
Program options: {"watch":true,"preserveWatchOutput":true}
Program files::
/a/lib/lib.d.ts
/f.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/f.ts

WatchedFiles::
/f.ts:
  {"fileName":"/f.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

Change:: Comment added to file f

//// [/f.ts]
//

//// [/f.js]
//



Output::
[[90m12:00:17 AM[0m] File change detected. Starting incremental compilation...


[[90m12:00:21 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/f.ts"]
Program options: {"watch":true,"preserveWatchOutput":true}
Program files::
/a/lib/lib.d.ts
/f.ts

Semantic diagnostics in builder refreshed for::
/f.ts

WatchedFiles::
/f.ts:
  {"fileName":"/f.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined
