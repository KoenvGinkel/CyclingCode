import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, Image, ActivityIndicator } from 'react-native';
import styles from './style';
import Weather from "../../lib/weather";
import LinearGradient from 'react-native-linear-gradient'

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
      selectedColors: ['#098bdb', '#1ce4f9'],
      colorScheme: {
        summer: { day: ['#098bdb', '#1ce4f9'], night: ['#1c00f9', '#8600ff'] },
        winter: { day: ['#095fff', '#befff9'], night: ['#07263a', '#094068'] },
      },
      windDirection: '',
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

    let currTime = `${Date.now()}`.slice(0, -3);
    let sunrise = data.data[0].sunrise_ts;
    let sunset = data.data[0].sunset_ts;

    console.log(data.data[0].wind_cdir_full)

    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let dayOrNight = sunrise < currTime && sunset > currTime;

    if (month == 3) {
      if (day >= 26) {
        if (dayOrNight) {
          this.setState({ selectedColors: this.state.colorScheme.summer.day });
        } else {
          this.setState({ selectedColors: this.state.colorScheme.summer.night });
        }
      } else {
        console.log('winter');
        if (dayOrNight) {
          this.setState({ selectedColors: this.state.colorScheme.winter.day });
        } else {
          this.setState({ selectedColors: this.state.colorScheme.winter.night });
        }
      }
    } else if (month > 3 && month < 10) {
      console.log('summer');
      if (dayOrNight) {
        this.setState({ selectedColors: this.state.colorScheme.summer.day });
      } else {
        this.setState({ selectedColors: this.state.colorScheme.summer.night });
      }
    } else if (month == 10) {
      if (day >= 29) {
        console.log('winter');
        if (dayOrNight) {
          this.setState({ selectedColors: this.state.colorScheme.winter.day });
        } else {
          this.setState({ selectedColors: this.state.colorScheme.winter.night });
        }
      } else {
        console.log('summer');
        if (dayOrNight) {
          this.setState({ selectedColors: this.state.colorScheme.summer.day });
        } else {
          this.setState({ selectedColors: this.state.colorScheme.summer.night });
        }
      }
    } else {
      console.log('winter');
      if (dayOrNight) {
        this.setState({ selectedColors: this.state.colorScheme.winter.day });
      } else {
        this.setState({ selectedColors: this.state.colorScheme.winter.night });
      }
    }

    for (let i = 0; i < dirShort.length; i++) {
      if (i == 0) {
        dirLong = this.windDirection(dirShort.charAt(i));
      } else if (i == 1) {
        dirLong = `${dirLong} - ${this.windDirection(dirShort.charAt(i))}`;
      } else if (i == 2) {
        const temp = this.windDirection(dirShort.charAt(i));
        dirLong = `${dirLong}${temp.toLowerCase()}`;
      }
    }


    setTimeout(() => {
      if (dayOrNight) {
        this.setState({
          headerImage: require('../../assets/day.png'),
          windDirection: dirLong,
          loaded: true
        })
      } else {
        this.setState({
          headerImage: require('../../assets/night.png'),
          windDirection: dirLong,
          loaded: true
        })
      }
    }, 500);
  }


  /**
   * Put in a letter, get a word in return. but the opposite direction.
   * 
   * @param {String} letter - just the letter that needs a explanation
   */
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
      !this.state.loaded ?
        <View style={styles.loadingscreen}>
          <Text style={styles.city}>Aan het laden...</Text>
          <ActivityIndicator size="large" color="#ffffff" style={styles.activity}/>
        </View>
        :
        <LinearGradient
          colors={this.state.selectedColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.background}
        >
          <KeyboardAvoidingView style={styles.loginScreenContainer}>
            <View style={styles.container}>
              <Image style={styles.daytime} source={this.state.headerImage} />
              <Text style={styles.city}>{this.state.weather.city_name}</Text>
              <Text style={styles.text}>{this.state.weather.data[0].temp} °C</Text>
            </View>
            <View style={styles.weatherData}>
              <View style={styles.weatherinfo}>
                <Text style={styles.title}>Kleding</Text>
                {Weather.weatherGrade(this.state.weather.data[0].temp).map(kleding => {
                  return (
                    <Text style={styles.text} key={kleding}>{kleding}</Text>
                  );
                })}
              </View>
              <View style={styles.weatherinfo}>
                <Image style={styles.netherlands} source={require('../../assets/nl.png')} />
                <Image style={[styles.wind, { transform: [{ rotate: `${this.state.weather.data[0].wind_dir}deg` }] }]} source={require('../../assets/winddir.png')} />
                <Text style={styles.text}>{this.state.windDirection} {Math.floor(this.state.weather.data[0].wind_spd * 3.6)} km/h</Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>


    );
  }
}
