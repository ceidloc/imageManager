import React, { PropTypes } from 'react';
import AddImage from '../components/AddImage.jsx';
import Auth from '../modules/Auth';

class AddImagePage extends React.Component {

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
          user_id: this.props.params.user_id
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeImage = this.changeImage.bind(this);
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
      const user_id = encodeURIComponent(this.state.image.user_id);
      const formData = `url=${url}&caption=${caption}&description=${description}&user_id=${user_id}`;

      var token = Auth.getToken();
      token = token.split(' ')[0];

      
      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/api/addimage');
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
    return (
      <AddImage
        onSubmit={this.processForm}
        onChange={this.changeImage}
        errors={this.state.errors}
        image={this.state.image}
      />
    );
  }

}

AddImagePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default AddImagePage;
