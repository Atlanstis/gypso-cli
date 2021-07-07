import spawn from 'cross-spawn'
import ora from 'ora'

// 执行 command 命令
export const execCmd = function (command, message = command) {
  if (typeof command === 'string') {
    command = command.split(' ')
  } else if (Array.isArray(command)) {
    message = command.join(' ')
  }
  let loading = ora(message)
  const [first, ...rest] = command
  return new Promise((resolve) => {
    const child = spawn(first, rest, {
      stdio: 'inherit'
    })
    // 监听执行结果
    child.on('close', function (code) {
      if (code !== 0) {
        // 执行失败
        loading.fail(`${message}: fail!`)
        process.exit(1)
      } else {
        // 执行成功
        loading.succeed(`${message}: success!`)
        resolve()
      }
    })
  })
}
