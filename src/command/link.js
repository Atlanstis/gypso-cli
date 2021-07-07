import fs from 'fs-extra'
import path from 'path'
import symbol from 'log-symbols'
import chalk from 'chalk'
import { execCmd } from '../utils'

export default async function (url) {
  const cwd = process.cwd()
  const gitPath = path.join(cwd, '.git')
  if (fs.existsSync(gitPath)) {
    await fs.remove(gitPath)
    console.log(
      symbol.success,
      chalk.green('The directory: .git has been removed!')
    )
  }
  await execCmd('git init')
  await execCmd('git add .')
  await execCmd(['git', 'commit', '-m', 'initialized'])
  await execCmd('git branch -M main')
  await execCmd(`git remote add origin ${url}`)
  await execCmd('git push -u origin main')
  console.log(symbol.success, chalk.green('Git link succeeded'))
}
