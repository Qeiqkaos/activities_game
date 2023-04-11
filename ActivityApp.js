import {
    Text,
    View,
    StyleSheet,
    Button,
    StatusBar,
    TextInput,
    FlatList,
    Modal,
    Alert,
    Animated,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { AddActivity, increase, decrease, RemoveActivity } from './redux/actions/index';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

function App({ activitiesList, AddActivity, increase, decrease,counter,RemoveActivity }) {
  function Box(props) {
  return (
    <Animated.View
      style={
        [
        styles.cube,
        {
          top: props.Top,
          width: 300,
          backgroundColor:"white",
        },
      ]
      }>
      <Text style={styles.header}>{props.Text}</Text>
    </Animated.View>
  );}
  const header = useRef(new Animated.Value(400)).current; 
  Animated.spring(header, { toValue: 0 }).start();
  const HomeScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);  
  return (
    <View style={styles.container}>
      <Box Top={header} Text="Game of Activities" />
      <View style={styles.sep} />
      <View style={styles.sep} />

      <Modal animationType="fade" visible={visible} transparent={true}>
        <View style={styles.modalRoot}>
          <View style={[styles.modalWindow, styles.shadow]}>
          <View style={styles.sep} />
            <Text style={styles.description}>Do as many as possible activities and improve your rating!</Text>
            <View style={styles.sep} />
            <Button title="Ok" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>


      <Button onPress={() => setVisible(true)} title="Rules" />
      <View style={styles.sep} />
      <Button
        title="Let's play!"
        onPress={() => {
          navigation.navigate('Game');
        }}
      />
      <View style={styles.sep} />
      <Button
        title="Show my rating"
        onPress={() => {
          navigation.navigate('Rating');
        }}
      />
    </View>
  );
};
const GameScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Button style = {styles.addbutton} title="Add an activity" onPress={()=>(setRefetch(!refetch),AddActivity(data.activity,data.participants,data.type,data.key))} />
            <View style={styles.sep} />
            <FlatList
                data={activitiesList}
                renderItem={Entry}
                extraData={increase(0)} 
            />
            <Button
        title="Show my rating"
        onPress={() => {
          navigation.navigate('Rating');
        }}
      />
    </View>
  );
};
const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000
    }).start();
  };

const RatingScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
    <TouchableHighlight
        onPress={fadeIn}
        underlayColor="white">
        <View><Text style={styles.rating}>Your rating: </Text></View>
      </TouchableHighlight>
    <Animated.View
        style={[
          styles.rating,
          {
            opacity: fadeAnim
          },
        ]}><Text style={styles.header}>{counter}</Text></Animated.View>
    </View>
  );
};
const Stack = createStackNavigator();

    const Entry = ({ item}) => {
          var mybuttons = [
        {
          text: 'Yes',
          onPress: () => {
            RemoveActivity(item.key),decrease(1)
          },
        },
        {
          text: 'No',
          onPress: () => {
            console.log('No was pressed');
          },
        },
      ];
        return(
          <View style={styles.entry}>
            <Text style={styles.activity}>Activity: {item.activity}</Text>
            <Text style={styles.type}>Type: {item.type}</Text>
            <Text style={styles.type}>Participants: {item.participants}</Text>
            <View style={styles.button}>
                    <Button
                        style={styles.complete}
                        title="Completed"
                        onPress={() => (RemoveActivity(item.key),increase(1))}
                        color="#66BB6A"
                    />
                    <Button
                        style={styles.fail}
                        title="Failed"
                        onPress={() => ( Alert.alert('Confirm', 'Are you sure to give up on this activity?', mybuttons))}
                        color="#f44336"
                    />
                    </View>
        </View>
          );
    }

    const [data, setData] = useState([]);
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
        fetch('https://www.boredapi.com/api/activity')
            .then((res) => res.json())
            .then((json) => setData(json))
    }, [refetch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group
          >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Rating" component={RatingScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    entry: {
        borderWidth: 1,
        marginTop:15,
        margin: 5,
        borderColor: "black",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 4,
    },
    cube: {
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
    sep: {
        height: StyleSheet.hairlineWidth * 2,
        marginTop: 20,
    },
    container: {
        padding: StyleSheet.hairlineWidth * 10,
        paddingTop: StatusBar.currentHeight,
        width:"100%",
        height:"100%",
        backgroundColor: "aliceblue",
    },
    button: {
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        fontSize: 22,
        padding: 15,
    },
    header:{
        fontSize: 40,
        textAlign:"center",
        fontWeight: "bold",
    },
    description:{
        fontStyle:"italic",
        fontSize:20,
        textAlign:"center",
    },
    activity:{
        flex:1,
        fontSize:25,
        textAlign:"center"
    },
    type:{
        flex:1,
        fontSize: 17,
    },
    rating:{
        textAlign:'center',
        fontSize:20,
        margin:40,
    },
    complete:{
        flexBasis:100,
        flexShrink:1,
        flexGrow:1,
    },
    fail:{
        flexBasis:100,
        flexShrink:1,
        flexGrow:1,
    },
    modalRoot: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWindow: {
    backgroundColor: 'white',
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
});
const mapDispatch = { AddActivity, increase, decrease,RemoveActivity };
const mapState = (state) => ({ activitiesList: state.activities.activitiesList, counter: state.activities.counter, });
export default connect(mapState, mapDispatch)(App);
