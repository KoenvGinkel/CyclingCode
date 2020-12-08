import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import styles from './style';
import Weather from "../../lib/weather";
import style from './style';
import RNSimpleCompass from 'react-native-simple-compass';



const degree_update_rate = 3; // Number of degrees changed before the callback is triggered

RNSimpleCompass.start(degree_update_rate, (degree) => {
  console.log('You are facing', degree);
  RNSimpleCompass.stop();
});

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

    this.state = {
      weather: {
        "city_name": "Neede",
        "country_code": "NL",
        "data": [
          {
            "app_max_temp": 1.8,
            "app_min_temp": -3,
            "clouds": 78,
            "clouds_hi": 0,
            "clouds_low": 45,
            "clouds_mid": 51,
            "datetime": "2020-12-08",
            "dewpt": 1.7,
            "high_temp": 3.3,
            "low_temp": -0.3,
            "max_dhi": null,
            "max_temp": 5.4,
            "min_temp": 1.5,
            "moon_phase": 0.331502,
            "moon_phase_lunation": 0.8,
            "moonrise_ts": 1607467144,
            "moonset_ts": 1607432333,
            "ozone": 299.984,
            "pop": 20,
            "precip": 0.012207,
            "pres": 1002.77,
            "rh": 89,
            "slp": 1005.41,
            "snow": 0,
            "snow_depth": 0,
            "sunrise_ts": 1607412428,
            "sunset_ts": 1607440591,
            "temp": 3.3,
            "ts": 1607382060,
            "uv": 1.66106,
            "valid_date": "2020-12-08",
            "vis": 0,
            "weather": {
              "icon": "c04d",
              "code": "804",
              "description": "Ovecast clouds"
            },
            "wind_cdir": "ENE",
            "wind_cdir_full": "east-northeast",
            "wind_dir": 73,
            "wind_gust_spd": 4.64164,
            "wind_spd": 1.53406
          }
        ],
        "lat": "52.13417",
        "lon": "6.61389",
        "state_code": "03",
        "timezone": "Europe/Amsterdam"
      },
    };

    this.handleError = this.handleError.bind(this);
    this.weatherCallback = this.weatherCallback.bind(this);

    Weather.getForecast(this.handleError, this.weatherCallback);
  }

  /**
   * Callback the received callback data.
   *
   * @param {Object} data - Weather Callback.
   * @version 1.0.0
   */
  weatherCallback(data) {
    this.setState({ weather: data });
    const dirShort = data.data[0].wind_cdir
    let dirLong = '';

    for (let i = 0; i < dirShort.length; i++) {

      if(i==0){
        dirLong = this.windDirection(dirShort.charAt(i));
      }else if(i==1){
        dirLong = `${dirLong} - ${this.windDirection(dirShort.charAt(i))}`;
      } else if(i==2){
        const temp = this.windDirection(dirShort.charAt(i));
        dirLong = `${dirLong}${temp.toLowerCase()}`;
      }
    }
    
    console.log(dirLong);
  }

  windDirection(letter) {
    switch (letter) {
      case 'N':
        return 'Noord'
        break;
      case 'E':
        return 'Oost'
        break;
      case 'S':
        return 'Zuid'
        break;
      case 'W':
        return 'West'
        break;
      default:
      // code block
    }
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
          <View style={style.headerInfo}>
            <Text>{this.state.weather.city_name}</Text>
            <Text>{this.state.weather.data[0].temp}</Text>
            <Text>{this.state.weather.data[0].wind_cdir}</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
