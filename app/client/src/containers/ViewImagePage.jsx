import React from 'react';
import Auth from '../modules/Auth';
import ViewImage from '../components/ViewImage.jsx';


class ViewImagePage extends React.Component {

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
      //const image_id = encodeURIComponent("38");
      const image_id = encodeURIComponent(this.props.params.image_id);
      const formData = `image_id=${image_id}`;
    
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/viewimage');
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
//      console.error(formData);
    xhr.send(formData);
  }

  /**
   * Render the component.
   */
  render() {
      return ( <ViewImage data={this.state.data}  image_id = {this.props.params.image_id}/>);
  }

}

export default ViewImagePage;
