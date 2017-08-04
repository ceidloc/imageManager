import React from 'react';
import Auth from '../modules/Auth';
import Gallery from '../components/Gallery.jsx';
import FilterByTag from '../components/FilterByTag.jsx';
import { Card } from 'material-ui/Card';

class GalleryPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
        data: [],
        filterTag:''
    };
      this.filterByTag = this.filterByTag.bind(this);
      this.changeTag = this.changeTag.bind(this);
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

    filterByTag(event) {

        event.preventDefault();

      var token = Auth.getToken();
      token = token.split(' ')[0];
      //const user_id = encodeURIComponent("38");
        const user_id = encodeURIComponent(this.props.params.user_id);
        const tag_name = encodeURIComponent(this.state.filterTag);
        const formData = `user_id=${user_id}&tag_name=${tag_name}`;
    
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/filterByTag');
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

    changeTag(event) {
        const field = event.target.name;
        const tag  = event.target.value;

        this.setState({
            filterTag: tag
        });
    }

  /**
   * Render the component.
   */
  render() {
      return ((
          <Card className="container">
            <FilterByTag
              filterTag = {this.state.filterTag}
              onChange = {this.changeTag}
              onSubmit = {this.filterByTag}
            />
            <Gallery data={this.state.data}  user_id = {this.props.params.user_id}/>
          </Card>
      ));
  }

}

export default GalleryPage;
