function menuItems(it, pg, limit) {
  let items = it,
    page = pg - 1,
    per_page = limit,
    offset = (page) * per_page,
    data = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page)

  return {
    page: page + 1,
    total_pages,
    data: data.map((obj, index) => {
      const id = page * limit + index + 1
      return Object.assign({ id }, { item: obj })
    })
  }
}

function generateKeyPremium(data) {
  /*
    Plans:
    OLD_DEUS: USD$29.99
    EX_MACHINA: USD$19.99
    SIREN: USD$9.99
    IMMANITY: FREE
*/
  let value = null
  if (data.plan === 'SIREN') {
    value = 10
  } else if (data.plan === 'EX_MACHINA') {
    value = 20
  } else if (data.plan === 'OLD_DEUS') {
    value = 30
  } else {
    value = 0
  }
  const date = new Date(data.created_at)
  const key_id = Math.round(date.getMonth() * date.getTime())
  return {
    id: key_id,
    value,
    ...data
  }
}

function calcPercentage(num1, num2) {
  return ((Number(num1) / Number(num2)) * Number(100)).toFixed(0)
}

module.exports = {
  menuItems,
  generateKeyPremium,
  calcPercentage
}