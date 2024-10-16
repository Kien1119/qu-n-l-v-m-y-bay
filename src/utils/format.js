export function formatDate(_date) {
  const date = new Date(_date)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  // const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${hours}:${minutes} ${day}/${month}/${year} `
}
export function formatPrice(price) {
  if (price == null || isNaN(price)) {
    return 'N/A'
  }
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}

export const genBookingCode = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }
  return result
}
