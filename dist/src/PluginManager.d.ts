/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { NpmRegistryConfig } from "./NpmRegistryClient";
import { IPluginInfo } from "./PluginInfo";
import { GithubAuth } from "./GithubRegistryClient";
import { BitbucketAuth } from "./BitbucketRegistryClient";
import { PackageInfo } from "./PackageInfo";
type IgnoreDependency = string | RegExp;
type NodeJSGlobal = typeof global;
export interface PluginManagerOptions {
    cwd: string;
    pluginsPath: string;
    versionsPath?: string;
    sandbox: PluginSandbox;
    npmRegistryUrl: string;
    npmRegistryConfig: NpmRegistryConfig;
    npmInstallMode: "useCache" | "noCache";
    requireCoreModules: boolean;
    hostRequire?: NodeRequire;
    ignoredDependencies: IgnoreDependency[];
    staticDependencies: {
        [key: string]: any;
    };
    githubAuthentication?: GithubAuth;
    bitbucketAuthentication?: BitbucketAuth;
    lockWait: number;
    lockStale: number;
}
export interface PluginSandbox {
    env?: NodeJS.ProcessEnv;
    global?: NodeJSGlobal;
}
export interface InstallFromPathOptions {
    force: boolean;
}
export declare class PluginManager {
    readonly options: PluginManagerOptions;
    private versionManager;
    private readonly vm;
    private readonly installedPlugins;
    private readonly npmRegistry;
    private readonly githubRegistry;
    private readonly bitbucketRegistry;
    private readonly sandboxTemplates;
    constructor(options?: Partial<PluginManagerOptions>);
    install(name: string, version?: string): Promise<IPluginInfo>;
    /**
     * Install a package from npm
     * @param name name of the package
     * @param version version of the package, default to "latest"
     */
    installFromNpm(name: string, version?: string): Promise<IPluginInfo>;
    /**
     * Install a package from a local folder
     * @param location package local folder location
     * @param options options, if options.force == true then package is always reinstalled without version checking
     */
    installFromPath(location: string, options?: Partial<InstallFromPathOptions>): Promise<IPluginInfo>;
    installFromGithub(repository: string): Promise<IPluginInfo>;
    installFromBitbucket(repository: string): Promise<IPluginInfo>;
    /**
     * Install a package by specifiing code directly. If no version is specified it will be always reinstalled.
     * @param name plugin name
     * @param code code to be loaded, equivalent to index.js
     * @param version optional version, if omitted no version check is performed
     */
    installFromCode(name: string, code: string, version?: string): Promise<IPluginInfo>;
    uninstall(name: string): Promise<void>;
    uninstallAll(): Promise<void>;
    list(): IPluginInfo[];
    require(fullName: string): any;
    setSandboxTemplate(name: string, sandbox: PluginSandbox | undefined): void;
    getSandboxTemplate(name: string): PluginSandbox | undefined;
    alreadyInstalled(name: string, version?: string, mode?: "satisfies" | "satisfiesOrGreater"): IPluginInfo | undefined;
    getInfo(name: string): IPluginInfo | undefined;
    queryPackage(name: string, version?: string): Promise<PackageInfo>;
    queryPackageFromNpm(name: string, version?: string): Promise<PackageInfo>;
    queryPackageFromGithub(repository: string): Promise<PackageInfo>;
    runScript(code: string): any;
    private uninstallLockFree;
    private installLockFree;
    private installFromPathLockFree;
    /** Install from npm or from cache if already available */
    private installFromNpmLockFreeCache;
    /** Install from npm */
    private installFromNpmLockFreeDirect;
    private installFromGithubLockFree;
    private installFromBitbucketLockFree;
    private installFromCodeLockFree;
    private installDependency;
    private listDependencies;
    private installDependencies;
    private linkDependencyToPlugin;
    private unloadDependents;
    private unloadWithDependents;
    private isModuleAvailableFromHost;
    private isValidPluginName;
    private validatePluginVersion;
    private getPluginLocation;
    private removeDownloaded;
    private isAlreadyDownloaded;
    private getDownloadedPackage;
    private readPackageJsonFromPath;
    private load;
    private unload;
    private addPlugin;
    /**
     * Unlink a plugin from the specified version of package.
     *
     * @param plugin A plugin information to unlink
     */
    private unlinkModule;
    /**
     * Link a plugin to the specified version of package.
     *
     * @param plugin A plugin information to link
     * @returns A plugin information linked
     */
    private linkModule;
    private deleteAndUnloadPlugin;
    private syncLock;
    private syncUnlock;
    private shouldIgnore;
    private createPluginInfo;
    /**
     * Create a plugin information from the specified location.
     *
     * @param location A location of the plugin
     * @param withDependencies If true, dependencies are also loaded
     * @returns
     */
    private createPluginInfoFromPath;
}
export {};
