import Api from './api'

/**
 * Manager class for authorization that can open the api key request url
 */
class Weather {
  /**
   * Retrieve api url.
   * @returns {String} - API URL
   * @version 1.0.0
   */
  get apiUrl() {
    return 'https://api.weatherbit.io/';
  }

  async getForecast(handleError, callback) {

    fetch(`${this.apiUrl}/v2.0/forecast/daily?city=Neede&country=NL&days=1&key=${Api.api}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        callback(data);
      })
      .catch(error => {
        if (handleError) {
          handleError(error);
        }
      });
  }


  weatherGrade(temp){
    let clothing = [];

    // 1
    if(temp > 18){
      clothing.push('Kortebroek');
      clothing.push('Zomershirt');
      clothing.push('Zweetshirt');

    } else if (temp > 15 && temp < 18 ){
      clothing.push('Kortebroek');
      clothing.push('Zomershirt');
      clothing.push('Zweetshirt');
      clothing.push('Arm/knie warmers');

    } else if (temp > 10 && temp < 15){
      clothing.push('Kortebroek');
      clothing.push('Wintershirt');
      clothing.push('Zweetshirt');
      clothing.push('Arm/knie warmers');

    } else if (temp > 5 && temp < 10){
      clothing.push('Langebroek');
      clothing.push('Wintershirt');
      clothing.push('Windstopper');
      clothing.push('Zweetshirt');
      clothing.push('Handschoenen');
      clothing.push('Overschoenen');

    } else if (temp > 0 && temp < 5){
      clothing.push('Langebroek');
      clothing.push('Wintershirt');
      clothing.push('Windstopper');
      clothing.push('Ondershirt');
      clothing.push('Handschoenen');
      clothing.push('Overschoenen');
      clothing.push('Muts');

    } else if (temp < 0){
      grade += 0
      clothing.push('Langebroek');
      clothing.push('Fietsjas');
      clothing.push('Fleece Ondershirt');
      clothing.push('Handschoenen');
      clothing.push('Overschoenen');
      clothing.push('Muts');
    }

    return clothing;
  }
}

export default new Weather();
