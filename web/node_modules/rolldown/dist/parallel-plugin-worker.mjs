import { i as __toESM } from "./shared/rolldown-runtime-DYf_mQCB.mjs";
import { t as require_binding } from "./shared/binding-BXYS21Tf.mjs";
import { c as PluginContextData, n as bindingifyPlugin } from "./shared/bindingify-input-options-CM8bmcLg.mjs";
import { parentPort, workerData } from "node:worker_threads";
// src/parallel-plugin-worker.ts
var import_binding = /* @__PURE__ */ __toESM(require_binding(), 1);
const { registryId, pluginInfos, threadNumber } = workerData;
(async () => {
	try {
		const plugins = await Promise.all(pluginInfos.map(async (pluginInfo) => {
			const definePluginImpl = (await import(pluginInfo.fileUrl)).default;
			const plugin = await definePluginImpl(pluginInfo.options, { threadNumber });
			const pluginContextData = new PluginContextData(() => {}, {}, [], [], false);
			return {
				index: pluginInfo.index,
				plugin: bindingifyPlugin(plugin, {}, {}, pluginContextData, [], () => {}, "info", false, void 0)
			};
		}));
		(0, import_binding.registerPlugins)(registryId, plugins);
		parentPort.postMessage({ type: "success" });
	} catch (error) {
		parentPort.postMessage({
			type: "error",
			error
		});
	} finally {
		parentPort.unref();
	}
})();
export {};
