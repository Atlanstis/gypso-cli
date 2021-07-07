import fs from 'fs-extra'

export * from './constants'
export * from './cmd'

// 更新json配置文件
export const updateJsonFile = (fileName, obj) => {
  return new Promise((resolve) => {
    if (fs.existsSync(fileName)) {
      const data = fs.readFileSync(fileName).toString()
      let json = JSON.parse(data)
      Object.keys(obj).forEach((key) => {
        json[key] = obj[key]
      })
      fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8')
      resolve()
    }
  })
}
