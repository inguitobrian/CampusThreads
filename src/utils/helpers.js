// utils/helpers.js
export function getAvatarText(fullName) {
  if (!fullName) return ''
  const [firstName = '', lastName = ''] = fullName.split(' ')
  return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase()
}

// 👉 File Extraction of Object, for 1 File/Image
export const fileExtract = event => {
  return new Promise((resolve, reject) => {
    const { files } = event.target

    if (!files || !files.length) return reject(new Error('No files selected'))

    const fileReader = new FileReader()
    fileReader.readAsDataURL(files[0])

    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        resolve({ fileObject: files[0], fileUrl: fileReader.result })
      else reject(new Error('Failed to read file as Data URL'))
    }

    fileReader.onerror = () => reject(new Error('Error reading file'))
  })
}
