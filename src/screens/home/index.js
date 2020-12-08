import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './style';
// const Weather = require('weather-js');
const Weather = require('weather');

/**
 * Home screen component
 * Makes sure the homescreen gets rendered.
 * 
 * @version 1.0.0
 */
export default class HomeScreen extends Component {

  /**
   * Default constructor.
   * 
   * @param {Object} props - props given to this homescreen. 
   * @version 1.0.0
   */
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {};
    init();
  }

  init() {

    const appID = 'j0ZLQGCsujuenJZ4y1nU'; // here.com appID
    const appCode = 'sPd6myjVjwxg1zbNQgid913b2_M-MJxwZihDbWJ7dow'; // here.com appCode

    const weather = new Weather({
      appID,
      appCode
    });

    weather.now('Neede, Netherlands').then((results) => {
      console.log(results);
    });

  }

  /**
   * Render the homescreen component
   * 
   * @returns {JSX} JSX component
   * @version 1.0.0
   */
  render() {
    return (
      <KeyboardAvoidingView style={styles.loginScreenContainer}>
        <View style={styles.header}>
          <Text>Test</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
