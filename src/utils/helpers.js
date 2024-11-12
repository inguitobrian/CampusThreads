// utils/helpers.js
export function getAvatarText(fullName) {
  if (!fullName) return ''
  const [firstName = '', lastName = ''] = fullName.split(' ')
  return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase()
}
