import { PackageJsonInfo } from './PackageInfo';

export interface IPluginInfo {
	readonly mainFile: string;
	readonly location: string;
	readonly name: string;
	readonly version: string;
	readonly dependencies: { [name: string]: string };
	readonly optionalDependencies?: { [name: string]: string };
	readonly dependencyDetails?: {
		[name: string]: PackageJsonInfo | undefined;
	}
}
