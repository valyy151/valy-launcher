// #!/usr/bin/env node
const { execSync } = require('child_process')

const runCommand = (command) => {
	try {
		execSync(`${command}`, { stdio: 'inherit' })
	} catch (error) {
		console.error(`Failed to execute ${command}`, error)
		return false
	}
	return true
}

const repoName = process.argv[2]
const gitCheckoutCommand = `git clone --depth 1 https://github.com/valyy151/valy-launcher ${repoName}`
const installDepsCommand = `cd ${repoName} && npm install`

console.log('Cloning into ${repoName}...')

const checkedOutput = runCommand(gitCheckoutCommand)

if (!checkedOutput) {
	console.error('Failed to clone into repo')
	process.exit(1)
}

console.log('Installing dependencies...')

const installedDeps = runCommand(installDepsCommand)
if (!installedDeps) {
	process.exit(1)
}

console.log('Done! Now do the following to start:')
console.log(`cd ${repoName} && npm run dev`)
