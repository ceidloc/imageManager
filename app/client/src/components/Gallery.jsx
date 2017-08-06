import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import Auth from '../modules/Auth';
import { Link } from 'react-router';


class Gallery extends React.Component {        
    
    render() {
        var data = this.props.data.map(function(data) {
            return (
                <div className="imageRow" key={data.image_id}>
                  <CardText style={{ fontSize: '16px', color: 'white' }}>Caption: {data.caption}</CardText>
                  <Link to = {'/viewimage/' + data.image_id} >
                    <CardMedia >                      
		      <img src={data.url}/>
	            </CardMedia>
                  </Link>
                </div>
            );
        });

        var token = Auth.getToken();
        var hasura_id  = token.split(' ')[1];
        return (
            <div className="galleryContainer">           
              {Auth.isUserAuthenticated() && this.props.user_id === hasura_id ?                  
                  (              <div className="addButton">
                                 <Link to = {'/addimage/' + hasura_id} >Add</Link>
                                 </div>
                  )
               :(
                   <div className="addButton">               
                   </div>
               )
              }
                
	        {data}
	    </div>
	);
    }
}

export default Gallery;
