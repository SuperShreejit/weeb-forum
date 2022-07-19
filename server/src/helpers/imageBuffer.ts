import fs from 'fs'

const convertImage = (path : string) => { 
  const file = fs.readFileSync(path)
  const buffer = Buffer.from(file)
  return buffer  
}

export default convertImage
