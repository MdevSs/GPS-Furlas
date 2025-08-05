
import WebView from "react-native-webview";
import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import historic from "../dados/historic";
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function Map() {
    const [location, setLocation] = useState({});
    
    const [url, setUrl] = useState('')
    // console.log(historic)
    // console.log(AsyncStorage.getItem("_LOGIN_"))
    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if ( status !== 'granted') return;
        
        let loc = await Location.getCurrentPositionAsync();
        setLocation(loc.coords);
        historic.push([location.latitude, location.longitude]);
        const login = await AsyncStorage.getItem("_LOGIN_")
        // console.log(login)
        await fetch('http://192.168.15.157/api.php', {
            "method": "PATCH",
            "body": JSON.stringify({
                "fetch": {
                    "login": login,
                    "data": `latitude: ${location.latitude}, longitude: ${location.longitude}`
                }
            })
        })
        .catch(e => console.log(e))

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
