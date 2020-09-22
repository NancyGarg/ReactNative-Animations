import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Ball from './Components/Ball';
import Deck from './Components/Deck';
const DATA = [
  {
    id: 1,
    text: 'Card #1',
    uri: 'https://i.ytimg.com/vi/aXYPUqFL9ZU/maxresdefault.jpg',
  },
  {
    id: 2,
    text: 'Card #2',
    uri: 'https://i.ytimg.com/vi/aXYPUqFL9ZU/maxresdefault.jpg',
  },
  {
    id: 3,
    text: 'Card #3',
    uri: 'https://i.ytimg.com/vi/aXYPUqFL9ZU/maxresdefault.jpg',
  },
  {
    id: 4,
    text: 'Card #4',
    uri: 'https://i.ytimg.com/vi/aXYPUqFL9ZU/maxresdefault.jpg',
  },
  {
    id: 5,
    text: 'Card #5',
    uri: 'https://i.ytimg.com/vi/aXYPUqFL9ZU/maxresdefault.jpg',
  },
  {
    id: 6,
    text: 'Card #6',
    uri: 'https://i.ytimg.com/vi/aXYPUqFL9ZU/maxresdefault.jpg',
  },
  {
    id: 7,
    text: 'Card #7',
    uri: 'https://i.ytimg.com/vi/aXYPUqFL9ZU/maxresdefault.jpg',
  },
  {
    id: 8,
    text: 'Card #8',
    uri: 'https://i.ytimg.com/vi/aXYPUqFL9ZU/maxresdefault.jpg',
  },
];
export default class Main extends Component {
  renderCard(item, i) {
    return (
      <View key={i} style={styles.cardcontainer}>
        <Text style={styles.heading}>{item.text}</Text>
        <Image
          style={{width: '80%', height: 250, marginBottom: 32}}
          resizeMode={'cover'}
          source={{
            uri: item.uri,
          }}
        />

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btntext}>Like</Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderNoMoreCards = () => {
    console.log(';;;;no cards..');
    return <Text>No more Cards available to swipe</Text>;
  };

  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          //data={[]}
          renderCard={this.renderCard}
          onSwipeLeft={() => {}}
          onSwipeRight={() => {}}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardcontainer: {
    marginVertical: 20,

    backgroundColor: 'white',

    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    width: '85%',
    alignSelf: 'center',
    padding: 16,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 24,
    paddingBottom: 32,
  },
  btn: {
    backgroundColor: 'blue',
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  btntext: {
    color: 'white',
    fontSize: 20,
    paddingVertical: 10,
  },
});
