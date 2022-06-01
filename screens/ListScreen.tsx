
import { View, Text } from '../components/Themed';
import BadPlatsList from '../components/BadplatsList';
import { Base, Typography } from '../styles';
export default function ListScreen() {

  return (
    <View style={Base.container}>
      <View style={Base.center}>
      <Text style={Typography.header4}>Badplats | Vattentemperatur</Text>
      </View>
      
    <View style={Base.buttonGrid}><BadPlatsList ></BadPlatsList></View>
    </View>
  );
}
