import { Image, ImageBackground, View, Button  } from 'react-native';
import { RootTabScreenProps } from '../types';
import { Base } from '../styles';
import kna from '../assets/images/kna3.jpg';
import logo from '../assets/images/logo6.png';
import * as Linking from 'expo-linking';
import { Feather } from "@expo/vector-icons";

export default function HomeScreen({ navigation }: RootTabScreenProps<'home'>) {
  

  
  return (
    <ImageBackground
      source={kna} 
      style={Base.background}>
      <View> 
        <Image source={logo}
          style={Base.logo}> 
        </Image>
      </View>
      <View style={Base.spaceViewXXL}></View>
      <View style={Base.container}>
        <Button
                  title= 'Turism i Karlskrona'
                  color={'blue'}
                  onPress={() => {
                    Linking.openURL('https://www.visitkarlskrona.se/sv');
                  }}>
          </Button>
          <View style={[Base.separator, Base.homeseparator]}></View>
      </View>
      
      <View style={Base.flexhome}>
      <Feather  color={'white'} size={70} name='instagram'
      onPress={() => Linking.openURL('https://www.instagram.com/visitkarlskrona/')}
      ></Feather>
      <Feather  color={'white'} size={70} name='facebook'
      onPress={() => Linking.openURL('https://sv-se.facebook.com/VisitKarlskrona/')}>
      
      </Feather>
        
      </View>
      
      
    </ImageBackground>
  );
}
