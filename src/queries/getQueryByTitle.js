export function getQueryByTitle (query) {
  return {
    query: {
      bool: {
        must: {
          multi_match: {
            query: query,
            fields: [
              'title'
            ]
          }
        },
        filter: [
          {
            terms: {
              type: [
                'news'
              ]
            }
          },
          {
            terms: {
              field_node_site: [
                '4'
              ]
            }
          }
        ],
        should: {
          match_phrase: {
            title: {
              query: query,
              boost: 2
            }
          }
        }
      }
    },
    sort: [
      {
        field_news_date: 'desc'
      },
      {
        _score: 'desc'
      }
    ],
    aggs: {
      field_minister_name: {
        terms: {
          field: 'field_minister_name',
          order: {
            _key: 'asc'
          },
          size: 100
        }
      }
    }
  }
}
