import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import Pin from './Pin';

export default class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      api_url: 'http://data.edmonton.ca/resource/87ck-293k.json',
      viewport: {
        width: 1100,
        height: 600,
        zoom: 10,
        latitude: 53.5444,
        longitude: -113.4989
      },
      data: null
    }
  }

  componentDidMount() {
    const { data, api_url } = this.state;

    if (!data) {
      fetch(api_url, { method: 'GET' })
        .then(response => response.json())
        .then(response => this.setState({ data: response }))
    }
  }

  render() {
    const { data } = this.state
    return (
      <MapGL
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {data && data.map((coord, i) => (
          <Marker
            key={i}
            latitude={parseFloat(coord.location.latitude)}
            longitude={parseFloat(coord.location.longitude)}>
            <Pin />
          </Marker>
        ))}

      </MapGL>
    )
  }
}