import { Button, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import badModel from "../models/badplats"
import { useNavigation } from '@react-navigation/native';
import { View } from './Themed';
import { Base } from '../styles';
export default function BadPlatsList() {
    const navigation = useNavigation();
  

    const [allBadplatser, setAllBadplatser] = useState([]);
    
    async function reloadBadplatser() {
        console.log("API D-LIST")
        const tokenName = 'badplatser'
        setAllBadplatser(await badModel.getBadPlatser(tokenName));
        //För att stoppa evighetsloop

    };
    useEffect(() => {
        reloadBadplatser();
        const badplatsSubscription = navigation.addListener('focus', () => {
            reloadBadplatser();
        });
    
        return badplatsSubscription;
    }, []);

    const listOfBadplatser = allBadplatser
            .map((badplats, index) => {
             
                return <View key={index}><Button
                title={`${badplats.nameArea}: ${Math.round(badplats.temperatureWater * 10) / 10}°C`}
                key={index}
                color={'blue'}
                onPress={() => {
                    navigation.navigate('info',{
                        badplats: badplats
                    });
                }}
            />
            <View style={Base.spaceView}></View>
          </View>
            });

    return (
        <ScrollView>
        {listOfBadplatser}
        <View style={Base.spaceViewLarge}></View>
        </ScrollView>
    );
    }
