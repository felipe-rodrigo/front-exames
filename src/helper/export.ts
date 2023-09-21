import { exportFile, useQuasar } from 'quasar';

export function exportTable(columns: any, rows: any) {
  const $q = useQuasar();
  const content = [columns.map((col:any) => wrapCsvValue(col.label))].concat(
    rows.map((row: any) => columns.map((col:any) => wrapCsvValue(
      typeof col.field === 'function'
        ? col.field(row)
        : row[col.field === void 0 ? col.name : col.field],
      col.format,
      row
    )).join(';'))
  ).join('\r\n')

  const status = exportFile(
    'table-export.csv',
    content,
    'text/csv'
  )

  if (status !== true) {
    $q.notify({
      message: 'Erro no download...',
      color: 'negative',
      icon: 'warning'
    })
  }
}

function wrapCsvValue(val: any, formatFn?: any, row?: any) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""');

  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}
