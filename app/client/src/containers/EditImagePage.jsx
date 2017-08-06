import React, { PropTypes } from 'react';
import EditImage from '../components/EditImage.jsx';
import Auth from '../modules/Auth';
import { Card, CardTitle, CardText } from 'material-ui/Card';

class EditImagePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      image: {
          url: '',
          caption: '',
          description: '',
          image_id: this.props.params.image_id,
          user_id :''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

    /*
      loading existing image data

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
            var data = xhr.response;
            console.error("xhr.response:");
            console.error(data);
            var image = this.state.image;
            image.url = data.url;
            image.caption = data.caption;
            image.description = data.description;
            image.user_id = data.user_id;
        this.setState({
            image: image
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
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
      const url = encodeURIComponent(this.state.image.url);
      const caption = encodeURIComponent(this.state.image.caption);
      const description = encodeURIComponent(this.state.image.description);
      const image_id = encodeURIComponent(this.state.image.image_id);
      const formData = `url=${url}&caption=${caption}&description=${description}&image_id=${image_id}`;

      var token = Auth.getToken();
      token = token.split(' ')[0];

      
      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/api/editimage');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

          // set a message
          // make a redirect
          console.error("fuewifn: "+this.state.image.user_id );
          this.context.router.replace('/gallery/'+this.state.image.user_id);
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

 
  changeImage(event) {
    const field = event.target.name;
    const image = this.state.image;
    image[field] = event.target.value;

    this.setState({
      image
    });
  }

  /**
   * Render the component.
   */
  render() {
      return ((
          <Card name = "container">            
            <EditImage
              onSubmit={this.processForm}
              onChange={this.changeImage}
              errors={this.state.errors}
              image={this.state.image}
            />
          </Card>
      ));
  }

}

EditImagePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default EditImagePage;
