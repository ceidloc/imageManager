import React, { PropTypes } from 'react';
import EditImage from '../components/EditImage.jsx';
import ImageTagEdit from '../containers/ImageTagEdit.jsx';
import Auth from '../modules/Auth';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router';

class DeleteImage extends React.Component {

    componentDidMount() {
      var token = Auth.getToken();
      token = token.split(' ')[0];
      //const image_id = encodeURIComponent("38");
      const image_id = encodeURIComponent(this.props.params.image_id);
      const formData = `image_id=${image_id}`;
    
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/deleteimage');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var data = xhr.response;
        }
    });
//      console.error(formData);
    xhr.send(formData);
  }
       
  render() {
      return (
          <Card className = "container">
            <CardText>Image successfully deleted!! </CardText>
            <Link to = {'/gallery/' + this.props.params.user_id} >Go Back!</Link>
          </Card>
      );
  }

}

DeleteImage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DeleteImage;
