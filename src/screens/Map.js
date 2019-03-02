import React from 'react';
import MapView from 'react-native-maps';

class Map extends React.Component {
    render() {
        return <MapView
            style={{flex: 1}}
            region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
        >
        </MapView>
    }
}

export default Map;