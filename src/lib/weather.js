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
}

export default new Weather();
