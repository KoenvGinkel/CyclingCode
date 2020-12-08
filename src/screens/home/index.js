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
import Weather from '../../lib/weather'

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
    Weather.getForecast(this.handleError, this.weatherCallback);
  }


  /**
   * Callback the received callback data.
   * 
   * @param {Object} data - Weather Callback.
   * @version 1.0.0
   */
  weatherCallback(data){
    console.log(data);
  }

  /**
   * Console log the given error.
   * 
   * @param {Object} error - handle the error. 
   * @version 1.0.0
   */
  handleError(error) {
    console.log(error);
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
