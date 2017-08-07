import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import { Card, CardText } from 'material-ui/Card';
import ViewTag from '../components/ViewTag.jsx';

class ViewTagPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
      this.state = {
          tagged :[]
      };
  }

    /*
      loading existing image data

     */

    componentWillMount() {
      var token = Auth.getToken();
      token = token.split(' ')[0];
      //const image_id = encodeURIComponent("38");
      const image_id = encodeURIComponent(this.props.image_id);
        const formData = `image_id=${image_id}`;
        
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/getImageTags');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            const data = xhr.response;
            this.setState({
                tagged: data
            });

        }
    });
//      console.error(formData);
        xhr.send(formData);
  }

    
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */


  /**
   * Render the component.
   */
  render() {
      return ((
          <Card name="container">
            <ViewTag              
              data={this.state.tagged}
            />            
          </Card>
      ));
  }

}

ViewTagPage .contextTypes = {
  router: PropTypes.object.isRequired
};

export default ViewTagPage ;
