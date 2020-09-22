import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  PickerIOSItem,
  LayoutAnimation,
  UIManager,
} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const TIME_DURATION = 250;
export default class Deck extends Component {
  //setting default props if incase it doesn't come along
  static defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {},
  };
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({x: gesture.dx, y: 0});
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.handleSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.handleSwipe('left');
        } else {
          this.resetPosition();
        }
      },
    });
    this.state = {
      panResponder,
      position,
      index: 0,
    };
  }

  // this is to reset the index incase new data comes up
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        index: 0,
      });
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }
  handleSwipe = (direction) => {
    //timing doesn't play the animation ,it brings the card directly to the position
    Animated.timing(this.state.position, {
      toValue: {
        x: direction == 'left' ? -SCREEN_WIDTH * 2 : SCREEN_WIDTH * 2,
        y: 0,
      },
      duration: TIME_DURATION,
    }).start(() => this.onSwipeComplete(direction));
  };
  onSwipeComplete = (direction) => {
    const {onSwipeLeft, onSwipeRight, data} = this.props;
    const item = data[this.state.index];
    direction == 'right'
      ? this.props.onSwipeRight(item)
      : this.props.onSwipeLeft(item);
    this.state.position.setValue({x: 0, y: 0});
    this.setState({index: this.state.index + 1});
  };

  resetPosition = () => {
    Animated.spring(this.state.position, {
      toValue: {x: 0, y: 0},
    }).start();
  };
  getCardStyle = () => {
    const {position} = this.state;

    //interpolation
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...this.state.position.getLayout(),
      transform: [{rotate}],
    };
  };

  renderCards() {
    if (this.state.index >= this.props.data) {
      return this.props.renderNoMoreCards();
    }
    return this.props.data
      .map((item, i) => {
        if (i < this.state.index) {
          return null;
        }
        if (i == this.state.index) {
          return (
            <Animated.View
              key={item.id}
              style={[this.getCardStyle(), styles.cardStyle]}
              {...this.state.panResponder.panHandlers}>
              {this.props.renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            style={[styles.cardStyle, {top: 10 * (i - this.state.index)}]}>
            {this.props.renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  }
  render() {
    return <View>{this.renderCards()}</View>;
  }
}
const styles = StyleSheet.create({
  ball: {},
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
});
