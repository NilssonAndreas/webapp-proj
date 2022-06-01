import axios from "axios";
import storage from "./storage";

const forcast = {

    getForcast: async function getForcast(name: string, long: number, lat: number){

        let notExpired;
        const symboler = {
            '1': 	'Klar himmel',
            '2': 	'Nästan klar himmel',
            '3': 	'varierande molnighet',
            '4': 	'Halvklar himmel',
            '5': 	'Molnig himmel',
            '6': 	'Mulet',
            '7': 	'Dimmigt',
            '8': 	'Svaga regnskurar',
            '9': 	'Måttliga regnskurar',
            '10': 'Kraftiga regnskurar',
            '11': 'Åskväder',
            '12': 'Lätt snöslaskskurar',
            '13': 'Moderate sleet showers',
            '14': 'Måttliga snöslaskskurar',
            '15': 'Lätta snöskurar',
            '16': 'Måttliga snöskurar',
            '17': 'Kraftiga snöskurar',
            '18': 'Duggregn',
            '19': 'Måttligt regn',
            '20': 'Kraftigt regn',
            '21': 'Åska',
            '22': 'Lätt snöslask',
            '23': 'Måttlig snöslask',
            '24': 'Kraftig snöslask',
            '25': 'Lätt snöfall',
            '26': 'Måttligt snöfall',
            '27': 'Kraftigt snöfall',
        }

        const lastRequest = await storage.readToken(name)
        const oneHour = 1000 * 60 * 60 * 1;
        try {
             notExpired = (new Date().getTime() -  await lastRequest.time) < oneHour;
        } catch(TypeError) {
             notExpired = false;
        }

        if ( lastRequest == null || !notExpired) {
            console.log("INNE I API CALL IFEN")
            const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${long.toString()}/lat/${lat.toString()}/data.json`;
        
            const configurationObject = {
                method: 'get',
                url: url,
            };
            const response = await axios(configurationObject);
            const data = [
                        {
                            'Time': response.data.timeSeries[1]['validTime'],
                            'Temp': response.data.timeSeries[1]['parameters'][10]['values'][0],
                           'Symbol': symboler[response.data.timeSeries[1]['parameters'][18]["values"][0]],
                        },
                        {
                            'Time': response.data.timeSeries[2]['validTime'],
                            'Temp': response.data.timeSeries[2]['parameters'][10]['values'][0],
                           'Symbol': symboler[response.data.timeSeries[2]['parameters'][18]["values"][0]],
                        },
                        {
                            'Time': response.data.timeSeries[3]['validTime'],
                            'Temp': response.data.timeSeries[3]['parameters'][10]['values'][0],
                           'Symbol': symboler[response.data.timeSeries[3]['parameters'][18]["values"][0]],
                        },
        
                ]
            storage.storeToken(name, data)

            return data
    
        }
        console.log("NO api call, Just return of data from storage")
        return lastRequest.data
    }

}

export default forcast;