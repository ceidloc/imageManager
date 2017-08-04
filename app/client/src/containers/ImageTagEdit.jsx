import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import { Card, CardText } from 'material-ui/Card';
import ImageTagAdd from '../components/ImageTagAdd.jsx';
import ImageTagDelete from '../components/ImageTagDelete.jsx';

class ImageTagEdit extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
      this.state = {
          tagged :[],
          untagged :[]
      };

    this.addTag = this.addTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
  }

    /*
      loading existing image data

     */

    componentDidMount() {
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
            var data = xhr.response;
            console.error("xhr.response:");
            this.setState({
                tagged: data
            });
        }
    });
//      console.error(formData);
        xhr.send(formData);
  }

    componentWillMount() {
      var token = Auth.getToken();
      token = token.split(' ')[0];
      //const image_id = encodeURIComponent("38");
      const image_id = encodeURIComponent(this.props.image_id);
      const formData = `image_id=${image_id}`;
    
    const xhr = new XMLHttpRequest();            
    xhr.open('post', '/api/getAllTags');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            var data = xhr.response;
            console.error("xhr.response:");
            this.setState({
                untagged: data
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
    addTag(event, tagName) {
    // prevent default action. in this case, action is the form submission event
        event.preventDefault();

    // create a string for an HTTP body message
        const image_id = encodeURIComponent(this.props.image_id);
        const tag_name = encodeURIComponent(tagName);
        const formData = `image_id=${image_id}&tag_name=${tag_name}`;

      var token = Auth.getToken();
      token = token.split(' ')[0];

      
      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/api/addImageTag');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
          console.error("in add tag: "+ xhr.response );
        // change the component-container state
        this.setState({
            untagged : xhr.response
        });

          // set a message
          // make a redirect
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
          errors.summary = xhr.response.message;
          console.error("in add tag ERRORS: "+ errors );
      }
    });
    xhr.send(formData);
  };

    deleteTag(event, tagName) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
        const image_id = encodeURIComponent(this.props.image_id);
        const tag_name = encodeURIComponent(tagName);
        const formData = `image_id=${image_id}&tag_name=${tag_name}`;

      var token = Auth.getToken();
      token = token.split(' ')[0];

      
      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/api/deleteImageTag');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
          console.error("in add tag: "+ xhr.response );
        // change the component-container state
        this.setState({
            tagged : xhr.response
        });

          // set a message
          // make a redirect
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
          errors.summary = xhr.response.message;
          console.error("in add tag ERRORS: "+ errors );
      }
    });
    xhr.send(formData);
  };

    

  /**
   * Render the component.
   */
  render() {
      return ((
          <Card name="container">
            <ImageTagAdd
              onSubmit={this.deleteTag}
              data={this.state.tagged}
            />
            <ImageTagAdd
              onSubmit={this.addTag}
              data={this.state.untagged}
            />
          </Card>
      ));
  }

}

ImageTagEdit .contextTypes = {
  router: PropTypes.object.isRequired
};

export default ImageTagEdit ;
