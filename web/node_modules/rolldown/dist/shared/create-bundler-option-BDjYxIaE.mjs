import { i as __toESM } from "./rolldown-runtime-DYf_mQCB.mjs";
import { t as require_binding } from "./binding-BXYS21Tf.mjs";
import { a as logInputHookInOutputPlugin, n as error, s as logMissingCodeSplittingGroupDebugName } from "./logs-DyTyzzWG.mjs";
import { n as BuiltinPlugin } from "./normalize-string-or-regex-B8U5_Ikr.mjs";
import { C as LOG_LEVEL_WARN, T as VERSION, _ as getParallelPluginInfo, a as measureIfFunction, b as LOG_LEVEL_DEBUG, c as PluginContextData, d as transformRenderedChunk, g as MinimalPluginContextImpl, i as measureHookCost, l as transformModuleInfo, o as pluginTimingsRecorderFor, p as transformAssetSource, r as OUTPUT_OPTIONS_OWNER, t as bindingifyInputOptions, v as normalizeHook, w as logLevelPriority, y as normalizeLog } from "./bindingify-input-options-CM8bmcLg.mjs";
import { a as unimplemented, t as arraify } from "./misc-BaVlOYH0.mjs";
import { Worker } from "node:worker_threads";
import path from "node:path";
import { styleText } from "node:util";
import os from "node:os";
// src/log/logger.ts
function getLogger(plugins, onLog, logLevel, watchMode) {
	const minimalPriority = logLevelPriority[logLevel];
	const logger = (level, log, skipped = /* @__PURE__ */ new Set()) => {
		if (logLevelPriority[level] < minimalPriority) return;
		for (const plugin of getSortedPlugins("onLog", plugins)) {
			if (skipped.has(plugin)) continue;
			const { onLog: pluginOnLog } = plugin;
			if (pluginOnLog) {
				const getLogHandler = (level) => {
					if (logLevelPriority[level] < minimalPriority) return () => {};
					return (log) => logger(level, normalizeLog(log), new Set(skipped).add(plugin));
				};
				if (("handler" in pluginOnLog ? pluginOnLog.handler : pluginOnLog).call({
					debug: getLogHandler("debug"),
					error: (log) => error(normalizeLog(log)),
					info: getLogHandler("info"),
					meta: {
						rollupVersion: "4.23.0",
						rolldownVersion: VERSION,
						watchMode
					},
					warn: getLogHandler("warn"),
					pluginName: plugin.name || "unknown"
				}, level, log) === false) return;
			}
		}
		onLog(level, log);
	};
	return logger;
}
const getOnLog = (config, logLevel, printLog = defaultPrintLog) => {
	const { onwarn, onLog } = config;
	const defaultOnLog = getDefaultOnLog(printLog, onwarn);
	if (onLog) {
		const minimalPriority = logLevelPriority[logLevel];
		return (level, log) => onLog(level, addLogToString(log), (level, handledLog) => {
			if (level === "error") return error(normalizeLog(handledLog));
			if (logLevelPriority[level] >= minimalPriority) defaultOnLog(level, normalizeLog(handledLog));
		});
	}
	return defaultOnLog;
};
const getDefaultOnLog = (printLog, onwarn) => onwarn ? (level, log) => {
	if (level === "warn") onwarn(addLogToString(log), (warning) => printLog(LOG_LEVEL_WARN, normalizeLog(warning)));
	else printLog(level, log);
} : printLog;
const addLogToString = (log) => {
	Object.defineProperty(log, "toString", {
		value: () => getExtendedLogMessage(log),
		writable: true
	});
	return log;
};
const defaultPrintLog = (level, log) => {
	const message = getExtendedLogMessage(log);
	switch (level) {
		case LOG_LEVEL_WARN: return console.warn(message);
		case LOG_LEVEL_DEBUG: return console.debug(message);
		default: return console.info(message);
	}
};
const getExtendedLogMessage = (log) => {
	let prefix = "";
	if (log.plugin) prefix += `(${log.plugin} plugin) `;
	if (log.loc) prefix += `${relativeId(log.loc.file)} (${log.loc.line}:${log.loc.column}) `;
	return prefix + log.message;
};
function relativeId(id) {
	if (!path.isAbsolute(id)) return id;
	return path.relative(path.resolve(), id);
}
// src/constants/plugin.ts
const ENUMERATED_INPUT_PLUGIN_HOOK_NAMES = [
	"options",
	"buildStart",
	"resolveId",
	"load",
	"transform",
	"moduleParsed",
	"buildEnd",
	"onLog",
	"resolveDynamicImport",
	"closeBundle",
	"closeWatcher",
	"watchChange"
];
const ENUMERATED_OUTPUT_PLUGIN_HOOK_NAMES = [
	"augmentChunkHash",
	"outputOptions",
	"renderChunk",
	"renderStart",
	"renderError",
	"writeBundle",
	"generateBundle",
	"resolveFileUrl"
];
const ENUMERATED_PLUGIN_HOOK_NAMES = [
	...ENUMERATED_INPUT_PLUGIN_HOOK_NAMES,
	...ENUMERATED_OUTPUT_PLUGIN_HOOK_NAMES,
	"footer",
	"banner",
	"intro",
	"outro"
];
ENUMERATED_PLUGIN_HOOK_NAMES[0], ENUMERATED_PLUGIN_HOOK_NAMES[0], ENUMERATED_PLUGIN_HOOK_NAMES[1], ENUMERATED_PLUGIN_HOOK_NAMES[1], ENUMERATED_PLUGIN_HOOK_NAMES[2], ENUMERATED_PLUGIN_HOOK_NAMES[2], ENUMERATED_PLUGIN_HOOK_NAMES[3], ENUMERATED_PLUGIN_HOOK_NAMES[3], ENUMERATED_PLUGIN_HOOK_NAMES[4], ENUMERATED_PLUGIN_HOOK_NAMES[4], ENUMERATED_PLUGIN_HOOK_NAMES[5], ENUMERATED_PLUGIN_HOOK_NAMES[5], ENUMERATED_PLUGIN_HOOK_NAMES[6], ENUMERATED_PLUGIN_HOOK_NAMES[6], ENUMERATED_PLUGIN_HOOK_NAMES[7], ENUMERATED_PLUGIN_HOOK_NAMES[7], ENUMERATED_PLUGIN_HOOK_NAMES[8], ENUMERATED_PLUGIN_HOOK_NAMES[8], ENUMERATED_PLUGIN_HOOK_NAMES[9], ENUMERATED_PLUGIN_HOOK_NAMES[9], ENUMERATED_PLUGIN_HOOK_NAMES[10], ENUMERATED_PLUGIN_HOOK_NAMES[10], ENUMERATED_PLUGIN_HOOK_NAMES[11], ENUMERATED_PLUGIN_HOOK_NAMES[11], ENUMERATED_PLUGIN_HOOK_NAMES[12], ENUMERATED_PLUGIN_HOOK_NAMES[12], ENUMERATED_PLUGIN_HOOK_NAMES[13], ENUMERATED_PLUGIN_HOOK_NAMES[13], ENUMERATED_PLUGIN_HOOK_NAMES[14], ENUMERATED_PLUGIN_HOOK_NAMES[14], ENUMERATED_PLUGIN_HOOK_NAMES[15], ENUMERATED_PLUGIN_HOOK_NAMES[15], ENUMERATED_PLUGIN_HOOK_NAMES[16], ENUMERATED_PLUGIN_HOOK_NAMES[16], ENUMERATED_PLUGIN_HOOK_NAMES[17], ENUMERATED_PLUGIN_HOOK_NAMES[17], ENUMERATED_PLUGIN_HOOK_NAMES[18], ENUMERATED_PLUGIN_HOOK_NAMES[18], ENUMERATED_PLUGIN_HOOK_NAMES[19], ENUMERATED_PLUGIN_HOOK_NAMES[19], ENUMERATED_PLUGIN_HOOK_NAMES[20], ENUMERATED_PLUGIN_HOOK_NAMES[20], ENUMERATED_PLUGIN_HOOK_NAMES[21], ENUMERATED_PLUGIN_HOOK_NAMES[21], ENUMERATED_PLUGIN_HOOK_NAMES[22], ENUMERATED_PLUGIN_HOOK_NAMES[22], ENUMERATED_PLUGIN_HOOK_NAMES[23], ENUMERATED_PLUGIN_HOOK_NAMES[23];
// src/plugin/internal-hooks.ts
/**
* Names of the hidden hooks, alongside {@linkcode InternalFunctionPluginHooks}.
* Kept separate from `ENUMERATED_INPUT_PLUGIN_HOOK_NAMES` so the names stay out
* of the published `.d.ts` (that list's type is reachable from public types).
*/
const INTERNAL_PLUGIN_HOOK_NAMES = ["hotUpdate"];
// src/utils/async-flatten.ts
async function asyncFlatten(array) {
	do
		array = (await Promise.all(array)).flat(Infinity);
	while (array.some((v) => v?.then));
	return array;
}
// src/utils/normalize-plugin-option.ts
const normalizePluginOption = async (plugins) => (await asyncFlatten([plugins])).filter(Boolean);
function checkOutputPluginOption(plugins, onLog) {
	for (const plugin of plugins) for (const hook of [...ENUMERATED_INPUT_PLUGIN_HOOK_NAMES, ...INTERNAL_PLUGIN_HOOK_NAMES]) if (hook in plugin) {
		delete plugin[hook];
		onLog(LOG_LEVEL_WARN, logInputHookInOutputPlugin(plugin.name, hook));
	}
	return plugins;
}
function normalizePlugins(plugins, anonymousPrefix) {
	for (const [index, plugin] of plugins.entries()) {
		if (getParallelPluginInfo(plugin)) continue;
		if (plugin instanceof BuiltinPlugin) continue;
		const objectPlugin = plugin;
		if (!objectPlugin.name) objectPlugin.name = `${anonymousPrefix}${index + 1}`;
	}
	return plugins;
}
const ANONYMOUS_PLUGIN_PREFIX = "at position ";
const ANONYMOUS_OUTPUT_PLUGIN_PREFIX = "at output position ";
// src/plugin/plugin-driver.ts
var PluginDriver = class {
	static async callOptionsHook(inputOptions, watchMode = false) {
		const logLevel = inputOptions.logLevel || "info";
		const plugins = getSortedPlugins("options", getObjectPlugins(await normalizePluginOption(inputOptions.plugins)));
		const logger = getLogger(plugins, getOnLog(inputOptions, logLevel), logLevel, watchMode);
		for (const plugin of plugins) {
			const name = plugin.name || "unknown";
			const options = plugin.options;
			if (options) {
				const { handler } = normalizeHook(options);
				const result = await handler.call(new MinimalPluginContextImpl(logger, logLevel, name, watchMode, "onLog"), inputOptions);
				if (result) inputOptions = result;
			}
		}
		return inputOptions;
	}
	static callOutputOptionsHook(rawPlugins, outputOptions, onLog, logLevel, watchMode) {
		const sortedPlugins = getSortedPlugins("outputOptions", getObjectPlugins(rawPlugins));
		for (const plugin of sortedPlugins) {
			const name = plugin.name || "unknown";
			const options = plugin.outputOptions;
			if (options) {
				const { handler } = normalizeHook(options);
				const result = handler.call(new MinimalPluginContextImpl(onLog, logLevel, name, watchMode), outputOptions);
				if (result) outputOptions = result;
			}
		}
		return outputOptions;
	}
};
function getObjectPlugins(plugins) {
	return plugins.filter((plugin) => {
		if (!plugin) return;
		if (getParallelPluginInfo(plugin)) return;
		if (plugin instanceof BuiltinPlugin) return;
		return plugin;
	});
}
function getSortedPlugins(hookName, plugins) {
	const pre = [];
	const normal = [];
	const post = [];
	for (const plugin of plugins) {
		const hook = plugin[hookName];
		if (hook) {
			if (typeof hook === "object") {
				if (hook.order === "pre") {
					pre.push(plugin);
					continue;
				}
				if (hook.order === "post") {
					post.push(plugin);
					continue;
				}
			}
			normal.push(plugin);
		}
	}
	return [
		...pre,
		...normal,
		...post
	];
}
const DEFAULT_CONFIG = {
	lang: void 0,
	message: void 0,
	abortEarly: void 0,
	abortPipeEarly: void 0
};
/**
* Returns the global configuration.
*
* @param config The config to merge.
*
* @returns The configuration.
*/
/* @__NO_SIDE_EFFECTS__ */
function getGlobalConfig(config$1) {
	if (!config$1 && true) return DEFAULT_CONFIG;
	return {
		lang: config$1?.lang ?? void 0,
		message: config$1?.message,
		abortEarly: config$1?.abortEarly ?? void 0,
		abortPipeEarly: config$1?.abortPipeEarly ?? void 0
	};
}
/**
* Stringifies an unknown input to a literal or type string.
*
* @param input The unknown input.
*
* @returns A literal or type string.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _stringify(input) {
	const type = typeof input;
	if (type === "string") return `"${input}"`;
	if (type === "number" || type === "bigint" || type === "boolean") return `${input}`;
	if (type === "object" || type === "function") return (input && Object.getPrototypeOf(input)?.constructor?.name) ?? "null";
	return type;
}
/**
* Adds an issue to the dataset.
*
* @param context The issue context.
* @param label The issue label.
* @param dataset The input dataset.
* @param config The configuration.
* @param other The optional props.
*
* @internal
*/
function _addIssue(context, label, dataset, config$1, other) {
	const input = other && "input" in other ? other.input : dataset.value;
	const expected = other?.expected ?? context.expects ?? null;
	const received = other?.received ?? /* @__PURE__ */ _stringify(input);
	const issue = {
		kind: context.kind,
		type: context.type,
		input,
		expected,
		received,
		message: `Invalid ${label}: ${expected ? `Expected ${expected} but r` : "R"}eceived ${received}`,
		requirement: context.requirement,
		path: other?.path,
		issues: other?.issues,
		lang: config$1.lang,
		abortEarly: config$1.abortEarly,
		abortPipeEarly: config$1.abortPipeEarly
	};
	const isSchema = context.kind === "schema";
	const message$1 = other?.message ?? context.message ?? (context.reference, issue.lang, void 0) ?? (isSchema ? (issue.lang, void 0) : null) ?? config$1.message ?? (issue.lang, void 0);
	if (message$1 !== void 0) issue.message = typeof message$1 === "function" ? message$1(issue) : message$1;
	if (isSchema) dataset.typed = false;
	if (dataset.issues) dataset.issues.push(issue);
	else dataset.issues = [issue];
}
/**
* Compares two values using the SameValueZero algorithm, which treats `NaN`
* as equal to itself unlike `===`.
*
* @param value1 The first value.
* @param value2 The second value.
*
* @returns Whether the values are equal.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _isSameValueZero(value1, value2) {
	return value1 === value2 || Number.isNaN(value1) && Number.isNaN(value2);
}
/**
* Disallows inherited object properties and prevents object prototype
* pollution by disallowing certain keys.
*
* @param object The object to check.
* @param key The key to check.
*
* @returns Whether the key is allowed.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _isValidObjectKey(object$1, key) {
	return Object.prototype.hasOwnProperty.call(object$1, key) && key !== "__proto__" && key !== "prototype" && key !== "constructor";
}
/**
* Joins multiple `expects` values with the given separator.
*
* @param values The `expects` values.
* @param separator The separator.
*
* @returns The joined `expects` property.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _joinExpects(values$1, separator) {
	const list = [...new Set(values$1)];
	if (list.length > 1) return `(${list.join(` ${separator} `)})`;
	return list[0] ?? "never";
}
/**
* Eagerly creates and attaches the Standard Schema properties of a schema.
*
* Hint: The contextual `this` type includes the standard properties that are
* attached before the schema is returned.
*
* @param schema The schema to attach standard properties to.
*
* @returns The schema with standard properties attached.
*
* @internal
*/
function _standardSchema(schema) {
	schema["~standard"] = {
		version: 1,
		vendor: "valibot",
		validate: (value$1) => schema["~run"]({ value: value$1 }, /* @__PURE__ */ getGlobalConfig())
	};
	return schema;
}
/**
* A Valibot error with useful information.
*/
var ValiError = class extends Error {
	/**
	* Creates a Valibot error with useful information.
	*
	* @param issues The error issues.
	*/
	constructor(issues) {
		super(issues[0].message);
		this.name = "ValiError";
		this.issues = issues;
	}
};
/* @__NO_SIDE_EFFECTS__ */
function args(schema) {
	return {
		kind: "transformation",
		type: "args",
		reference: args,
		async: false,
		schema,
		"~run"(dataset, config$1) {
			const func = dataset.value;
			dataset.value = (...args_) => {
				const argsDataset = this.schema["~run"]({ value: args_ }, config$1);
				if (argsDataset.issues) throw new ValiError(argsDataset.issues);
				return func(...argsDataset.value);
			};
			return dataset;
		}
	};
}
/**
* Creates an await transformation action.
*
* @returns An await action.
*/
/* @__NO_SIDE_EFFECTS__ */
function awaitAsync() {
	return {
		kind: "transformation",
		type: "await",
		reference: awaitAsync,
		async: true,
		async "~run"(dataset) {
			dataset.value = await dataset.value;
			return dataset;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function check(requirement, message$1) {
	return {
		kind: "validation",
		type: "check",
		reference: check,
		async: false,
		expects: null,
		requirement,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "input", dataset, config$1);
			return dataset;
		}
	};
}
/**
* Creates a description metadata action.
*
* @param description_ The description text.
*
* @returns A description action.
*/
/* @__NO_SIDE_EFFECTS__ */
function description(description_) {
	return {
		kind: "metadata",
		type: "description",
		reference: description,
		description: description_
	};
}
/* @__NO_SIDE_EFFECTS__ */
function returns(schema) {
	return {
		kind: "transformation",
		type: "returns",
		reference: returns,
		async: false,
		schema,
		"~run"(dataset, config$1) {
			const func = dataset.value;
			dataset.value = (...args_) => {
				const returnsDataset = this.schema["~run"]({ value: func(...args_) }, config$1);
				if (returnsDataset.issues) throw new ValiError(returnsDataset.issues);
				return returnsDataset.value;
			};
			return dataset;
		}
	};
}
/* @__NO_SIDE_EFFECTS__ */
function returnsAsync(schema) {
	return {
		kind: "transformation",
		type: "returns",
		reference: returnsAsync,
		async: false,
		schema,
		"~run"(dataset, config$1) {
			const func = dataset.value;
			dataset.value = async (...args_) => {
				const returnsDataset = await this.schema["~run"]({ value: await func(...args_) }, config$1);
				if (returnsDataset.issues) throw new ValiError(returnsDataset.issues);
				return returnsDataset.value;
			};
			return dataset;
		}
	};
}
const ABORT_EARLY_CONFIG = { abortEarly: true };
/**
* Returns the fallback value of the schema.
*
* @param schema The schema to get it from.
* @param dataset The output dataset if available.
* @param config The config if available.
*
* @returns The fallback value.
*/
/* @__NO_SIDE_EFFECTS__ */
function getFallback(schema, dataset, config$1) {
	return typeof schema.fallback === "function" ? schema.fallback(dataset, config$1) : schema.fallback;
}
/**
* Returns the default value of the schema.
*
* @param schema The schema to get it from.
* @param dataset The input dataset if available.
* @param config The config if available.
*
* @returns The default value.
*/
/* @__NO_SIDE_EFFECTS__ */
function getDefault(schema, dataset, config$1) {
	return typeof schema.default === "function" ? schema.default(dataset, config$1) : schema.default;
}
/**
* Checks if the input matches the schema. By using a type predicate, this
* function can be used as a type guard.
*
* @param schema The schema to be used.
* @param input The input to be tested.
*
* @returns Whether the input matches the schema.
*/
/* @__NO_SIDE_EFFECTS__ */
function is(schema, input) {
	return !schema["~run"]({ value: input }, ABORT_EARLY_CONFIG).issues;
}
/**
* Creates an any schema.
*
* Hint: This schema function exists only for completeness and is not
* recommended in practice. Instead, `unknown` should be used to accept
* unknown data.
*
* @returns An any schema.
*/
/* @__NO_SIDE_EFFECTS__ */
function any() {
	return _standardSchema({
		kind: "schema",
		type: "any",
		reference: any,
		expects: "any",
		async: false,
		"~run"(dataset) {
			dataset.typed = true;
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function array(item, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "array",
		reference: array,
		expects: "Array",
		async: false,
		item,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (Array.isArray(input)) {
				dataset.typed = true;
				dataset.value = [];
				for (let key = 0; key < input.length; key++) {
					const value$1 = input[key];
					const itemDataset = this.item["~run"]({ value: value$1 }, config$1);
					if (itemDataset.issues) {
						const pathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of itemDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = itemDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!itemDataset.typed) dataset.typed = false;
					dataset.value.push(itemDataset.value);
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function boolean(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "boolean",
		reference: boolean,
		expects: "boolean",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (typeof dataset.value === "boolean") dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function custom(check$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "custom",
		reference: custom,
		expects: "unknown",
		async: false,
		check: check$1,
		message: message$1,
		"~run"(dataset, config$1) {
			if (this.check(dataset.value)) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function function_(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "function",
		reference: function_,
		expects: "Function",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (typeof dataset.value === "function") dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function instance(class_, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "instance",
		reference: instance,
		expects: class_.name,
		async: false,
		class: class_,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.value instanceof this.class) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function literal(literal_, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "literal",
		reference: literal,
		expects: /* @__PURE__ */ _stringify(literal_),
		async: false,
		literal: literal_,
		message: message$1,
		"~run"(dataset, config$1) {
			if (/* @__PURE__ */ _isSameValueZero(dataset.value, this.literal)) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function never(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "never",
		reference: never,
		expects: "never",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			_addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function nullish(wrapped, default_) {
	return _standardSchema({
		kind: "schema",
		type: "nullish",
		reference: nullish,
		expects: `(${wrapped.expects} | null | undefined)`,
		async: false,
		wrapped,
		default: default_,
		"~run"(dataset, config$1) {
			if (dataset.value === null || dataset.value === void 0) {
				if (this.default !== void 0) dataset.value = /* @__PURE__ */ getDefault(this, dataset, config$1);
				if (dataset.value === null || dataset.value === void 0) {
					dataset.typed = true;
					return dataset;
				}
			}
			return this.wrapped["~run"](dataset, config$1);
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function number(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "number",
		reference: number,
		expects: "number",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (typeof dataset.value === "number" && !isNaN(dataset.value)) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function object(entries$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "object",
		reference: object,
		expects: "Object",
		async: false,
		entries: entries$1,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				dataset.typed = true;
				dataset.value = {};
				for (const key in this.entries) {
					const valueSchema = this.entries[key];
					if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
						const value$1 = key in input ? input[key] : /* @__PURE__ */ getDefault(valueSchema);
						const valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
						if (valueDataset.issues) {
							const pathItem = {
								type: "object",
								origin: "value",
								input,
								key,
								value: value$1
							};
							for (const issue of valueDataset.issues) {
								if (issue.path) issue.path.unshift(pathItem);
								else issue.path = [pathItem];
								dataset.issues?.push(issue);
							}
							if (!dataset.issues) dataset.issues = valueDataset.issues;
							if (config$1.abortEarly) {
								dataset.typed = false;
								break;
							}
						}
						if (!valueDataset.typed) dataset.typed = false;
						dataset.value[key] = valueDataset.value;
					} else if (valueSchema.fallback !== void 0) dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
					else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
						_addIssue(this, "key", dataset, config$1, {
							input: void 0,
							expected: `"${key}"`,
							path: [{
								type: "object",
								origin: "key",
								input,
								key,
								value: input[key]
							}]
						});
						if (config$1.abortEarly) break;
					}
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function optional(wrapped, default_) {
	return _standardSchema({
		kind: "schema",
		type: "optional",
		reference: optional,
		expects: `(${wrapped.expects} | undefined)`,
		async: false,
		wrapped,
		default: default_,
		"~run"(dataset, config$1) {
			if (dataset.value === void 0) {
				if (this.default !== void 0) dataset.value = /* @__PURE__ */ getDefault(this, dataset, config$1);
				if (dataset.value === void 0) {
					dataset.typed = true;
					return dataset;
				}
			}
			return this.wrapped["~run"](dataset, config$1);
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function picklist(options, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "picklist",
		reference: picklist,
		expects: /* @__PURE__ */ _joinExpects(options.map(_stringify), "|"),
		async: false,
		options,
		message: message$1,
		"~run"(dataset, config$1) {
			if (this.options.includes(dataset.value)) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function promise(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "promise",
		reference: promise,
		expects: "Promise",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.value instanceof Promise) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function record(key, value$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "record",
		reference: record,
		expects: "Object",
		async: false,
		key,
		value: value$1,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				dataset.typed = true;
				dataset.value = {};
				for (const entryKey in input) if (/* @__PURE__ */ _isValidObjectKey(input, entryKey)) {
					const entryValue = input[entryKey];
					const keyDataset = this.key["~run"]({ value: entryKey }, config$1);
					if (keyDataset.issues) {
						const pathItem = {
							type: "object",
							origin: "key",
							input,
							key: entryKey,
							value: entryValue
						};
						for (const issue of keyDataset.issues) {
							issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = keyDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					const valueDataset = this.value["~run"]({ value: entryValue }, config$1);
					if (valueDataset.issues) {
						const pathItem = {
							type: "object",
							origin: "value",
							input,
							key: entryKey,
							value: entryValue
						};
						for (const issue of valueDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = valueDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!keyDataset.typed || !valueDataset.typed) dataset.typed = false;
					if (keyDataset.typed) dataset.value[keyDataset.value] = valueDataset.value;
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function strictObject(entries$1, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "strict_object",
		reference: strictObject,
		expects: "Object",
		async: false,
		entries: entries$1,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (input && typeof input === "object") {
				dataset.typed = true;
				dataset.value = {};
				for (const key in this.entries) {
					const valueSchema = this.entries[key];
					if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
						const value$1 = key in input ? input[key] : /* @__PURE__ */ getDefault(valueSchema);
						const valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
						if (valueDataset.issues) {
							const pathItem = {
								type: "object",
								origin: "value",
								input,
								key,
								value: value$1
							};
							for (const issue of valueDataset.issues) {
								if (issue.path) issue.path.unshift(pathItem);
								else issue.path = [pathItem];
								dataset.issues?.push(issue);
							}
							if (!dataset.issues) dataset.issues = valueDataset.issues;
							if (config$1.abortEarly) {
								dataset.typed = false;
								break;
							}
						}
						if (!valueDataset.typed) dataset.typed = false;
						dataset.value[key] = valueDataset.value;
					} else if (valueSchema.fallback !== void 0) dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
					else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
						_addIssue(this, "key", dataset, config$1, {
							input: void 0,
							expected: `"${key}"`,
							path: [{
								type: "object",
								origin: "key",
								input,
								key,
								value: input[key]
							}]
						});
						if (config$1.abortEarly) break;
					}
				}
				if (!dataset.issues || !config$1.abortEarly) {
					for (const key in input) if (!Object.prototype.hasOwnProperty.call(this.entries, key)) {
						_addIssue(this, "key", dataset, config$1, {
							input: key,
							expected: "never",
							path: [{
								type: "object",
								origin: "key",
								input,
								key,
								value: input[key]
							}]
						});
						break;
					}
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function string(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "string",
		reference: string,
		expects: "string",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (typeof dataset.value === "string") dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function tuple(items, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "tuple",
		reference: tuple,
		expects: "Array",
		async: false,
		items,
		message: message$1,
		"~run"(dataset, config$1) {
			const input = dataset.value;
			if (Array.isArray(input)) {
				dataset.typed = true;
				dataset.value = [];
				for (let key = 0; key < this.items.length; key++) {
					const value$1 = input[key];
					const itemDataset = this.items[key]["~run"]({ value: value$1 }, config$1);
					if (itemDataset.issues) {
						const pathItem = {
							type: "array",
							origin: "value",
							input,
							key,
							value: value$1
						};
						for (const issue of itemDataset.issues) {
							if (issue.path) issue.path.unshift(pathItem);
							else issue.path = [pathItem];
							dataset.issues?.push(issue);
						}
						if (!dataset.issues) dataset.issues = itemDataset.issues;
						if (config$1.abortEarly) {
							dataset.typed = false;
							break;
						}
					}
					if (!itemDataset.typed) dataset.typed = false;
					dataset.value.push(itemDataset.value);
				}
			} else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function undefined_(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "undefined",
		reference: undefined_,
		expects: "undefined",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.value === void 0) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/**
* Returns the sub issues of the provided datasets for the union issue.
*
* @param datasets The datasets.
*
* @returns The sub issues.
*
* @internal
*/
/* @__NO_SIDE_EFFECTS__ */
function _subIssues(datasets) {
	let issues;
	if (datasets) for (const dataset of datasets) if (issues) for (const issue of dataset.issues) issues.push(issue);
	else issues = dataset.issues;
	return issues;
}
/* @__NO_SIDE_EFFECTS__ */
function union(options, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "union",
		reference: union,
		expects: /* @__PURE__ */ _joinExpects(options.map((option) => option.expects), "|"),
		async: false,
		options,
		message: message$1,
		"~run"(dataset, config$1) {
			let validDataset;
			let typedDatasets;
			let untypedDatasets;
			for (const schema of this.options) {
				const optionDataset = schema["~run"]({ value: dataset.value }, config$1);
				if (optionDataset.typed) if (optionDataset.issues) if (typedDatasets) typedDatasets.push(optionDataset);
				else typedDatasets = [optionDataset];
				else {
					validDataset = optionDataset;
					break;
				}
				else if (untypedDatasets) untypedDatasets.push(optionDataset);
				else untypedDatasets = [optionDataset];
			}
			if (validDataset) return validDataset;
			if (typedDatasets) {
				if (typedDatasets.length === 1) return typedDatasets[0];
				_addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(typedDatasets) });
				dataset.typed = true;
			} else if (untypedDatasets?.length === 1) return untypedDatasets[0];
			else _addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(untypedDatasets) });
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function unionAsync(options, message$1) {
	return _standardSchema({
		kind: "schema",
		type: "union",
		reference: unionAsync,
		expects: /* @__PURE__ */ _joinExpects(options.map((option) => option.expects), "|"),
		async: true,
		options,
		message: message$1,
		async "~run"(dataset, config$1) {
			let validDataset;
			let typedDatasets;
			let untypedDatasets;
			for (const schema of this.options) {
				const optionDataset = await schema["~run"]({ value: dataset.value }, config$1);
				if (optionDataset.typed) if (optionDataset.issues) if (typedDatasets) typedDatasets.push(optionDataset);
				else typedDatasets = [optionDataset];
				else {
					validDataset = optionDataset;
					break;
				}
				else if (untypedDatasets) untypedDatasets.push(optionDataset);
				else untypedDatasets = [optionDataset];
			}
			if (validDataset) return validDataset;
			if (typedDatasets) {
				if (typedDatasets.length === 1) return typedDatasets[0];
				_addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(typedDatasets) });
				dataset.typed = true;
			} else if (untypedDatasets?.length === 1) return untypedDatasets[0];
			else _addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(untypedDatasets) });
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function void_(message$1) {
	return _standardSchema({
		kind: "schema",
		type: "void",
		reference: void_,
		expects: "void",
		async: false,
		message: message$1,
		"~run"(dataset, config$1) {
			if (dataset.value === void 0) dataset.typed = true;
			else _addIssue(this, "type", dataset, config$1);
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function keyof(schema, message$1) {
	return /* @__PURE__ */ picklist(Object.keys(schema.entries), message$1);
}
/**
* Creates a modified copy of an object schema that does not contain the
* selected entries.
*
* @param schema The schema to omit from.
* @param keys The selected entries.
*
* @returns An object schema.
*/
/* @__NO_SIDE_EFFECTS__ */
function omit(schema, keys) {
	const entries$1 = { ...schema.entries };
	for (const key of keys) delete entries$1[key];
	return _standardSchema({
		...schema,
		entries: entries$1
	});
}
/* @__NO_SIDE_EFFECTS__ */
function partial(schema, keys) {
	const entries$1 = {};
	for (const key in schema.entries) entries$1[key] = !keys || keys.includes(key) ? /* @__PURE__ */ optional(schema.entries[key]) : schema.entries[key];
	return _standardSchema({
		...schema,
		entries: entries$1
	});
}
/* @__NO_SIDE_EFFECTS__ */
function pipe(...pipe$1) {
	return _standardSchema({
		...pipe$1[0],
		pipe: pipe$1,
		"~run"(dataset, config$1) {
			for (const item of pipe$1) if (item.kind !== "metadata") {
				if (dataset.issues && (item.kind === "schema" || item.kind === "transformation")) {
					dataset.typed = false;
					break;
				}
				if (!dataset.issues || !config$1.abortEarly && !config$1.abortPipeEarly) dataset = item["~run"](dataset, config$1);
			}
			return dataset;
		}
	});
}
/* @__NO_SIDE_EFFECTS__ */
function pipeAsync(...pipe$1) {
	return _standardSchema({
		...pipe$1[0],
		pipe: pipe$1,
		async: true,
		async "~run"(dataset, config$1) {
			for (const item of pipe$1) if (item.kind !== "metadata") {
				if (dataset.issues && (item.kind === "schema" || item.kind === "transformation")) {
					dataset.typed = false;
					break;
				}
				if (!dataset.issues || !config$1.abortEarly && !config$1.abortPipeEarly) dataset = await item["~run"](dataset, config$1);
			}
			return dataset;
		}
	});
}
/**
* Parses an unknown input based on a schema.
*
* @param schema The schema to be used.
* @param input The input to be parsed.
* @param config The parse configuration.
*
* @returns The parse result.
*/
/* @__NO_SIDE_EFFECTS__ */
function safeParse(schema, input, config$1) {
	const dataset = schema["~run"]({ value: input }, /* @__PURE__ */ getGlobalConfig(config$1));
	return {
		typed: dataset.typed,
		success: !dataset.issues,
		output: dataset.value,
		issues: dataset.issues
	};
}
// src/utils/flatten-valibot-schema.ts
function unwrapSchema(schema) {
	if (!schema) return schema;
	if (schema.type === "optional" && schema.wrapped) return unwrapSchema(schema.wrapped);
	if (schema.type === "nullable" && schema.wrapped) return unwrapSchema(schema.wrapped);
	if (schema.type === "nullish" && schema.wrapped) return unwrapSchema(schema.wrapped);
	return schema;
}
function getValibotSchemaType(schema) {
	if (!schema) return "any";
	if (schema.type) switch (schema.type) {
		case "string": return "string";
		case "number": return "number";
		case "boolean": return "boolean";
		case "array": return "array";
		case "object":
		case "strict_object":
		case "loose_object": return "object";
		case "union": return "union";
		case "literal": return typeof schema.literal;
		case "record": return "object";
		case "optional": return getValibotSchemaType(schema.wrapped);
		case "nullable": return getValibotSchemaType(schema.wrapped);
		case "nullish": return getValibotSchemaType(schema.wrapped);
		case "never": return "never";
		case "any": return "any";
		case "custom": return "any";
		case "function": return "never";
		case "instance": return "object";
		default: return "any";
	}
	return "any";
}
function getValibotDescription(schema) {
	if (!schema) return void 0;
	if (schema.pipe && Array.isArray(schema.pipe)) {
		for (const action of schema.pipe) if (action.type === "description" && action.description) return action.description;
	}
	if (schema.type === "optional" && schema.wrapped) return getValibotDescription(schema.wrapped);
}
function flattenValibotSchema(schema, result = {}, prefix = "") {
	if (!schema || typeof schema !== "object") return result;
	if (schema.type === "strict_object" || schema.type === "object" || schema.type === "loose_object") {
		if (schema.entries && typeof schema.entries === "object") for (const [key, value] of Object.entries(schema.entries)) {
			const fullKey = prefix ? `${prefix}.${key}` : key;
			const valueSchema = value;
			const type = getValibotSchemaType(valueSchema);
			const description = getValibotDescription(valueSchema);
			if (type === "object") {
				const unwrappedSchema = unwrapSchema(valueSchema);
				if (unwrappedSchema && unwrappedSchema.entries) flattenValibotSchema(unwrappedSchema, result, fullKey);
				else result[fullKey] = {
					type,
					description
				};
			} else result[fullKey] = {
				type,
				description
			};
		}
	}
	return result;
}
// src/utils/style-text.ts
/**
* Cross-platform styleText utility that works in both Node.js and browser environments
* In Node.js, it uses the native `styleText` from `node:util`
* In browser, it provides empty styling functions for compatibility
*/
function styleText$1(...args) {
	return styleText(...args);
}
// src/utils/validator.ts
const StringOrRegExpSchema = /* @__PURE__ */ union([/* @__PURE__ */ string(), /* @__PURE__ */ instance(RegExp)]);
function vFunction() {
	return /* @__PURE__ */ function_();
}
const LogLevelSchema = /* @__PURE__ */ union([
	/* @__PURE__ */ literal("debug"),
	/* @__PURE__ */ literal("info"),
	/* @__PURE__ */ literal("warn")
]);
const LogLevelOptionSchema = /* @__PURE__ */ union([LogLevelSchema, /* @__PURE__ */ literal("silent")]);
const LogLevelWithErrorSchema = /* @__PURE__ */ union([LogLevelSchema, /* @__PURE__ */ literal("error")]);
const RollupLogSchema = /* @__PURE__ */ any();
const RollupLogWithStringSchema = /* @__PURE__ */ union([RollupLogSchema, /* @__PURE__ */ string()]);
const InputOptionSchema = /* @__PURE__ */ union([
	/* @__PURE__ */ string(),
	/* @__PURE__ */ array(/* @__PURE__ */ string()),
	/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ string())
]);
const ExternalOptionFunctionSchema = /* @__PURE__ */ pipe(vFunction(), /* @__PURE__ */ args(/* @__PURE__ */ tuple([
	/* @__PURE__ */ string(),
	/* @__PURE__ */ optional(/* @__PURE__ */ string()),
	/* @__PURE__ */ boolean()
])), /* @__PURE__ */ returns(/* @__PURE__ */ nullish(/* @__PURE__ */ boolean())));
const ExternalOptionSchema = /* @__PURE__ */ union([
	StringOrRegExpSchema,
	/* @__PURE__ */ array(StringOrRegExpSchema),
	ExternalOptionFunctionSchema
]);
const ModuleTypesSchema = /* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ union([
	/* @__PURE__ */ literal("asset"),
	/* @__PURE__ */ literal("base64"),
	/* @__PURE__ */ literal("binary"),
	/* @__PURE__ */ literal("copy"),
	/* @__PURE__ */ literal("css"),
	/* @__PURE__ */ literal("dataurl"),
	/* @__PURE__ */ literal("empty"),
	/* @__PURE__ */ literal("js"),
	/* @__PURE__ */ literal("json"),
	/* @__PURE__ */ literal("jsx"),
	/* @__PURE__ */ literal("text"),
	/* @__PURE__ */ literal("ts"),
	/* @__PURE__ */ literal("tsx")
]));
const TransformOptionsSchema = /* @__PURE__ */ object({
	assumptions: /* @__PURE__ */ optional(/* @__PURE__ */ object({
		ignoreFunctionLength: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		noDocumentAll: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		objectRestNoSymbols: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		pureGetters: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		setPublicClassFields: /* @__PURE__ */ optional(/* @__PURE__ */ boolean())
	})),
	typescript: /* @__PURE__ */ optional(/* @__PURE__ */ object({
		jsxPragma: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
		jsxPragmaFrag: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
		onlyRemoveTypeImports: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		allowNamespaces: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		allowDeclareFields: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		removeClassFieldsWithoutInitializer: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		optimizeConstEnums: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		optimizeEnums: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		declaration: /* @__PURE__ */ optional(/* @__PURE__ */ object({
			stripInternal: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
			sourcemap: /* @__PURE__ */ optional(/* @__PURE__ */ boolean())
		})),
		rewriteImportExtensions: /* @__PURE__ */ optional(/* @__PURE__ */ union([
			/* @__PURE__ */ literal("rewrite"),
			/* @__PURE__ */ literal("remove"),
			/* @__PURE__ */ boolean()
		]))
	})),
	helpers: /* @__PURE__ */ optional(/* @__PURE__ */ object({ mode: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ literal("Runtime"), /* @__PURE__ */ literal("External")])) })),
	decorator: /* @__PURE__ */ optional(/* @__PURE__ */ object({
		legacy: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		emitDecoratorMetadata: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		strictNullChecks: /* @__PURE__ */ optional(/* @__PURE__ */ boolean())
	})),
	jsx: /* @__PURE__ */ optional(/* @__PURE__ */ union([
		/* @__PURE__ */ literal(false),
		/* @__PURE__ */ literal("preserve"),
		/* @__PURE__ */ literal("react"),
		/* @__PURE__ */ literal("react-jsx"),
		/* @__PURE__ */ strictObject({
			runtime: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ literal("classic"), /* @__PURE__ */ literal("automatic")])), /* @__PURE__ */ description("Which runtime to use")),
			development: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Development specific information")),
			throwIfNamespace: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Toggles whether to throw an error when a tag name uses an XML namespace")),
			pure: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Mark JSX elements and top-level React method calls as pure for tree shaking.")),
			importSource: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("Import the factory of element and fragment if mode is classic")),
			pragma: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("Jsx element transformation")),
			pragmaFrag: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("Jsx fragment transformation")),
			refresh: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ any()])), /* @__PURE__ */ description("Enable react fast refresh"))
		})
	])),
	target: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ string(), /* @__PURE__ */ array(/* @__PURE__ */ string())])), /* @__PURE__ */ description("The JavaScript target environment")),
	define: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ string())), /* @__PURE__ */ description("Define global variables (syntax: key:value,key2:value2)")),
	inject: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ union([/* @__PURE__ */ string(), /* @__PURE__ */ tuple([/* @__PURE__ */ string(), /* @__PURE__ */ string()])]))), /* @__PURE__ */ description("Inject import statements on demand")),
	dropLabels: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())), /* @__PURE__ */ description("Remove labeled statements with these label names")),
	plugins: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ object({
		styledComponents: /* @__PURE__ */ optional(/* @__PURE__ */ any()),
		taggedTemplateEscape: /* @__PURE__ */ optional(/* @__PURE__ */ boolean())
	})), /* @__PURE__ */ description("Third-party plugins to use"))
});
const WatcherFileWatcherOptionsSchema = /* @__PURE__ */ strictObject({
	usePolling: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Use polling-based file watching instead of native OS events")),
	pollInterval: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ number()), /* @__PURE__ */ description("Poll interval in milliseconds (only used when usePolling is true)")),
	compareContentsForPolling: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Compare file contents for poll-based watchers (only used when usePolling is true)")),
	useDebounce: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Use debounced event delivery at the filesystem level")),
	debounceDelay: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ number()), /* @__PURE__ */ description("Debounce delay in milliseconds (only used when useDebounce is true)")),
	debounceTickRate: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ number()), /* @__PURE__ */ description("Tick rate in milliseconds for debouncer (only used when useDebounce is true)"))
});
const WatcherOptionsSchema = /* @__PURE__ */ strictObject({
	chokidar: /* @__PURE__ */ optional(/* @__PURE__ */ never(`The "watch.chokidar" option is deprecated, please use "watch.watcher" instead of it`)),
	exclude: /* @__PURE__ */ optional(/* @__PURE__ */ union([StringOrRegExpSchema, /* @__PURE__ */ array(StringOrRegExpSchema)])),
	include: /* @__PURE__ */ optional(/* @__PURE__ */ union([StringOrRegExpSchema, /* @__PURE__ */ array(StringOrRegExpSchema)])),
	watcher: /* @__PURE__ */ optional(WatcherFileWatcherOptionsSchema),
	notify: /* @__PURE__ */ optional(WatcherFileWatcherOptionsSchema),
	skipWrite: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Skip the bundle.write() step")),
	buildDelay: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ number()), /* @__PURE__ */ description("Throttle watch rebuilds")),
	clearScreen: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to clear the screen when a rebuild is triggered")),
	onInvalidate: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(vFunction()), /* @__PURE__ */ description("An optional function that will be called immediately every time a module changes that is part of the build."))
});
const ChecksOptionsSchema = /* @__PURE__ */ strictObject({
	circularDependency: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when detecting circular dependency")),
	eval: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when detecting uses of direct `eval`s")),
	missingGlobalName: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when the `output.globals` option is missing when needed")),
	missingNameOptionForIifeExport: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when the `output.name` option is missing when needed")),
	invalidAnnotation: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when a `#__PURE__` / `@__PURE__` annotation has no effect due to its position")),
	mixedExports: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when the way to export values is ambiguous")),
	unresolvedEntry: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when an entrypoint cannot be resolved")),
	unresolvedImport: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when an import cannot be resolved")),
	filenameConflict: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when files generated have the same name with different contents")),
	moduleLevelDirective: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings for module-level directives other than `use strict`")),
	commonJsVariableInEsm: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when a CommonJS variable is used in an ES module")),
	importIsUndefined: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when an imported variable is not exported")),
	emptyImportMeta: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when `import.meta` is not supported with the output format and is replaced with an empty object (`{}`)")),
	toleratedTransform: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when detecting tolerated transform")),
	cannotCallNamespace: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when a namespace is called as a function")),
	configurationFieldConflict: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when a config value is overridden by another config value with a higher priority")),
	preferBuiltinFeature: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when a plugin that is covered by a built-in feature is used")),
	couldNotCleanDirectory: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when Rolldown could not clean the output directory")),
	bundlerTimings: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when plugins and option callbacks take significant time during the build process")),
	pluginTimings: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Deprecated alias for bundlerTimings. Rolldown uses bundlerTimings if both options have values.")),
	duplicateShebang: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when both the code and postBanner contain shebang")),
	unsupportedTsconfigOption: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when a tsconfig option or combination of options is not supported")),
	ineffectiveDynamicImport: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when a module is dynamically imported but also statically imported, making the dynamic import ineffective for code splitting")),
	largeBarrelModules: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit info logs when a barrel module has a very large number of re-exports (more than 5000)")),
	sourcemapBroken: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when a plugin transforms code without generating a sourcemap")),
	namespaceConflict: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when multiple star re-exports provide the same name from different modules")),
	shimmedExport: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to emit warnings when a missing export is replaced with an undefined binding"))
});
const MinifyOptionsSchema = /* @__PURE__ */ strictObject({
	compress: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ strictObject({
		target: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ string(), /* @__PURE__ */ array(/* @__PURE__ */ string())])),
		dropConsole: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		dropDebugger: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		keepNames: /* @__PURE__ */ optional(/* @__PURE__ */ strictObject({
			function: /* @__PURE__ */ boolean(),
			class: /* @__PURE__ */ boolean()
		})),
		unused: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ literal("keep_assign")])),
		joinVars: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		sequences: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		dropLabels: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
		maxIterations: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
		treeshake: /* @__PURE__ */ optional(/* @__PURE__ */ strictObject({
			annotations: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
			manualPureFunctions: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
			propertyReadSideEffects: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ literal("always")])),
			propertyWriteSideEffects: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
			unknownGlobalSideEffects: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
			invalidImportSideEffects: /* @__PURE__ */ optional(/* @__PURE__ */ boolean())
		}))
	})])),
	mangle: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ strictObject({
		toplevel: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		keepNames: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ strictObject({
			function: /* @__PURE__ */ boolean(),
			class: /* @__PURE__ */ boolean()
		})])),
		reserved: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
		debug: /* @__PURE__ */ optional(/* @__PURE__ */ boolean())
	})])),
	mangleProps: /* @__PURE__ */ optional(/* @__PURE__ */ strictObject({
		include: /* @__PURE__ */ instance(RegExp),
		exclude: /* @__PURE__ */ optional(/* @__PURE__ */ instance(RegExp)),
		reserved: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
		quoted: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		debug: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		cache: /* @__PURE__ */ optional(/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ union([/* @__PURE__ */ string(), /* @__PURE__ */ literal(false)])))
	})),
	codegen: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ strictObject({
		removeWhitespace: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		asciiOnly: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		legalComments: /* @__PURE__ */ optional(/* @__PURE__ */ union([
			/* @__PURE__ */ literal("none"),
			/* @__PURE__ */ literal("inline"),
			/* @__PURE__ */ literal("eof"),
			/* @__PURE__ */ literal("external"),
			/* @__PURE__ */ strictObject({ linked: /* @__PURE__ */ string() })
		]))
	})]))
});
const ResolveOptionsSchema = /* @__PURE__ */ strictObject({
	alias: /* @__PURE__ */ optional(/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ union([
		/* @__PURE__ */ literal(false),
		/* @__PURE__ */ string(),
		/* @__PURE__ */ array(/* @__PURE__ */ string())
	]))),
	aliasFields: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ array(/* @__PURE__ */ string()))),
	conditionNames: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
	extensionAlias: /* @__PURE__ */ optional(/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ array(/* @__PURE__ */ string()))),
	exportsFields: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ array(/* @__PURE__ */ string()))),
	extensions: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
	mainFields: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
	mainFiles: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
	modules: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
	symlinks: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
	tsconfigFilename: /* @__PURE__ */ optional(/* @__PURE__ */ string())
});
const TreeshakingOptionsSchema = /* @__PURE__ */ strictObject({
	moduleSideEffects: /* @__PURE__ */ optional(/* @__PURE__ */ any()),
	annotations: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
	manualPureFunctions: /* @__PURE__ */ optional(/* @__PURE__ */ custom((input) => /* @__PURE__ */ is(/* @__PURE__ */ array(/* @__PURE__ */ string()), input), "string array")),
	unknownGlobalSideEffects: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
	invalidImportSideEffects: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
	commonjs: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
	propertyReadSideEffects: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ literal(false), /* @__PURE__ */ literal("always")])),
	propertyWriteSideEffects: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ literal(false), /* @__PURE__ */ literal("always")]))
});
const OptimizationOptionsSchema = /* @__PURE__ */ strictObject({
	inlineConst: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ strictObject({
		mode: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ literal("all"), /* @__PURE__ */ literal("smart")])),
		pass: /* @__PURE__ */ optional(/* @__PURE__ */ number())
	})])), /* @__PURE__ */ description("Enable crossmodule constant inlining")),
	pifeForModuleWrappers: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Use PIFE pattern for module wrappers"))
});
const LogOrStringHandlerSchema = /* @__PURE__ */ pipe(vFunction(), /* @__PURE__ */ args(/* @__PURE__ */ tuple([LogLevelWithErrorSchema, RollupLogWithStringSchema])));
const OnLogSchema = /* @__PURE__ */ pipe(vFunction(), /* @__PURE__ */ args(/* @__PURE__ */ tuple([
	LogLevelSchema,
	RollupLogSchema,
	LogOrStringHandlerSchema
])));
const OnwarnSchema = /* @__PURE__ */ pipe(vFunction(), /* @__PURE__ */ args(/* @__PURE__ */ tuple([RollupLogSchema, /* @__PURE__ */ pipe(vFunction(), /* @__PURE__ */ args(/* @__PURE__ */ tuple([/* @__PURE__ */ union([RollupLogWithStringSchema, /* @__PURE__ */ pipe(vFunction(), /* @__PURE__ */ returns(RollupLogWithStringSchema))])])))])));
const DevModeSchema = /* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ strictObject({
	port: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
	host: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	implement: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	skipCommonRuntimeInjection: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
	lazy: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
	hotUpdate: /* @__PURE__ */ optional(/* @__PURE__ */ boolean())
})]);
const InputOptionsSchema = /* @__PURE__ */ strictObject({
	input: /* @__PURE__ */ optional(InputOptionSchema),
	plugins: /* @__PURE__ */ optional(/* @__PURE__ */ custom(() => true)),
	external: /* @__PURE__ */ optional(ExternalOptionSchema),
	makeAbsoluteExternalsRelative: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ literal("ifRelativeSource")])),
	resolve: /* @__PURE__ */ optional(ResolveOptionsSchema),
	cwd: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("Current working directory")),
	platform: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([
		/* @__PURE__ */ literal("browser"),
		/* @__PURE__ */ literal("neutral"),
		/* @__PURE__ */ literal("node")
	])), /* @__PURE__ */ description(`Platform for which the code should be generated (node, ${styleText$1("underline", "browser")}, neutral)`)),
	shimMissingExports: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Create shim variables for missing exports")),
	treeshake: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), TreeshakingOptionsSchema])),
	optimization: /* @__PURE__ */ optional(OptimizationOptionsSchema),
	logLevel: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(LogLevelOptionSchema), /* @__PURE__ */ description(`Log level (${styleText$1("dim", "silent")}, ${styleText$1(["underline", "gray"], "info")}, debug, ${styleText$1("yellow", "warn")})`)),
	onLog: /* @__PURE__ */ optional(OnLogSchema),
	onwarn: /* @__PURE__ */ optional(OnwarnSchema),
	moduleTypes: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(ModuleTypesSchema), /* @__PURE__ */ description("Module types for customized extensions")),
	experimental: /* @__PURE__ */ optional(/* @__PURE__ */ strictObject({
		viteMode: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		resolveNewUrlToAsset: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		devMode: /* @__PURE__ */ optional(DevModeSchema),
		chunkModulesOrder: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ literal("module-id"), /* @__PURE__ */ literal("exec-order")])),
		attachDebugInfo: /* @__PURE__ */ optional(/* @__PURE__ */ union([
			/* @__PURE__ */ literal("none"),
			/* @__PURE__ */ literal("simple"),
			/* @__PURE__ */ literal("full")
		])),
		chunkImportMap: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ object({
			baseUrl: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
			fileName: /* @__PURE__ */ optional(/* @__PURE__ */ string())
		})])),
		onDemandWrapping: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		incrementalBuild: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		nativeMagicString: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		chunkOptimization: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ strictObject({
			mergeCommonChunks: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
			avoidRedundantChunkLoads: /* @__PURE__ */ optional(/* @__PURE__ */ boolean())
		})])),
		lazyBarrel: /* @__PURE__ */ optional(/* @__PURE__ */ boolean())
	})),
	transform: /* @__PURE__ */ optional(TransformOptionsSchema),
	watch: /* @__PURE__ */ optional(/* @__PURE__ */ union([WatcherOptionsSchema, /* @__PURE__ */ literal(false)])),
	checks: /* @__PURE__ */ optional(ChecksOptionsSchema),
	devtools: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ object({
		sessionId: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ pipe(/* @__PURE__ */ string(), /* @__PURE__ */ check((id) => id !== "" && id !== "." && id !== ".." && !/[/\\\0]/.test(id), "Expected one path segment: not empty, not \".\" or \"..\", and without \"/\", \"\\\" or NUL"), /* @__PURE__ */ check((id) => id.toLowerCase().toUpperCase() !== "UNKNOWN-SESSION", "\"unknown-session\" is reserved for devtools events without a session context"))), /* @__PURE__ */ description("Used to name the build.")),
		mode: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ literal("full"), /* @__PURE__ */ literal("report")])), /* @__PURE__ */ description("'full' (default): write JSON-lines devtools logs. 'report': aggregate the same event stream in-memory and emit an agent-readable report (metrics.json + markdown views) instead."))
	})), /* @__PURE__ */ description("Enable debug mode. Emit debug information to disk. This might slow down the build process significantly.")),
	preserveEntrySignatures: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([
		/* @__PURE__ */ literal("strict"),
		/* @__PURE__ */ literal("allow-extension"),
		/* @__PURE__ */ literal("exports-only"),
		/* @__PURE__ */ literal(false)
	]))),
	context: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("The value of `this` at the top level of each module.")),
	tsconfig: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ string()])), /* @__PURE__ */ description("Path to the tsconfig.json file."))
});
const InputCliOverrideSchema = /* @__PURE__ */ strictObject({
	input: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())), /* @__PURE__ */ description("Entry file")),
	external: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())), /* @__PURE__ */ description("Comma-separated list of module ids to exclude from the bundle `<module-id>,...`")),
	treeshake: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("enable treeshaking")),
	makeAbsoluteExternalsRelative: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Prevent normalization of external imports")),
	preserveEntrySignatures: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ literal(false)), /* @__PURE__ */ description("Avoid facade chunks for entry points")),
	context: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("The entity top-level `this` represents."))
});
const InputCliOptionsSchema = /* @__PURE__ */ omit(/* @__PURE__ */ strictObject({
	...InputOptionsSchema.entries,
	...InputCliOverrideSchema.entries
}), [
	"plugins",
	"onwarn",
	"onLog",
	"resolve",
	"experimental",
	"watch"
]);
const ModuleFormatSchema = /* @__PURE__ */ union([
	/* @__PURE__ */ literal("es"),
	/* @__PURE__ */ literal("cjs"),
	/* @__PURE__ */ literal("esm"),
	/* @__PURE__ */ literal("module"),
	/* @__PURE__ */ literal("commonjs"),
	/* @__PURE__ */ literal("iife"),
	/* @__PURE__ */ literal("umd")
]);
const AddonFunctionSchema = /* @__PURE__ */ pipe(vFunction(), /* @__PURE__ */ args(/* @__PURE__ */ tuple([/* @__PURE__ */ custom(() => true)])), /* @__PURE__ */ returnsAsync(/* @__PURE__ */ unionAsync([/* @__PURE__ */ string(), /* @__PURE__ */ pipeAsync(/* @__PURE__ */ promise(), /* @__PURE__ */ awaitAsync(), /* @__PURE__ */ string())])));
const ChunkFileNamesFunctionSchema = /* @__PURE__ */ pipe(vFunction(), /* @__PURE__ */ args(/* @__PURE__ */ tuple([/* @__PURE__ */ custom(() => true)])), /* @__PURE__ */ returns(/* @__PURE__ */ string()));
const ChunkFileNamesSchema = /* @__PURE__ */ union([/* @__PURE__ */ string(), ChunkFileNamesFunctionSchema]);
const AssetFileNamesFunctionSchema = /* @__PURE__ */ pipe(vFunction(), /* @__PURE__ */ args(/* @__PURE__ */ tuple([/* @__PURE__ */ custom(() => true)])), /* @__PURE__ */ returns(/* @__PURE__ */ string()));
const AssetFileNamesSchema = /* @__PURE__ */ union([/* @__PURE__ */ string(), AssetFileNamesFunctionSchema]);
const SanitizeFileNameFunctionSchema = /* @__PURE__ */ pipe(vFunction(), /* @__PURE__ */ args(/* @__PURE__ */ tuple([/* @__PURE__ */ string()])), /* @__PURE__ */ returns(/* @__PURE__ */ string()));
const SanitizeFileNameSchema = /* @__PURE__ */ union([/* @__PURE__ */ boolean(), SanitizeFileNameFunctionSchema]);
const GlobalsFunctionSchema = /* @__PURE__ */ pipe(vFunction(), /* @__PURE__ */ args(/* @__PURE__ */ tuple([/* @__PURE__ */ string()])), /* @__PURE__ */ returns(/* @__PURE__ */ string()));
const PathsFunctionSchema = /* @__PURE__ */ pipe(vFunction(), /* @__PURE__ */ args(/* @__PURE__ */ tuple([/* @__PURE__ */ string()])), /* @__PURE__ */ returns(/* @__PURE__ */ string()));
const ManualChunksFunctionSchema = /* @__PURE__ */ pipe(vFunction(), /* @__PURE__ */ args(/* @__PURE__ */ tuple([/* @__PURE__ */ string(), /* @__PURE__ */ object({})])), /* @__PURE__ */ returns(/* @__PURE__ */ nullish(/* @__PURE__ */ string())));
const AdvancedChunksNameFunctionSchema = /* @__PURE__ */ pipe(vFunction(), /* @__PURE__ */ args(/* @__PURE__ */ tuple([/* @__PURE__ */ string(), /* @__PURE__ */ object({})])), /* @__PURE__ */ returns(/* @__PURE__ */ nullish(/* @__PURE__ */ string())));
const AdvancedChunksTestFunctionSchema = /* @__PURE__ */ pipe(vFunction(), /* @__PURE__ */ args(/* @__PURE__ */ tuple([/* @__PURE__ */ string()])), /* @__PURE__ */ returns(/* @__PURE__ */ union([
	/* @__PURE__ */ boolean(),
	/* @__PURE__ */ void_(),
	/* @__PURE__ */ undefined_()
])));
const InlineCommonChunksExcludeItemSchema = /* @__PURE__ */ union([StringOrRegExpSchema, AdvancedChunksTestFunctionSchema]);
const AdvancedChunksSchema = /* @__PURE__ */ strictObject({
	includeDependenciesRecursively: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
	minSize: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
	maxSize: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
	minModuleSize: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
	maxModuleSize: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
	minShareCount: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
	groups: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ strictObject({
		debugName: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
		name: /* @__PURE__ */ union([/* @__PURE__ */ string(), AdvancedChunksNameFunctionSchema]),
		test: /* @__PURE__ */ optional(/* @__PURE__ */ union([StringOrRegExpSchema, AdvancedChunksTestFunctionSchema])),
		priority: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
		minSize: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
		minShareCount: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
		maxSize: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
		minModuleSize: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
		maxModuleSize: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
		entriesAware: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		entriesAwareMergeThreshold: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
		includeDependenciesRecursively: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		tags: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string()))
	}))),
	experimentalInlineCommonChunks: /* @__PURE__ */ optional(/* @__PURE__ */ strictObject({
		maxSize: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
		exclude: /* @__PURE__ */ optional(/* @__PURE__ */ union([InlineCommonChunksExcludeItemSchema, /* @__PURE__ */ array(InlineCommonChunksExcludeItemSchema)]))
	}))
});
const GeneratedCodeOptionsSchema = /* @__PURE__ */ strictObject({
	symbols: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to use Symbol.toStringTag for namespace objects")),
	preset: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ literal("es5"), /* @__PURE__ */ literal("es2015")])),
	profilerNames: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Whether to add readable names to internal variables for profiling purposes"))
});
const OutputOptionsSchema = /* @__PURE__ */ strictObject({
	dir: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("Output directory, defaults to `dist` if `file` is not set")),
	file: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("Single output file")),
	charset: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ literal("ascii"), /* @__PURE__ */ literal("utf8")])), /* @__PURE__ */ description("Character set to use in generated JavaScript")),
	exports: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([
		/* @__PURE__ */ literal("auto"),
		/* @__PURE__ */ literal("named"),
		/* @__PURE__ */ literal("default"),
		/* @__PURE__ */ literal("none")
	])), /* @__PURE__ */ description(`Specify a export mode (${styleText$1("underline", "auto")}, named, default, none)`)),
	hashCharacters: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([
		/* @__PURE__ */ literal("base64"),
		/* @__PURE__ */ literal("base36"),
		/* @__PURE__ */ literal("hex")
	])), /* @__PURE__ */ description("Use the specified character set for file hashes")),
	format: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(ModuleFormatSchema), /* @__PURE__ */ description(`Output format of the generated bundle (supports ${styleText$1("underline", "esm")}, cjs, and iife)`)),
	sourcemap: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([
		/* @__PURE__ */ boolean(),
		/* @__PURE__ */ literal("inline"),
		/* @__PURE__ */ literal("hidden")
	])), /* @__PURE__ */ description(`Generate sourcemap (\`-s inline\` for inline, or \`-s\` for \`.map\` file)`)),
	sourcemapBaseUrl: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("Base URL used to prefix sourcemap paths")),
	sourcemapFileNames: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(ChunkFileNamesSchema), /* @__PURE__ */ description("Name pattern for emitted sourcemaps")),
	sourcemapDebugIds: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Inject sourcemap debug IDs")),
	sourcemapExcludeSources: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Exclude source content from sourcemaps")),
	sourcemapIgnoreList: /* @__PURE__ */ optional(/* @__PURE__ */ union([
		/* @__PURE__ */ boolean(),
		/* @__PURE__ */ custom(() => true),
		StringOrRegExpSchema
	])),
	sourcemapPathTransform: /* @__PURE__ */ optional(/* @__PURE__ */ custom(() => true)),
	banner: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ string(), AddonFunctionSchema])),
	footer: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ string(), AddonFunctionSchema])),
	postBanner: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ string(), AddonFunctionSchema])),
	postFooter: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ string(), AddonFunctionSchema])),
	intro: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ string(), AddonFunctionSchema])),
	outro: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ string(), AddonFunctionSchema])),
	extend: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Extend global variable defined by name in IIFE / UMD formats")),
	esModule: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ literal("if-default-prop")])),
	assetFileNames: /* @__PURE__ */ optional(AssetFileNamesSchema),
	entryFileNames: /* @__PURE__ */ optional(ChunkFileNamesSchema),
	chunkFileNames: /* @__PURE__ */ optional(ChunkFileNamesSchema),
	sanitizeFileName: /* @__PURE__ */ optional(SanitizeFileNameSchema),
	minify: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([
		/* @__PURE__ */ boolean(),
		/* @__PURE__ */ literal("dce-only"),
		MinifyOptionsSchema
	])), /* @__PURE__ */ description("Minify the bundled file")),
	name: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("Name for UMD / IIFE format outputs")),
	globals: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ string()), GlobalsFunctionSchema])), /* @__PURE__ */ description("Global variable of UMD / IIFE dependencies (syntax: `key:value`)")),
	paths: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ string()), PathsFunctionSchema])), /* @__PURE__ */ description("Maps external module IDs to paths")),
	generatedCode: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ partial(GeneratedCodeOptionsSchema)), /* @__PURE__ */ description("Generated code options")),
	externalLiveBindings: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("external live bindings")),
	inlineDynamicImports: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Inline dynamic imports")),
	dynamicImportInCjs: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Dynamic import in CJS output")),
	manualChunks: /* @__PURE__ */ optional(ManualChunksFunctionSchema),
	codeSplitting: /* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), AdvancedChunksSchema])),
	advancedChunks: /* @__PURE__ */ optional(AdvancedChunksSchema),
	legalComments: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ literal("none"), /* @__PURE__ */ literal("inline")])), /* @__PURE__ */ description("Control legal comments in the output")),
	comments: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ strictObject({
		legal: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		annotation: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
		jsdoc: /* @__PURE__ */ optional(/* @__PURE__ */ boolean())
	})])), /* @__PURE__ */ description("Control comments in the output")),
	plugins: /* @__PURE__ */ optional(/* @__PURE__ */ custom(() => true)),
	polyfillRequire: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Disable require polyfill injection")),
	hoistTransitiveImports: /* @__PURE__ */ optional(/* @__PURE__ */ literal(false)),
	preserveModules: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Preserve module structure")),
	preserveModulesRoot: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("Put preserved modules under this path at root level")),
	virtualDirname: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	minifyInternalExports: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Minify internal exports")),
	topLevelVar: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Rewrite top-level declarations to use `var`.")),
	cleanDir: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Clean output directory before emitting output")),
	keepNames: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Keep function and class names after bundling")),
	strictExecutionOrder: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Preserve source module execution order across generated chunks.")),
	strict: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ literal("auto")])), /* @__PURE__ */ description("Whether to always output `\"use strict\"` directive in non-ES module outputs."))
});
const getAddonDescription = (placement, wrapper) => {
	return `Code to insert the ${styleText$1("bold", placement)} of the bundled file (${styleText$1("bold", wrapper)} the wrapper function)`;
};
const OutputCliOverrideSchema = /* @__PURE__ */ strictObject({
	assetFileNames: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("Name pattern for asset files")),
	entryFileNames: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("Name pattern for emitted entry chunks")),
	chunkFileNames: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("Name pattern for emitted secondary chunks")),
	sanitizeFileName: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Sanitize file name")),
	banner: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description(getAddonDescription("top", "outside"))),
	footer: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description(getAddonDescription("bottom", "outside"))),
	postBanner: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("A string to prepend to the top of each chunk. Applied after the `renderChunk` hook and minification")),
	postFooter: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description("A string to append to the bottom of each chunk. Applied after the `renderChunk` hook and minification")),
	intro: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description(getAddonDescription("top", "inside"))),
	outro: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ string()), /* @__PURE__ */ description(getAddonDescription("bottom", "inside"))),
	esModule: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Always generate `__esModule` marks in non-ESM formats, defaults to `if-default-prop` (use `--no-esModule` to always disable)")),
	globals: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ string())), /* @__PURE__ */ description("Global variable of UMD / IIFE dependencies (syntax: `key:value`)")),
	codeSplitting: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ boolean(), /* @__PURE__ */ strictObject({
		minSize: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ number()), /* @__PURE__ */ description("Minimum size of the chunk")),
		minShareCount: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ number()), /* @__PURE__ */ description("Minimum share count of the chunk"))
	})])), /* @__PURE__ */ description("Code splitting options. Enabled by default; use `--no-codeSplitting` to disable, or `--codeSplitting.minSize` / `--codeSplitting.minShareCount` to configure")),
	advancedChunks: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ strictObject({
		minSize: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ number()), /* @__PURE__ */ description("Minimum size of the chunk")),
		minShareCount: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ number()), /* @__PURE__ */ description("Minimum share count of the chunk"))
	})), /* @__PURE__ */ description("Deprecated: use codeSplitting instead")),
	minify: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Minify the bundled file"))
});
const OutputCliOptionsSchema = /* @__PURE__ */ omit(/* @__PURE__ */ strictObject({
	...OutputOptionsSchema.entries,
	...OutputCliOverrideSchema.entries
}), [
	"sourcemapIgnoreList",
	"sourcemapPathTransform",
	"plugins",
	"hoistTransitiveImports"
]);
const CliOptionsSchema = /* @__PURE__ */ strictObject({
	config: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ string(), /* @__PURE__ */ boolean()])), /* @__PURE__ */ description("Path to the config file (default: `rolldown.config.js`)")),
	help: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Show help")),
	environment: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ string(), /* @__PURE__ */ array(/* @__PURE__ */ string())])), /* @__PURE__ */ description("Pass additional settings to the config file via process.ENV.")),
	version: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Show version number")),
	watch: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ boolean()), /* @__PURE__ */ description("Watch files in bundle and rebuild on changes")),
	configLoader: /* @__PURE__ */ pipe(/* @__PURE__ */ optional(/* @__PURE__ */ union([/* @__PURE__ */ literal("bundle"), /* @__PURE__ */ literal("native")])), /* @__PURE__ */ description("How to load the config file (bundle, native)")),
	...InputCliOptionsSchema.entries,
	...OutputCliOptionsSchema.entries
});
function validateCliOptions(options) {
	let parsed = /* @__PURE__ */ safeParse(CliOptionsSchema, options);
	return [parsed.output, parsed.issues?.map((issue) => {
		return `Invalid value for option ${issue.path?.map((pathItem) => pathItem.key).join(" ")}: ${issue.message}`;
	})];
}
const inputHelperMsgRecord = {
	output: { ignored: true },
	"resolve.tsconfigFilename": { issueMsg: "It is deprecated. Please use the top-level `tsconfig` option instead." }
};
const outputHelperMsgRecord = {};
function validateOption(key, options) {
	if (typeof options !== "object") throw new Error(`Invalid ${key} options. Expected an Object but received ${JSON.stringify(options)}.`);
	if (globalThis.process?.env?.ROLLUP_TEST) return;
	let parsed = /* @__PURE__ */ safeParse(key === "input" ? InputOptionsSchema : OutputOptionsSchema, options);
	if (!parsed.success) {
		const errors = parsed.issues.map((issue) => {
			let issueMsg = issue.message;
			const issuePaths = issue.path.map((path) => path.key);
			if (issue.type === "union") {
				const subIssue = issue.issues?.find((i) => !(i.type !== issue.received && i.input === issue.input));
				if (subIssue) {
					if (subIssue.path) issuePaths.push(subIssue.path.map((path) => path.key));
					issueMsg = subIssue.message;
				}
			}
			const stringPath = issuePaths.join(".");
			const helper = key === "input" ? inputHelperMsgRecord[stringPath] : outputHelperMsgRecord[stringPath];
			if (helper && helper.ignored) return "";
			return `- For the "${stringPath}". ${helper?.issueMsg || issueMsg + "."} ${helper?.help ? `\n  Help: ${helper.help}` : ""}`;
		}).filter(Boolean);
		if (errors.length) console.warn(`\x1b[33mWarning: Invalid ${key} options (${errors.length} issue${errors.length === 1 ? "" : "s"} found)\n${errors.join("\n")}\x1b[0m`);
	}
}
function getInputCliKeys() {
	return (/* @__PURE__ */ keyof(InputCliOptionsSchema)).options;
}
function getOutputCliKeys() {
	return (/* @__PURE__ */ keyof(OutputCliOptionsSchema)).options;
}
function getCliSchemaInfo() {
	return flattenValibotSchema(CliOptionsSchema);
}
// src/types/chunking-context.ts
var ChunkingContextImpl = class {
	context;
	pluginContextData;
	moduleInfoCache = /* @__PURE__ */ new Map();
	constructor(context, pluginContextData) {
		this.context = context;
		this.pluginContextData = pluginContextData;
	}
	clearModuleInfoCache() {
		this.moduleInfoCache = void 0;
	}
	getModuleInfo(moduleId) {
		const cached = this.moduleInfoCache?.get(moduleId);
		if (cached) return cached;
		const bindingInfo = this.context.getModuleInfo(moduleId);
		if (bindingInfo) {
			const option = this.pluginContextData.getModuleOption(moduleId);
			const info = transformModuleInfo(bindingInfo, option);
			Object.defineProperty(info, "moduleSideEffects", {
				get: () => option.moduleSideEffects,
				set: (moduleSideEffects) => {
					option.moduleSideEffects = moduleSideEffects;
					option.invalidate = true;
				}
			});
			this.moduleInfoCache?.set(moduleId, info);
			return info;
		}
		return null;
	}
};
// src/utils/bindingify-output-options.ts
async function getWarn(outputOptions) {
	if (outputOptions.legalComments == null && outputOptions.inlineDynamicImports == null && outputOptions.advancedChunks == null && outputOptions.manualChunks == null) return (message) => console.warn(message);
	const { logger } = await import("./logger-LvdykevT.mjs").then((n) => n.n);
	return (message) => logger.warn(message);
}
async function bindingifyOutputOptions(outputOptions, pluginContextData, onLog, timings) {
	const { dir, charset, format, exports, hashCharacters, sourcemap, sourcemapBaseUrl, sourcemapDebugIds, sourcemapFileNames, sourcemapExcludeSources, sourcemapIgnoreList, sourcemapPathTransform, name, assetFileNames, entryFileNames, chunkFileNames, banner, footer, postBanner, postFooter, intro, outro, esModule, globals, paths, generatedCode, file, sanitizeFileName, preserveModules, virtualDirname, legalComments, comments, preserveModulesRoot, manualChunks, topLevelVar, cleanDir, strictExecutionOrder } = outputOptions;
	const warn = await getWarn(outputOptions);
	if (legalComments != null) warn("`legalComments` option is deprecated, please use `comments.legal` instead.");
	const { inlineDynamicImports, advancedChunks } = bindingifyCodeSplitting(outputOptions.codeSplitting, outputOptions.inlineDynamicImports, outputOptions.advancedChunks, manualChunks, pluginContextData, onLog, timings, warn);
	return {
		dir,
		charset,
		file: file == null ? void 0 : file,
		format: bindingifyFormat(format),
		exports,
		hashCharacters,
		sourcemap: bindingifySourcemap(sourcemap),
		sourcemapBaseUrl,
		sourcemapDebugIds,
		sourcemapFileNames: measureIfFunction(timings, OUTPUT_OPTIONS_OWNER, "sourcemapFileNames", sourcemapFileNames),
		sourcemapExcludeSources,
		sourcemapIgnoreList: batchSourcemapIgnoreList(measureIfFunction(timings, OUTPUT_OPTIONS_OWNER, "sourcemapIgnoreList", sourcemapIgnoreList ?? /node_modules/)),
		sourcemapPathTransform: batchSourcemapPathTransform(measureIfFunction(timings, OUTPUT_OPTIONS_OWNER, "sourcemapPathTransform", sourcemapPathTransform)),
		banner: bindingifyAddon(banner, "banner", timings),
		footer: bindingifyAddon(footer, "footer", timings),
		postBanner: bindingifyAddon(postBanner, "postBanner", timings),
		postFooter: bindingifyAddon(postFooter, "postFooter", timings),
		intro: bindingifyAddon(intro, "intro", timings),
		outro: bindingifyAddon(outro, "outro", timings),
		extend: outputOptions.extend,
		globals: measureIfFunction(timings, OUTPUT_OPTIONS_OWNER, "globals", globals),
		paths: measureIfFunction(timings, OUTPUT_OPTIONS_OWNER, "paths", paths),
		generatedCode,
		esModule,
		name,
		assetFileNames: bindingifyAssetFilenames(assetFileNames),
		entryFileNames: measureIfFunction(timings, OUTPUT_OPTIONS_OWNER, "entryFileNames", entryFileNames),
		chunkFileNames: measureIfFunction(timings, OUTPUT_OPTIONS_OWNER, "chunkFileNames", chunkFileNames),
		plugins: [],
		minify: outputOptions.minify,
		externalLiveBindings: outputOptions.externalLiveBindings,
		inlineDynamicImports,
		dynamicImportInCjs: outputOptions.dynamicImportInCjs,
		manualCodeSplitting: advancedChunks,
		polyfillRequire: outputOptions.polyfillRequire,
		sanitizeFileName,
		preserveModules,
		virtualDirname,
		legalComments,
		comments: bindingifyComments(comments),
		preserveModulesRoot,
		topLevelVar,
		minifyInternalExports: outputOptions.minifyInternalExports,
		cleanDir,
		strictExecutionOrder,
		strict: outputOptions.strict
	};
}
function bindingifyAddon(configAddon, name, timings) {
	if (configAddon == null || configAddon === "") return;
	if (typeof configAddon === "function") {
		const measured = measureHookCost(timings, OUTPUT_OPTIONS_OWNER, name, configAddon);
		return async (chunk) => measured(transformRenderedChunk(chunk));
	}
	return configAddon;
}
function bindingifyFormat(format) {
	switch (format) {
		case void 0:
		case "es":
		case "esm":
		case "module": return "es";
		case "cjs":
		case "commonjs": return "cjs";
		case "iife": return "iife";
		case "umd": return "umd";
		default: unimplemented(`output.format: ${format}`);
	}
}
function bindingifySourcemap(sourcemap) {
	switch (sourcemap) {
		case true: return "file";
		case "inline": return "inline";
		case false:
		case void 0: return;
		case "hidden": return "hidden";
		default: throw new Error(`unknown sourcemap: ${sourcemap}`);
	}
}
function bindingifyAssetFilenames(assetFileNames) {
	if (typeof assetFileNames === "function") return (asset) => {
		return assetFileNames({
			name: asset.name,
			names: asset.names,
			originalFileName: asset.originalFileName,
			originalFileNames: asset.originalFileNames,
			source: transformAssetSource(asset.source),
			type: "asset"
		});
	};
	return assetFileNames;
}
function bindingifyComments(comments) {
	if (comments == null) return;
	if (typeof comments === "boolean") return comments;
	return comments;
}
function bindingifyCodeSplitting(codeSplitting, inlineDynamicImportsOption, advancedChunks, manualChunks, pluginContextData, onLog, timings, warn) {
	let inlineDynamicImports;
	let effectiveChunksOption;
	let migratedManualChunksGroup;
	let chunksOptionName = "codeSplitting";
	if (codeSplitting === false) {
		if (inlineDynamicImportsOption != null) warn("`inlineDynamicImports` option is ignored because `codeSplitting: false` is set.");
		if (manualChunks != null) throw new Error("Invalid configuration: \"output.manualChunks\" cannot be used when \"output.codeSplitting\" is set to false.");
		if (advancedChunks != null) warn("`advancedChunks` option is ignored because `codeSplitting` is set to `false`.");
		return {
			inlineDynamicImports: true,
			advancedChunks: void 0
		};
	} else if (codeSplitting === true) {
		if (inlineDynamicImportsOption != null) warn("`inlineDynamicImports` option is ignored because `codeSplitting: true` is set.");
	} else if (codeSplitting == null) {
		if (inlineDynamicImportsOption != null) {
			warn("`inlineDynamicImports` option is deprecated, please use `codeSplitting: false` instead.");
			inlineDynamicImports = inlineDynamicImportsOption;
		}
	} else {
		effectiveChunksOption = codeSplitting;
		chunksOptionName = "codeSplitting";
		if (inlineDynamicImportsOption != null) warn("`inlineDynamicImports` option is ignored because the `codeSplitting` option is specified.");
	}
	if (inlineDynamicImports === true && manualChunks != null) throw new Error("Invalid value \"true\" for option \"output.inlineDynamicImports\" - this option is not supported for \"output.manualChunks\".");
	if (effectiveChunksOption == null) {
		if (advancedChunks != null) {
			warn("`advancedChunks` option is deprecated, please use `codeSplitting` instead.");
			effectiveChunksOption = advancedChunks;
			chunksOptionName = "advancedChunks";
		}
	} else if (advancedChunks != null) warn("`advancedChunks` option is ignored because the `codeSplitting` option is specified.");
	if (manualChunks != null && effectiveChunksOption != null) warn("`manualChunks` option is ignored because the `codeSplitting` option is specified.");
	else if (manualChunks != null) {
		chunksOptionName = "manualChunks";
		migratedManualChunksGroup = { name(moduleId, ctx) {
			return manualChunks(moduleId, { getModuleInfo: (id) => ctx.getModuleInfo(id) });
		} };
		effectiveChunksOption = { groups: [migratedManualChunksGroup] };
	}
	if (inlineDynamicImports === true && effectiveChunksOption != null) {
		warn("`advancedChunks` option is ignored because `inlineDynamicImports: true` disables code splitting.");
		effectiveChunksOption = void 0;
	}
	let advancedChunksResult;
	if (effectiveChunksOption != null) {
		const { groups, experimentalInlineCommonChunks, ...restOptions } = effectiveChunksOption;
		let chunkingContext;
		const getChunkingContext = (bindingContext) => chunkingContext ??= new ChunkingContextImpl(bindingContext, pluginContextData);
		advancedChunksResult = {
			...restOptions,
			experimentalInlineCommonChunks: experimentalInlineCommonChunks == null ? void 0 : {
				maxSize: experimentalInlineCommonChunks.maxSize,
				exclude: experimentalInlineCommonChunks.exclude == null ? void 0 : arraify(experimentalInlineCommonChunks.exclude).map((matcher) => typeof matcher === "function" ? batchTest(measureHookCost(timings, OUTPUT_OPTIONS_OWNER, "codeSplitting.experimentalInlineCommonChunks.exclude", matcher), "output.codeSplitting.experimentalInlineCommonChunks.exclude") : matcher)
			},
			internalInvalidateModuleInfoCache: () => {
				chunkingContext?.clearModuleInfoCache();
				chunkingContext = void 0;
			},
			groups: groups?.map((group, index) => {
				const { debugName, name, test, ...restGroup } = group;
				const timingKey = group === migratedManualChunksGroup ? manualChunks ?? group : group;
				const timingOwner = timings === void 0 ? OUTPUT_OPTIONS_OWNER : {
					...OUTPUT_OPTIONS_OWNER,
					key: timingKey
				};
				const groupName = `${chunksOptionName} groups[${index}]`;
				let testTimingName = `${groupName}.test`;
				let nameTimingName = `${groupName}.name`;
				if (timings !== void 0) {
					if (chunksOptionName === "manualChunks") nameTimingName = "manualChunks";
					else {
						const label = debugName ?? (typeof name === "string" ? name : void 0);
						if (label === void 0) {
							if (typeof name === "function" && !timings.warnedMissingGroupLabels.has(timingKey)) {
								timings.warnedMissingGroupLabels.add(timingKey);
								onLog(LOG_LEVEL_WARN, logMissingCodeSplittingGroupDebugName(`output.${chunksOptionName}.groups[${index}]`));
							}
						} else {
							const labelSuffix = ` ${JSON.stringify(label)}`;
							testTimingName = `${groupName}.test${labelSuffix}`;
							nameTimingName = `${groupName}.name${labelSuffix}`;
						}
					}
				}
				return {
					...restGroup,
					test: typeof test === "function" ? batchTest(measureHookCost(timings, timingOwner, testTimingName, test)) : test,
					name: typeof name === "function" ? batchName(measureHookCost(timings, timingOwner, nameTimingName, name), getChunkingContext) : name
				};
			})
		};
	}
	return {
		inlineDynamicImports,
		advancedChunks: advancedChunksResult
	};
}
/**
* Wraps a per-id `test` in the batched shim that the binding expects.
*
* The loop runs in JS so that a group makes one napi crossing, not one per module.
*
* The result is a `Uint8Array`, which crosses as a buffer instead of one tagged value per id.
*/
function batchTest(test, optionName = "output.codeSplitting.groups[].test") {
	return (ids) => {
		const results = new Uint8Array(ids.length);
		for (let index = 0; index < ids.length; index++) {
			const result = test(ids[index]);
			if (result != null && typeof result !== "boolean") throw new TypeError(`\`${optionName}\` returned ${typeof result} for module "${ids[index]}", but expected a boolean, null or undefined.`);
			results[index] = result === true ? 1 : 0;
		}
		return results;
	};
}
/**
* This is the `name` equivalent of {@linkcode batchTest}. All groups in a chunking pass share
* a context so repeated module queries reuse their JavaScript values.
*/
function batchName(name, getChunkingContext) {
	return (ids, bindingContext) => {
		const context = getChunkingContext(bindingContext);
		const results = [];
		for (let index = 0; index < ids.length; index++) {
			const result = name(ids[index], context);
			if (result != null && typeof result !== "string") throw new TypeError(`\`output.codeSplitting.groups[].name\` returned ${typeof result} for module "${ids[index]}", but expected a string, null or undefined.`);
			results.push(result);
		}
		return results;
	};
}
/**
* Wraps a per-source `sourcemapIgnoreList` in the batched shim that the binding expects.
*
* The loop runs in JS so that a sourcemap makes one napi crossing, not one per source. The old
* Rust loop also awaited each call before it started the next.
*
* The result is a `Uint8Array`, which crosses as a buffer instead of one tagged value per source.
*
* A boolean, string or regular expression passes through. Rust reads those without a call.
*/
function batchSourcemapIgnoreList(ignoreList) {
	if (typeof ignoreList !== "function") return ignoreList;
	return (sources, sourcemapPath) => {
		const results = new Uint8Array(sources.length);
		for (let index = 0; index < sources.length; index++) {
			const result = ignoreList(sources[index], sourcemapPath);
			if (typeof result !== "boolean") throw new TypeError(`\`output.sourcemapIgnoreList\` returned ${typeof result} for source "${sources[index]}", but expected a boolean.`);
			results[index] = result ? 1 : 0;
		}
		return results;
	};
}
/**
* The `sourcemapPathTransform` counterpart of {@linkcode batchSourcemapIgnoreList}.
*
* A path cannot be reduced to a byte, so this batch is still an array of strings. napi reports the
* type of the array, not of the bad element, so the check runs here.
*/
function batchSourcemapPathTransform(pathTransform) {
	if (typeof pathTransform !== "function") return pathTransform;
	return (sources, sourcemapPath) => {
		const results = [];
		for (let index = 0; index < sources.length; index++) {
			const result = pathTransform(sources[index], sourcemapPath);
			if (typeof result !== "string") throw new TypeError(`\`output.sourcemapPathTransform\` returned ${typeof result} for source "${sources[index]}", but expected a string.`);
			results.push(result);
		}
		return results;
	};
}
// src/utils/initialize-parallel-plugins.ts
var import_binding = /* @__PURE__ */ __toESM(require_binding(), 1);
async function initializeParallelPlugins(plugins) {
	const pluginInfos = [];
	for (const [index, plugin] of plugins.entries()) {
		const parallel = getParallelPluginInfo(plugin);
		if (parallel) {
			const { fileUrl, options } = parallel;
			pluginInfos.push({
				index,
				fileUrl,
				options
			});
		}
	}
	if (pluginInfos.length <= 0) return;
	const count = availableParallelism();
	const parallelJsPluginRegistry = new import_binding.ParallelJsPluginRegistry(count);
	const registryId = parallelJsPluginRegistry.id;
	const workers = await initializeWorkers(registryId, count, pluginInfos);
	const stopWorkers = async () => {
		await Promise.all(workers.map((worker) => worker.terminate()));
	};
	return {
		registry: parallelJsPluginRegistry,
		stopWorkers
	};
}
function initializeWorkers(registryId, count, pluginInfos) {
	return Promise.all(Array.from({ length: count }, (_, i) => initializeWorker(registryId, pluginInfos, i)));
}
async function initializeWorker(registryId, pluginInfos, threadNumber) {
	const urlString = import.meta.resolve("#parallel-plugin-worker");
	const workerData = {
		registryId,
		pluginInfos,
		threadNumber
	};
	let worker;
	try {
		worker = new Worker(new URL(urlString), { workerData });
		worker.unref();
		await new Promise((resolve, reject) => {
			worker.once("message", async (message) => {
				if (message.type === "error") reject(message.error);
				else resolve();
			});
		});
		return worker;
	} catch (e) {
		worker?.terminate();
		throw e;
	}
}
const availableParallelism = () => {
	let availableParallelism = 1;
	try {
		availableParallelism = os.availableParallelism();
	} catch {
		const cpus = os.cpus();
		if (Array.isArray(cpus) && cpus.length > 0) availableParallelism = cpus.length;
	}
	return Math.min(availableParallelism, 8);
};
// src/utils/create-bundler-option.ts
async function createBundlerOptions(inputOptions, outputOptions, watchMode, measureTimings = false) {
	const inputPlugins = await normalizePluginOption(inputOptions.plugins);
	const outputPlugins = await normalizePluginOption(outputOptions.plugins);
	const logLevel = inputOptions.logLevel || "info";
	const onLog = getLogger(getObjectPlugins(inputPlugins), getOnLog(inputOptions, logLevel), logLevel, watchMode);
	outputOptions = PluginDriver.callOutputOptionsHook([...inputPlugins, ...outputPlugins], outputOptions, onLog, logLevel, watchMode);
	const hookOutputPlugins = await normalizePluginOption(outputOptions.plugins);
	const normalizedInputPlugins = normalizePlugins(inputPlugins, ANONYMOUS_PLUGIN_PREFIX);
	const normalizedOutputPlugins = normalizePlugins(hookOutputPlugins, ANONYMOUS_OUTPUT_PLUGIN_PREFIX);
	let plugins = [...normalizedInputPlugins, ...checkOutputPluginOption(normalizedOutputPlugins, onLog)];
	const timings = measureTimings && (inputOptions.checks?.bundlerTimings ?? inputOptions.checks?.pluginTimings ?? true) ? pluginTimingsRecorderFor(inputOptions) : void 0;
	if (timings) outputOptions = {
		...outputOptions,
		assetFileNames: measureIfFunction(timings, OUTPUT_OPTIONS_OWNER, "assetFileNames", outputOptions.assetFileNames),
		sanitizeFileName: measureIfFunction(timings, OUTPUT_OPTIONS_OWNER, "sanitizeFileName", outputOptions.sanitizeFileName)
	};
	const parallelPluginInitResult = await initializeParallelPlugins(plugins);
	if (inputOptions.experimental?.strictExecutionOrder !== void 0) console.warn("`experimental.strictExecutionOrder` has been stabilized and moved to `output.strictExecutionOrder`. Please update your configuration.");
	try {
		const pluginContextData = new PluginContextData(onLog, outputOptions, normalizedInputPlugins, normalizedOutputPlugins);
		return {
			bundlerOptions: {
				inputOptions: bindingifyInputOptions(plugins, inputOptions, outputOptions, pluginContextData, normalizedOutputPlugins, onLog, logLevel, watchMode, timings),
				outputOptions: await bindingifyOutputOptions(outputOptions, pluginContextData, onLog, timings),
				parallelPluginsRegistry: parallelPluginInitResult?.registry
			},
			inputOptions,
			onLog,
			stopWorkers: parallelPluginInitResult?.stopWorkers
		};
	} catch (e) {
		await parallelPluginInitResult?.stopWorkers();
		throw e;
	}
}
export { validateCliOptions as a, PluginDriver as c, getOutputCliKeys as i, getCliSchemaInfo as n, validateOption as o, getInputCliKeys as r, styleText$1 as s, createBundlerOptions as t };
