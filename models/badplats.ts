import axios from 'axios';
import storage from './storage';

const badplatser = {

    
    getBadPlatser: async function getBadPlatser(name: string){

      let notExpired: boolean;
      const lastRequest = await storage.readToken(name)
        const fiveHours = 1000 * 60 * 60 * 5;
        try {
             notExpired = (new Date().getTime() -  await lastRequest.time) < fiveHours;
        } catch(TypeError) {
             notExpired = false;
        }

        if ( lastRequest == null || !notExpired) {
          console.log("API till KARLSKRONA")
          const url = "https://service.karlskrona.se/FileStorageArea/Documents/bad/swimAreas.json";
          const configurationObject = {
              method: 'get',
              url: url,
            };
            const response = await axios(configurationObject);
            storage.storeToken(name, response.data.Payload.swimAreas)
          return response.data.Payload.swimAreas

        }
        console.log("KARLSKRONA STORAGE CALL")
        return lastRequest.data
    },
}

export default badplatser;
