import React, { useState } from 'react'
import './App.css'
import { post } from './utils/service'
import { getQueryByTitle } from './queries/getQueryByTitle'
import { Table } from './Table'
import { Outer, Inner, MainTitle, SubTitle, LinkPremiers, SearchButton, SearchInput, TableLink, Center } from './Styling'
import LinkIcon from '@material-ui/icons/Link'
import { DateInfo } from './components/DateInfo'
import { licence } from './licence'

const SEARCH_ENDPOINT = 'https://70a9ae2679d731ae30ca5f7b206a27b8.elastic.sdp1.sdp.vic.gov.au/elasticsearch_index_drupal_node/_search?from=0&size=9&filter_path=hits.hits,hits.total,aggregations&_source=body,field_news_date,field_media_image_absolute_path,field_node_primary_site,summary_processed,field_type_name,title,type,url'

function App () {
  const [query, setQuery] = useState('')
  const [tableData, setTableData] = useState(null)

  const columns = [{
    name: 'title',
    label: 'Title'
  },
  {
    name: 'date',
    label: 'Date',
    options: {
      customBodyRenderLite: function RenderDateInfo (dataIndex, rowIndex) {
        return <DateInfo value={tableData[dataIndex].date} />
      }
    }
  },
  {
    name: 'Link',
    label: 'Link',
    options: {
      customBodyRenderLite: function RenderLocationButton (dataIndex, rowIndex) {
        return <TableLink href={tableData[dataIndex].url} rel='noreferrer' target='_blank'><LinkIcon /></TableLink>
      }
    }
  }]

  async function search (query) {
    if (query && query !== '') {
      setQuery(query)
      console.log('query', query)
      const data = getQueryByTitle(query)
      const result = await post(SEARCH_ENDPOINT, data)
      console.log('result', result)
      const _tableData = []
      const hits = result?.hits?.hits ?? []
      for (let iHit = 0; iHit < hits.length; iHit++) {
        const hit = hits[iHit]
        const url = `https://www.premier.vic.gov.au/${hit?._source?.url[0]}`
        const row = { title: hit?._source?.title[0], date: hit?._source?.field_news_date[0], url }
        _tableData.push(row)
      }
      setTableData(_tableData)
    } else {
      console.log('Invalid query')
    }
  }

  return (
    <Outer>
      <Inner>

        <MainTitle>Search Premier of Victoria <LinkPremiers href='https://www.premier.vic.gov.au/media-centre'>Media Centre</LinkPremiers></MainTitle>
        <SubTitle>Either enter text in box, and click Search By Title, OR press a find button.</SubTitle>

        <Center>
          <SearchInput
            type='text' inputColor='rebeccapurple' value={query} onChange={(evt) => {
              const newQuery = evt?.target?.value
              setQuery(newQuery)
            }}
          />
          <SearchButton onClick={() => search(query)}>Search By Title</SearchButton>
        </Center>

        <Center>
          <SearchButton onClick={() => search('Restrictions')}>Find Restrictions</SearchButton>
        </Center>

        {tableData &&
          <Center>
            <SubTitle>Click the link icon to load that page in a new tab.</SubTitle>
            <Table columns={columns} data={tableData} />
          </Center>}

        <Center>
          <pre>
            {licence}
          </pre>
        </Center>
      </Inner>
    </Outer>
  )
}

export default App
