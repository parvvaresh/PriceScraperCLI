import { t as rolldown } from "./rolldown-DWd2aEL4.mjs";
import fs from "node:fs";
import path from "node:path";
import { readdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { cwd } from "node:process";
import { randomBytes } from "node:crypto";
// src/utils/load-config.ts
/** Returns the removal errors, so a cleanup failure never hides the error that caused it. */
async function removeFiles(files) {
	return (await Promise.allSettled(files.map((file) => fs.promises.rm(file, { force: true })))).flatMap((result) => result.status === "rejected" ? [result.reason] : []);
}
let configLoadCount = 0;
async function bundleTsConfig(configFile, isEsm) {
	const dirnameVarName = "injected_original_dirname";
	const filenameVarName = "injected_original_filename";
	const importMetaUrlVarName = "injected_original_import_meta_url";
	const outputDir = path.dirname(configFile);
	const outputPrefix = `rolldown.config.${++configLoadCount}.${randomBytes(8).toString("hex")}`;
	const bundle = await rolldown({
		input: configFile,
		platform: "node",
		resolve: { mainFields: ["main"] },
		transform: { define: {
			__dirname: dirnameVarName,
			__filename: filenameVarName,
			"import.meta.url": importMetaUrlVarName,
			"import.meta.dirname": dirnameVarName,
			"import.meta.filename": filenameVarName
		} },
		treeshake: false,
		external: [/^[\w@][^:]/],
		plugins: [{
			name: "inject-file-scope-variables",
			transform: {
				filter: { id: /\.[cm]?[jt]s$/ },
				async handler(code, id) {
					return {
						code: `const ${dirnameVarName} = ${JSON.stringify(path.dirname(id))};const ${filenameVarName} = ${JSON.stringify(id)};const ${importMetaUrlVarName} = ${JSON.stringify(pathToFileURL(id).href)};` + code,
						map: null
					};
				}
			}
		}]
	});
	const errors = [];
	let entryFile;
	let generatedFiles;
	try {
		const result = await bundle.write({
			dir: outputDir,
			format: isEsm ? "esm" : "cjs",
			codeSplitting: false,
			sourcemap: "inline",
			entryFileNames: `${outputPrefix}${path.extname(configFile).replace("ts", "js")}`
		});
		generatedFiles = result.output.map((output) => path.join(outputDir, output.fileName));
		const fileName = result.output.find((chunk) => chunk.type === "chunk" && chunk.isEntry)?.fileName;
		if (fileName === void 0) throw new Error(`Rolldown did not emit an entry chunk for config file "${configFile}"`);
		entryFile = path.join(outputDir, fileName);
	} catch (error) {
		errors.push(error);
	}
	try {
		await bundle.close();
	} catch (error) {
		errors.push(error);
	}
	if (errors.length > 0) {
		try {
			generatedFiles ??= (await readdir(outputDir)).filter((name) => name.startsWith(`${outputPrefix}.`)).map((name) => path.join(outputDir, name));
			errors.push(...await removeFiles(generatedFiles));
		} catch (error) {
			errors.push(error);
		}
		throwCollectedErrors(errors, "Config bundling and cleanup both failed");
	}
	return {
		entryFile,
		generatedFiles
	};
}
const SUPPORTED_JS_CONFIG_FORMATS = [
	".js",
	".mjs",
	".cjs"
];
const SUPPORTED_TS_CONFIG_FORMATS = [
	".ts",
	".mts",
	".cts"
];
const SUPPORTED_CONFIG_FORMATS = [...SUPPORTED_JS_CONFIG_FORMATS, ...SUPPORTED_TS_CONFIG_FORMATS];
const DEFAULT_CONFIG_BASE = "rolldown.config";
async function findConfigFileNameInCwd() {
	const filesInWorkingDirectory = new Set(await readdir(cwd()));
	for (const extension of SUPPORTED_CONFIG_FORMATS) {
		const fileName = `${DEFAULT_CONFIG_BASE}${extension}`;
		if (filesInWorkingDirectory.has(fileName)) return fileName;
	}
	throw new Error("No `rolldown.config` configuration file found.");
}
async function loadTsConfig(configFile) {
	const { entryFile, generatedFiles } = await bundleTsConfig(configFile, isFilePathESM(configFile));
	const errors = [];
	let config;
	try {
		config = (await import(pathToFileURL(entryFile).href)).default;
	} catch (error) {
		errors.push(error);
	}
	const cleanupErrors = await removeFiles(generatedFiles);
	if (errors.length > 0) errors.push(...cleanupErrors);
	throwCollectedErrors(errors, "Config import and cleanup both failed");
	return config;
}
function throwCollectedErrors(errors, message) {
	if (errors.length > 1) throw new AggregateError(errors, message, { cause: errors[0] });
	if (errors.length === 1) throw errors[0];
}
function isFilePathESM(filePath) {
	if (/\.m[jt]s$/.test(filePath)) return true;
	else if (/\.c[jt]s$/.test(filePath)) return false;
	else {
		const pkg = findNearestPackageData(path.dirname(filePath));
		if (pkg) return pkg.type === "module";
		return false;
	}
}
function findNearestPackageData(basedir) {
	while (basedir) {
		const pkgPath = path.join(basedir, "package.json");
		if (tryStatSync(pkgPath)?.isFile()) try {
			return JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
		} catch {}
		const nextBasedir = path.dirname(basedir);
		if (nextBasedir === basedir) break;
		basedir = nextBasedir;
	}
	return null;
}
function tryStatSync(file) {
	try {
		return fs.statSync(file, { throwIfNoEntry: false });
	} catch {}
}
async function loadNativeConfig(resolvedPath) {
	const url = pathToFileURL(resolvedPath).href;
	const { freshImport } = await import("./dist-BHJd_fmG.mjs");
	const freshImported = freshImport(url);
	if (freshImported) {
		const { result } = await freshImported;
		return result.default;
	}
	return (await import(url + "?t=" + Date.now())).default;
}
/**
* Load config from a file in a way that Rolldown does.
*
* @param configPath The path to the config file. If empty, it will look for `rolldown.config` with supported extensions in the current working directory.
* @param options Loading options. `configLoader` selects `'bundle'` (default) or `'native'`.
* @returns The loaded config export
*
* @category Config
*/
async function loadConfig(configPath, options = {}) {
	const configLoader = options.configLoader ?? "bundle";
	const ext = path.extname(configPath = configPath || await findConfigFileNameInCwd());
	try {
		if (configLoader === "native") return await loadNativeConfig(path.resolve(configPath));
		if (SUPPORTED_JS_CONFIG_FORMATS.includes(ext) || process.env.NODE_OPTIONS?.includes("--import=tsx") && SUPPORTED_TS_CONFIG_FORMATS.includes(ext)) return (await import(pathToFileURL(configPath).href)).default;
		else if (SUPPORTED_TS_CONFIG_FORMATS.includes(ext)) return await loadTsConfig(path.resolve(configPath));
		else throw new Error(`Unsupported config format. Expected: \`${SUPPORTED_CONFIG_FORMATS.join(",")}\` but got \`${ext}\``);
	} catch (err) {
		if (configLoader === "native") {
			const tsHint = SUPPORTED_TS_CONFIG_FORMATS.includes(ext) && !process.features.typescript ? " This runtime does not natively support TypeScript config files." : "";
			throw new Error(`Failed to load the config file "${configPath}" using the "native" config loader.${tsHint} Try "--configLoader bundle", or register a loader such as "--import tsx".`, { cause: err });
		}
		throw new Error("Error happened while loading config.", { cause: err });
	}
}
export { loadConfig as t };
