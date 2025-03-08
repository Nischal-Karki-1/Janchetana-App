import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MapView, { Marker, Geojson } from "react-native-maps";
import * as turf from "@turf/turf";
import districtsData from "./DistrictsData";

const pin = require("../assets/pin.png");

export default function Map({ navigation }) {
    const [provinceData, setProvinceData] = useState(null);
    const [districtData, setDistrictData] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [provinceMarkers, setProvinceMarkers] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [clickedProvinceId, setClickedProvinceId] = useState(null);
    const [showMarkers, setShowMarkers] = useState(true);
    const mapRef = useRef(null);

    const provinceColors = [
       "rgba(0, 191, 255, 0.3)",   // Deep Sky Blue
        "rgba(50, 205, 50, 0.3)",   // Lime Green
        "rgba(0, 0, 255, 0.3)",    // Blue
        "rgba(255, 165, 0, 0.3)",  // Orange
        "rgba(75, 0, 130, 0.3)",   // Indigo
        "rgba(255, 20, 147, 0.3)", // Pink
        "rgba(0, 128, 128, 0.3)",  // Teal
    ];
    const getProvinceColor = (provinceId) => {

        const index = (provinceId - 1) % provinceColors.length;
        return provinceColors[index];
    };

    const getDistrictColor = (provinceId, districtIndex, totalDistricts) => {
        const baseColor = getProvinceColor(provinceId); 
        const opacityStep = 0.5 / totalDistricts;

 
        const [r, g, b] = baseColor.match(/\d+/g).map(Number);
        const adjustedOpacity = 0.1 + opacityStep * districtIndex;

        return `rgba(${r}, ${g}, ${b}, ${adjustedOpacity})`; 
    };

    useEffect(() => {
        // Fetch province data
        fetch(
            "https://raw.githubusercontent.com/Nischal-Karki-1/NEPAL-GeoJSON/main/nepal-with-provinces-acesmndr.geojson"
        )
            .then((response) => response.json())
            .then((data) => {
                setProvinceData(data);

                setTimeout(() => {
                    const nepalRegion = {
                        latitude: 28.3949,
                        longitude: 84.124,
                        latitudeDelta: 8.2,
                        longitudeDelta: 8.2,
                    };

                    if (mapRef.current) {
                        mapRef.current.animateToRegion(nepalRegion, 3000); // Smooth animation
                    }
                }, 1500);

                // Set province markers
                const provinceMarkers = data.features.map((feature) => {
                    const provinceName = feature.properties.name;
                    const coordinates = feature.geometry.coordinates;
                    const geometryType = feature.geometry.type;

                    let allCoordinates;

                    if (geometryType === "Polygon") {
                        allCoordinates = coordinates.flat(1);
                    } else if (geometryType === "MultiPolygon") {
                        allCoordinates = coordinates.flat(2);
                    } else {
                        console.error(`Unknown geometry type for province: ${provinceName}`);
                        return null;
                    }

                    const latitudes = allCoordinates.map((coord) => coord[1]);
                    const longitudes = allCoordinates.map((coord) => coord[0]);

                    const centerLatitude = (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
                    const centerLongitude = (Math.max(...longitudes) + Math.min(...longitudes)) / 2;

                    return {
                        name: provinceName,
                        latitude: centerLatitude,
                        longitude: centerLongitude,
                        provinceCode: feature.properties.id,
                    };
                });
                setProvinceMarkers(provinceMarkers);
            })
            .catch((error) => {
                console.error("Error fetching provinces GeoJSON:", error);
            });

        // Fetch district data
        fetch(
            "https://raw.githubusercontent.com/Acesmndr/nepal-geojson/master/generated-geojson/nepal-with-districts-acesmndr.geojson"
        )
            .then((response) => response.json())
            .then((data) => {
                setDistrictData(data);

                const newMarkers = data.features
                    .map((feature) => {
                        const districtName = feature.properties.DISTRICT;
                        const coordinates = feature.geometry.coordinates;
                        const geometryType = feature.geometry.type;

                        let allCoordinates;

                        if (geometryType === "Polygon") {
                            allCoordinates = coordinates.flat(1);
                        } else if (geometryType === "MultiPolygon") {
                            allCoordinates = coordinates.flat(2);
                        } else {
                            console.error(`Unknown geometry type for district: ${districtName}`);
                            return null;
                        }

                        const latitudes = allCoordinates.map((coord) => coord[1]);
                        const longitudes = allCoordinates.map((coord) => coord[0]);

                        const centerLatitude =
                            (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
                        const centerLongitude =
                            (Math.max(...longitudes) + Math.min(...longitudes)) / 2;

                        const districtInfo = districtsData.find(
                            (d) => d.district.trim().toLowerCase() === districtName.toLowerCase()
                        );

                        if (!districtInfo) {
                            console.error(`No data found for district: ${districtName}`);
                            return null;
                        }

                        return {
                            name: districtName,
                            province: districtInfo.province,
                            candidates: districtInfo.candidates,
                            latitude: centerLatitude,
                            longitude: centerLongitude,
                            provinceCode: feature.properties.PROVINCE,
                        };
                    })
                    .filter(Boolean);

                setMarkers(newMarkers);
            })
            .catch((error) => {
                console.error("Error fetching districts GeoJSON:", error);
            });
    }, []);

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        const point = turf.point([coordinate.longitude, coordinate.latitude]);
        console.log("Tapped Coordinate:", coordinate);


        if (selectedProvince) {
            if (districtData) {
                const districtFeature = districtData.features.find((feature) => {
                    const polygon = turf.polygon(feature.geometry.coordinates);
                    return (
                        turf.booleanPointInPolygon(point, polygon) &&
                        feature.properties.PROVINCE === selectedProvince.properties.id
                    );
                });

                if (districtFeature) {
                    console.log("Tapped inside district:", districtFeature.properties.DISTRICT);
                    const districtMarker = markers.find(
                        (marker) =>
                            marker.name.trim().toLowerCase() ===
                            districtFeature.properties.DISTRICT.trim().toLowerCase()
                    );

                    if (districtMarker) {
                        navigation.navigate("DistrictDetails", { district: districtMarker });
                    }
                    return;
                }
            }
        }

        if (provinceData) {
            const provinceFeature = provinceData.features.find((feature) => {
                const polygon = turf.multiPolygon(feature.geometry.coordinates);
                return turf.booleanPointInPolygon(point, polygon);
            });

            if (provinceFeature) {
                console.log("Tapped inside province:", provinceFeature.properties.name);
                handleProvinceClick(provinceFeature);
            } else {
                console.log("Tapped outside any province.");
            }
        }
    };


    const handleMarkerPress = (marker) => {
        navigation.navigate("DistrictDetails", { district: marker });
    };

    const handleProvinceClick = (provinceFeature) => {
        setSelectedProvince(provinceFeature);
        setClickedProvinceId(provinceFeature.properties.id);
        const allCoordinates = provinceFeature.geometry.coordinates.flat(2);
        const latitudes = allCoordinates.map((coord) => coord[1]);
        const longitudes = allCoordinates.map((coord) => coord[0]);

        const minLatitude = Math.min(...latitudes);
        const maxLatitude = Math.max(...latitudes);
        const minLongitude = Math.min(...longitudes);
        const maxLongitude = Math.max(...longitudes);

        const region = {
            latitude: (maxLatitude + minLatitude) / 2,
            longitude: (maxLongitude + minLongitude) / 2,
            latitudeDelta: (maxLatitude - minLatitude) * 1.1,
            longitudeDelta: (maxLongitude - minLongitude) * 1.1,
        };

        mapRef.current.animateToRegion(region, 1500);
    };

    const handleRegionChange = (region) => {
        const zoomThreshold = 6;

        if (region.latitudeDelta > zoomThreshold) {
            setShowMarkers(false);
        } else {
            setShowMarkers(true);
        }
    };

    const filteredMarkers = selectedProvince
        ? markers.filter(
            (marker) => marker.provinceCode === selectedProvince.properties.id
        )
        : [];

    return (
        <MapView
            style={styles.map}
            ref={mapRef}
            customMapStyle={customMapStyle}
            initialRegion={{
                latitude: 27.757136753800367,
                longitude: 84.23813458532095,
                latitudeDelta: 75,
                longitudeDelta: 75,
            }}
            onPress={handleMapPress}
            onRegionChange={handleRegionChange}
        >
            {provinceData &&
                provinceData.features.map((feature, index) => (
                    <Geojson
                        key={index}
                        geojson={{
                            type: "FeatureCollection",
                            features: [feature],
                        }}
                        fillColor={getProvinceColor(feature.properties.id)}
                        strokeColor="black" 
                        strokeWidth={1.2} 
                    />
                ))}

            {districtData && selectedProvince && (
                districtData.features
                    .filter((feature) => feature.properties.PROVINCE === selectedProvince.properties.id)
                    .map((feature, index) => (
                        <Geojson
                            key={index}
                            geojson={{
                                type: "FeatureCollection",
                                features: [feature],
                            }}
                            fillColor={getDistrictColor(
                                selectedProvince.properties.id,
                                index,
                                districtData.features.length
                            )} // Dynamic color based on province and district index
                            strokeColor="black" // Keep consistent borders
                            strokeWidth={1} // Optional: adjust stroke width
                        />
                    ))
            )}

            {provinceMarkers
                .filter((marker) => marker.provinceCode !== clickedProvinceId)
                .map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.name}
                    />
                ))}

            {showMarkers &&
                filteredMarkers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude + 0.095,
                        }}
                        onPress={() => handleMarkerPress(marker)}
                    >
                        <View style={{ alignItems: "center", flexDirection: "row" }}>
                            <Image
                                source={pin}
                                style={styles.pinImage}
                                resizeMode="contain"
                            />

                            <Text style={{ fontWeight: 'bold', color: 'white' }}>{marker.name}</Text>

                        </View>
                    </Marker>
                ))}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    pinImage: {
        width: 35,
        height: 35,
    },

    markerText: {
        fontWeight: "bold",
        fontSize: 12,
    },
});

const customMapStyle = [
    {
        featureType: "all",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "all",
        elementType: "geometry",
        stylers: [{ visibility: "off" }],
    }

];
