function sortCsvColumns (csv_data) {

  if (csv_data == null || csv_data === '') return null

  let rows = csv_data.split('\n')

  if (rows.length < 1) return ''

  let columnNames = rows[0].split(',')
  let columns = columnNames.map(function(name) {
    return {name: name, values: []}
  })

  rows.slice(1).forEach(function(row) {
    let columnValues = row.split(',')
    columnValues.forEach(function(value, index) {
      columns[index].values.push(value)
    })
  })
  
  columns.sort(function(column1, column2) {return column1.name.localeCompare(column2.name)})

  let output = columns.map(function(column) { return column.name }).join(',')
  let outputRows = []

  for (let i = 0; i < rows.length-1; i++) {
    let row = columns.map(function(column) { return column.values[i] }).join(',')
    outputRows.push(row)
  }

  if (outputRows.length > 0) output += '\n' + outputRows.join('\n')

  return output
}
let input = "Beth,Charles,Danielle,Adam,Eric\n17945,10091,10088,3907,10132\n2,12,13,48,11"
console.log(sortCsvColumns(input))
