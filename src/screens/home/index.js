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
