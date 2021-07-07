import program from 'commander'
import { VERSION } from './utils'
import { create, link } from './command'

// 命令列表
const actionMap = {
  create: {
    description: 'Create a project from a templatee',
    command: 'create <projectName>'
  },
  link: {
    description: 'Link your project to GitHub',
    command: 'link <gitUrl>'
  }
}

Object.keys(actionMap).forEach((action) => {
  program
    .command(actionMap[action].command)
    .description(actionMap[action].description)
    .action((name) => {
      switch (action) {
        case 'create':
          create(name)
          break
        case 'link':
          link(name)
          break
      }
    })
})

// 设置版本
program.version(VERSION, '-v, --version').parse(process.argv)
