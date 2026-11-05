import { Gt as MaybePromise, T as Plugin } from "./shared/define-config-u93KkixF.mjs";
type ParallelPluginImplementation = Plugin;
type Context = {
  /**
   * Thread number
   */
  threadNumber: number;
};
export declare function defineParallelPluginImplementation<Options>(plugin: (Options: Options, context: Context) => MaybePromise<ParallelPluginImplementation>): (Options: Options, context: Context) => MaybePromise<ParallelPluginImplementation>;
export type { Context, ParallelPluginImplementation };