import { i as __toESM } from "./shared/rolldown-runtime-DYf_mQCB.mjs";
import { t as require_binding } from "./shared/binding-BXYS21Tf.mjs";
import { n as onExit, t as watch } from "./shared/watch-DVnOWncA.mjs";
import { t as rolldown } from "./shared/rolldown-DWd2aEL4.mjs";
import { T as VERSION, s as RolldownMagicString } from "./shared/bindingify-input-options-CM8bmcLg.mjs";
import { t as defineConfig } from "./shared/define-config-BQBrxnNZ.mjs";
import { isMainThread } from "node:worker_threads";
// src/setup.ts
var import_binding = /* @__PURE__ */ __toESM(require_binding(), 1);
if (isMainThread) {
	const subscriberGuard = (0, import_binding.initTraceSubscriber)();
	if (subscriberGuard) onExit(() => {
		subscriberGuard.close();
	});
}
// src/constants/index.ts
/**
* Runtime helper module ID
*/
const RUNTIME_MODULE_ID = "\0rolldown/runtime.js";
// src/api/build.ts
/**
* The API similar to esbuild's `build` function.
*
* @example
* ```js
* import { build } from 'rolldown';
*
* const result = await build({
*   input: 'src/main.js',
*   output: {
*     file: 'bundle.js',
*   },
* });
* console.log(result);
* ```
*
* @experimental
* @category Programmatic APIs
*/
async function build(options) {
	if (Array.isArray(options)) return Promise.all(options.map((opts) => build(opts)));
	else {
		const { output, write = true, ...inputOptions } = options;
		const build = await rolldown(inputOptions);
		try {
			if (write) return await build.write(output);
			else return await build.generate(output);
		} finally {
			await build.close();
		}
	}
}
export { RUNTIME_MODULE_ID, RolldownMagicString, VERSION, build, defineConfig, rolldown, watch };
