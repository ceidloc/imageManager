import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText,CardMedia } from 'material-ui/Card';
import Auth from '../modules/Auth';
import { Link } from 'react-router';
import ViewTagPage from '../containers/ViewTagPage.jsx';
import RaisedButton from 'material-ui/RaisedButton';

class ViewImage extends React.Component {        
    
    render() {
        var token = Auth.getToken();
        var hasura_id  = token.split(' ')[1];
        return (
            <Card className="imageContainer">
              <CardTitle title= {"Caption: "+this.props.data.caption}/>              
              <ViewTagPage data={this.props.data} image_id = {this.props.image_id}/>
              <CardText style={{ fontSize: '16px', color: 'green' }}>                
                Description:{this.props.data.description} 
              </CardText>
              <CardMedia >
		<img src={this.props.data.url} /> 
	      </CardMedia>
              <hr/>
               {Auth.isUserAuthenticated() && this.props.data.user_id == hasura_id ?                  
                  (              <div className="addButton">
                                       <Link to = {'/editimage/' + this.props.data.image_id} >
                                             <RaisedButton primary label = "edit"/>
                                           </Link>
                                     <br/>
                                         <Link to = {'/deleteimage/' +hasura_id +'/' +this.props.data.image_id}>
                                               <RaisedButton secondary label = "delete"/>
                                             </Link>
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
