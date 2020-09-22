import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

export default class Ball extends Component {
  componentWillMount() {
    this.position = new Animated.ValueXY(0, 0);
    Animated.spring(this.position, {
      toValue: {x: 200, y: 700},
    }).start();
  }
  render() {
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.ball}></View>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
  },
});
