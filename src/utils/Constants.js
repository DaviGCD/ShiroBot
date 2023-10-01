function manuItems(it, pg, limit) {
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

module.exports = {
  menuItems
}