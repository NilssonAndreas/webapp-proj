import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
    storeToken: async function storeToken(name: string, data: string) {
        try {
            const tokenAndDate = {
                data: data,
                time: new Date().getTime(),
            };
            const jsonValue = JSON.stringify(tokenAndDate);
            
            await AsyncStorage.setItem(name, jsonValue);
        } catch (e) {
            // saving error
        }
    },
    readToken: async function readToken(name: string): Promise<any> {
        try {
            const jsonValue = await AsyncStorage.getItem(name);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    },
    deleteToken: async function deleteToken(name: string) {
        await AsyncStorage.removeItem(name);
    }
};

export default storage;