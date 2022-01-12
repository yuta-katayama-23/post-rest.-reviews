import fs from 'fs';
import path from 'path';
import appRoot from 'app-root-path';

const cache = {};

export default class SqlQueryLoader {
	constructor(options) {
		this.sqlFileDir = options.path;
	}

	sqlSync(table, name) {
		if (cache[name]) {
			return cache[name];
		}

		this.#readFile(table, name);

		return cache[name];
	}

	#readFile(targetDir, queryName) {
		const dirents = fs.readdirSync(this.sqlFileDir, { withFileTypes: true });
		const dir = dirents
			.filter((dirent) => dirent.isDirectory() && dirent.name === targetDir)
			.map(({ name }) => name);

		const dirPath = appRoot.resolve(path.join(this.sqlFileDir, dir.shift()));
		const fileNames = fs.readdirSync(dirPath);

		fileNames
			.filter((fileName) => {
				const { stats, name } = this.#getPathNameStats(dirPath, fileName);
				return stats.isFile() && name === queryName;
			})
			.forEach((fileName) => {
				const { filePath, name } = this.#getPathNameStats(dirPath, fileName);
				const text = fs.readFileSync(filePath, 'utf-8');
				cache[name] = this.#format(text);
			});
	}

	// eslint-disable-next-line class-methods-use-this
	#format(text = '') {
		let newText;
		// Remove comment line.
		newText = text.replace(/-- .*/g, '');
		newText = newText.replace(/\/\*[\s\S]*?\*\//gm, '');
		// Remove spaces.
		newText = newText.replace(/\s+/g, ' ').trim();
		return newText;
	}

	// eslint-disable-next-line class-methods-use-this
	#getPathNameStats(dirPath, fileName) {
		const filePath = path.join(dirPath, fileName);
		const stats = fs.statSync(filePath);
		const { name } = path.parse(fileName);

		return { filePath, stats, name };
	}
}
