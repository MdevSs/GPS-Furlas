
import WebView from "react-native-webview";
import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Map() {
    const [location, setLocation] = useState({});
    const [url, setUrl] = useState('')

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if ( status !== 'granted') return;
        
        let loc = await Location.getCurrentPositionAsync();
        setLocation(loc.coords);
    } 
    
    console.log('mapa')
    
    useEffect(()=>{
        getLocation()
    }, [])

    useEffect(()=>{
        const newUrl = location
            ? `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=15/${location.latitude}/${location.longitude}`
            : 'https://www.openstreetmap.org' 
        setUrl(newUrl);
    }, [location])


    return (
        <SafeAreaView style={styles.main}>
            <Button title="Local" onPress={getLocation}/>
            <WebView source={{uri: url}} style={styles.map}/>
        </SafeAreaView>

    )
} 
const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    map: {
        flex: 1
    }
})
