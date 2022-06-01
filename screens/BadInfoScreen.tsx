import { Text } from '../components/Themed';
import BadplatsInfo from '../components/BadplatsInfo';
import { Base, Typography } from '../styles';

import { View } from 'react-native';

export default function BadInfoScreen( {route} ) {

  return (
    <View style={[Base.containerNOM]}>
        <Text style={[Typography.header1, Typography.underline, Typography.center]}> 

        {route.params.badplats.nameArea}

        </Text>

        <BadplatsInfo route={route}></BadplatsInfo> 

    </View>
  );
}