import { View, Text, ScrollView} from "react-native";
import { useState, useEffect } from 'react';
import { Base, Typography } from '../styles';
import forcastModule from "../models/forcast";
import { Feather } from "@expo/vector-icons";


export default function BadplatsInfo({ route }) {

    const { badplats } = route.params;
    const [forcast, setForcast] = useState([]);

    const date = badplats.timeStamp.slice(0, 10);
    const time = badplats.timeStamp.slice(11, 19);
    const symboler = {
        'Klar himmel': 'sun',
        'Nästan klar himmel': 'sun',
        'varierande molnighet': 'sun',
        'Halvklar himmel': 'sun',
        'Molnig himmel': 'cloud',
        'Mulet': 'cloud',
        'Dimmigt': 'cloud',
        'Svaga regnskurar': 'cloud-rain',
        'Måttliga regnskurar': 'cloud-rain',
        'Kraftiga regnskurar': 'cloud-rain',
        'Åskväder': 'cloud-lightning',
        'Lätt snöslaskskurar': 'cloud-snow',
        'Moderate sleet showers': 'cloud-snow',
        'Måttliga snöslaskskurar': 'cloud-snow',
        'Lätta snöskurar': 'cloud-snow' ,
        'Måttliga snöskurar': 'cloud-snow',
        'Kraftiga snöskurar': 'cloud-snow',
        'Duggregn': 'cloud-rain',
        'Måttligt regn': 'cloud-rain',
        'Kraftigt regn': 'cloud-rain',
        'Åska': 'cloud-lightning',
        'Lätt snöslask': 'cloud-snow',
        'Måttlig snöslask': 'cloud-snow',
        'Kraftig snöslask': 'cloud-snow',
        'Lätt snöfall': 'cloud-snow',
        'Måttligt snöfall': 'cloud-snow',
        'Kraftigt snöfall': 'cloud-snow',
    }
    
    useEffect(() => {
        (async () => {
          
            console.log("CALL TO API IN BADPLATSINFO");
           
            const result = await forcastModule.getForcast(badplats.nameArea,Math.round(badplats.geometryArea['x']), Math.round(badplats.geometryArea['y']) );
            setForcast(result);

        })();
    }, []);
    
    const forcastList = forcast
            .map((forcast, index) => {
                const forcastTime = new Date(forcast['Time'])
                return <View style={[Base.containerNOM, Base.center,]} key={index}>
                        <Text style={[Typography.normal, Typography.center, Typography.white]}>{forcastTime.toLocaleTimeString()}</Text>
                        <View style={Base.containerNOM}>
                            <View>
                                <Text style={[Typography.header4, Typography.white]}>

                                        <Text style={[Typography.normal, Typography.white]}>
                                            {forcast['Temp']}°C och {forcast["Symbol"]}
                                        </Text>
                                </Text>
                            </View>
                            <View style={Base.center}>
                            <Text style={[Typography.header4, Typography.white]}>
                                    <View >
                                    <Feather  color={'yellow'} size={55} name={symboler[forcast["Symbol"]]}></Feather>
                                    </View>
                            </Text>
                            </View>
                           
                            <View style={Base.separator}></View>
                            <View style={Base.spaceViewLarge}></View>
                        </View>
                    </View>
            });
           
    return (
        <ScrollView style={[Base.container]}>
            <Text style={Typography.header4}>Vattentemperatur: {Math.round(badplats.temperatureWater * 10) / 10}°C</Text>
            <Text style={Typography.header4}>Uppmätt: {date} kl:{time}</Text>
            <View style={[Base.containerNOM, Base.border, Base.blue]}>
            <Text style={[Typography.header4, Typography.center, Typography.white]}>SMHI prognos</Text>
            {forcastList}
            </View>
           
        </ScrollView>
    )
    
};
