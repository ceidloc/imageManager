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

    componentWillMount() {
        console.error("in will mount");
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

    componentDidMount() {
        console.error("in did mount");
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
            const data = xhr.response;
            // adding tags from data which are not in tagged
            var tagged = this.state.tagged;
            var untagged = new Array();
            for(var i = 0; i < data.length; i++) {
                var count = 0;
                for(var j = 0; j < tagged.length; j++) {
                    if (tagged[j].tag_name === data[i].tag_name) {
                        count++;
                    }                        
                }
                if (count === 0){
                    untagged = [...untagged,{"tag_name":data[i].tag_name}];
                }
            }
            
            this.setState({
                untagged:[ ...untagged]
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
    addTag(tagName) {
    // prevent default action. in this case, action is the form submission event
        //event.preventDefault();

    // create a string for an HTTP body message
        //const image_id = encodeURIComponent(this.state.image_id);
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
          // change the component-container state
          var newTag = {"tag_name":tag_name};
          var tagged = this.state.tagged;
          tagged = [...tagged,newTag];
          var data = this.state.untagged;
          //removing this tag from untagged array
          var untagged = [];
          for(var i = 0; i < data.length; i++) {
              if (newTag.tag_name === data[i].tag_name) {
                  ;
              }
              else{
                  untagged = [...untagged,{"tag_name": data[i].tag_name}];
              }
          }
          
          this.setState({              
              tagged : [...tagged],
              untagged : [...untagged]
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

    deleteTag(tagName) {
    // prevent default action. in this case, action is the form submission event
        //event.preventDefault();
        
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
          console.error("in delete tag: "+ xhr.response );
          // change the component-container state
          var newTag = {"tag_name":tag_name};
          var untagged = this.state.untagged;
          untagged = [...untagged,newTag];
          var data = this.state.tagged;
          //removing this tag from untagged array
          
          var tagged = [];
          for(var i = 0; i < data.length; i++) {
              if (newTag.tag_name === data[i].tag_name) {
                  ;
              }
              else{
                  tagged = [...tagged,{"tag_name": data[i].tag_name}];
              }
          }
          
          this.setState({              
              tagged : [...tagged],
              untagged : [...untagged]
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
