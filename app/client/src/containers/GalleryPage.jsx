import React from 'react';
import Auth from '../modules/Auth';
import Gallery from '../components/Gallery.jsx';


class GalleryPage extends React.Component {

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
      //const user_id = encodeURIComponent("38");
      const user_id = encodeURIComponent(this.props.params.user_id);
      const formData = `user_id=${user_id}`;
    
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/gallery');
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
    return (<Gallery data={this.state.data} />);
  }

}

export default GalleryPage;
