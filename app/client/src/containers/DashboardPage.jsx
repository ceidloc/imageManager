import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
        data: []
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
      var token = Auth.getToken();
    token = token.split(' ')[0];
    
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          data: xhr.response
        });
      }
    });
    xhr.send();
  }

  /**
   * Render the component.
   */
  render() {
    return (<Dashboard data={this.state.data} />);
  }

}

export default DashboardPage;
