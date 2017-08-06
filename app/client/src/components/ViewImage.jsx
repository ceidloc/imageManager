import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText,CardMedia } from 'material-ui/Card';
import Auth from '../modules/Auth';
import { Link } from 'react-router';


class ViewImage extends React.Component {        
    
    render() {
        console.error(this.props.data);
        var token = Auth.getToken();
        var hasura_id  = token.split(' ')[1];
        return (
            <Card className="container">
              <CardTitle title= {this.props.data.caption}/>              
              <CardMedia >
		<img src={this.props.data.url} />						
	      </CardMedia>
              <CardText style={{ fontSize: '16px', color: 'green' }}>                
                {this.props.data.description} 
              </CardText>
               {Auth.isUserAuthenticated() && this.props.data.user_id == hasura_id ?                  
                  (              <div className="addButton">
                                 <Link to = {'/editimage/' + this.props.data.image_id} >edit</Link>
                                     <br/>
                                  <Link to = {'/deleteimage/' +hasura_id +'/' +this.props.data.image_id} >delete</Link>
                                 </div>
                  )
               :(
                   <div className="addButton">
                   </div>
               )
              }
            </Card>
	);
    }
}

export default ViewImage;
