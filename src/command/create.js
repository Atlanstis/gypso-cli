import fs from 'fs-extra'
import path from 'path'
import symbol from 'log-symbols'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { TEMPLATE_LIST } from '../utils'
import DownloadGit from '../lib/download-git'

export default async function (projectName) {
  const cwd = process.cwd()
  const targetAir = path.join(cwd, projectName)

  // 判断目录存在
  if (fs.existsSync(targetAir)) {
    //项目已经存在，询问是否覆盖
    let { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message:
          'The target directory already exists. Please select an operation:',
        choices: [
          {
            name: 'Overwrite',
            value: 'overwrite'
          },
          {
            name: 'Cancel',
            value: false
          }
        ]
      }
    ])
    if (!action) {
      console.log(
        symbol.warning,
        chalk.yellow('The target directory already exists. Exit the operation!')
      )
      return
    } else if (action === 'overwrite') {
      // 移除已存在的目录
      await fs.remove(targetAir)
      console.log(
        symbol.success,
        chalk.green('The target directory has been removed!')
      )
    }
  }

  // 选择模版
  const { template } = await inquirer.prompt([
    {
      name: 'template',
      type: 'list',
      message: 'Please select a template to create the project:',
      choices: TEMPLATE_LIST.map((temp) => {
        return {
          name: temp.name,
          value: temp
        }
      })
    }
  ])

  // 下载模板
  const git = new DownloadGit(template, projectName)
  await git.download()
}
