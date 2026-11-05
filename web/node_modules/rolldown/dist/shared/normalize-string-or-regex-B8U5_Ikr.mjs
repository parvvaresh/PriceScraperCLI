import { i as __toESM } from "./rolldown-runtime-DYf_mQCB.mjs";
import { t as require_binding } from "./binding-BXYS21Tf.mjs";
import { n as error, u as logPluginError } from "./logs-DyTyzzWG.mjs";
// src/builtin-plugin/utils.ts
var import_binding = /* @__PURE__ */ __toESM(require_binding(), 1);
var BuiltinPlugin = class {
	name;
	_options;
	/** Vite-specific option to control plugin ordering */
	enforce;
	constructor(name, _options) {
		this.name = name;
		this._options = _options;
	}
};
function makeBuiltinPluginCallable(plugin) {
	const callbacks = [];
	const binding = bindingifyBuiltInPlugin(plugin);
	const options = binding.options;
	if (options !== null && (typeof options === "object" || typeof options === "function")) binding.options = new Proxy({}, { get(_target, key) {
		const value = Reflect.get(options, key);
		if (typeof value !== "function") return value;
		callbacks.push(value);
		return invokeWeakCallback.bind(void 0, new WeakRef(value), `${plugin.name}.${String(key)}`);
	} });
	const context = {
		plugin,
		native: new import_binding.BindingCallableBuiltinPlugin(binding),
		callbacks
	};
	const wrappedPlugin = plugin;
	for (const key in context.native) {
		const wrappedHook = invokeBuiltinHook.bind(context, key);
		const order = context.native.getOrder(key);
		if (order == void 0) wrappedPlugin[key] = wrappedHook;
		else wrappedPlugin[key] = {
			handler: wrappedHook,
			order
		};
	}
	return wrappedPlugin;
}
async function invokeBuiltinHook(key, ...args) {
	try {
		return await this.native[key](...args);
	} catch (e) {
		if (e instanceof Error && !/^\s+at /m.test(e.stack ?? "")) Error.captureStackTrace(e, invokeBuiltinHook);
		return error(logPluginError(e, this.plugin.name, {
			hook: key,
			id: key === "transform" ? args[2] : void 0
		}));
	}
}
function invokeWeakCallback(reference, name, ...args) {
	const callback = reference.deref();
	if (!callback) throw new Error(`The callback for ${name} was released`);
	return Reflect.apply(callback, void 0, args);
}
function bindingifyBuiltInPlugin(plugin) {
	return {
		__name: plugin.name,
		options: plugin._options
	};
}
function bindingifyManifestPlugin(plugin, pluginContextData) {
	const { isOutputOptionsForLegacyChunks, ...options } = plugin._options;
	return {
		__name: plugin.name,
		options: {
			...options,
			isLegacy: isOutputOptionsForLegacyChunks ? (opts) => {
				return isOutputOptionsForLegacyChunks(pluginContextData.getOutputOptions(opts));
			} : void 0
		}
	};
}
// src/utils/normalize-string-or-regex.ts
function normalizedStringOrRegex(pattern) {
	if (!pattern) return;
	if (!isReadonlyArray(pattern)) return [pattern];
	return pattern;
}
function isReadonlyArray(input) {
	return Array.isArray(input);
}
export { makeBuiltinPluginCallable as a, bindingifyManifestPlugin as i, BuiltinPlugin as n, bindingifyBuiltInPlugin as r, normalizedStringOrRegex as t };
