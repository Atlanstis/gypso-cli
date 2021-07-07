import downloadGit from 'download-git-repo'
import ora from 'ora'
import fs from 'fs-extra'
import symbol from 'log-symbols'
import chalk from 'chalk'
import { updateJsonFile } from '../utils'

class DownloadGit {
  constructor(template, projectName) {
    this.url = `${template.url}#${template.branch}`
    this.projectName = projectName
  }

  async download() {
    const _this = this
    return new Promise((resolve, reject) => {
      let loading = ora('Download template ...')
      loading.start()
      downloadGit(this.url, this.projectName, function (err) {
        if (err) {
          loading.fail('Download failed:')
          console.log(err)
          reject()
        } else {
          loading.succeed('Download successful!')
          _this.successHandle()
          resolve()
        }
      })
    })
  }

  async successHandle() {
    return new Promise((resolve, reject) => {
      try {
        console.log(chalk.cyan('File initialization!'))
        //修改项目文件夹中 package.json 文件
        const packageJson = `${this.projectName}/package.json`
        updateJsonFile(packageJson, {
          name: this.projectName
        })
        console.log(
          symbol.success,
          chalk.green('package.json initialization succeeded!')
        )
        // 修改 README.md
        const README = `${this.projectName}/README.md`
        fs.writeFileSync(README, `# ${this.projectName}`, 'utf-8')
        console.log(
          symbol.success,
          chalk.green('README.md initialization succeeded!')
        )
        console.log(chalk.cyan('File initialization succeeded!'))
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default DownloadGit
