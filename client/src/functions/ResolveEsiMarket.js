const resolveMarket = (data) => {
  var result = {}
  for (var i in data) {
    result[data[i].type_id] = {
      // adj: data[i].adjusted_price,
      // avg: data[i].average_price
      avg: data[i].adjusted_price
    }
  }

  return result
}

export default resolveMarket