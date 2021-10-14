import MUIDataTable from 'mui-datatables'

const options = {
  responsive: 'standard',
  selectableRowsHeader: false,
  selectableRowsHideCheckboxes: true
}

export function Table ({ columns, data }) {
  return (
    <MUIDataTable
      title='Items'
      data={data}
      columns={columns}
      options={options}
    />
  )
}
