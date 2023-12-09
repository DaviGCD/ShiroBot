function menuItems(it, pg, limit) {
  let items = it,
  page = pg,
  per_page = limit,
  offset = (page - 1) * per_page,
  data = items.slice(offset).slice(0, per_page),
  total_pages = Math.ceil(items.length /per_page)

  return {
    page,
    total_pages,
    data
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

module.exports = {
  menuItems,
  generateKeyPremium
}