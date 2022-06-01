import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import BadplatsMarkers from '../components/BadplatserMarkers';


export default function MapScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kartan</Text>
    <BadplatsMarkers></BadplatsMarkers>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
