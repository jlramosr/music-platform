import React from 'react'
import ArtistsList from './ArtistsList.jsx'
import ArtistsDetail from './ArtistsDetail.jsx'

class Artists extends React.Component {
  render() {
    const { match: { params } } = this.props
    return (
      <React.Fragment>
        { params.id ? 
          <ArtistsDetail /> :
          <ArtistsList /> 
        }
      </React.Fragment>
    )
  }
}

export default Artists
