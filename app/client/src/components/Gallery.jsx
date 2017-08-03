import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';
import { Link } from 'react-router';


class Gallery extends React.Component {        
    
    render() {
        var data = this.props.data.map(function(data) {
            return (<Card className="imageRow" key={data.image_id}>
                     <CardTitle title= {data.url}/>
              
                <CardText style={{ fontSize: '16px', color: 'yellow' }}>Caption:{data.caption}</CardText>
                    </Card> );
        });

        var token = Auth.getToken();
        var hasura_id  = token.split(' ')[1];
        return (
            <Card className="container">           
              {Auth.isUserAuthenticated() && this.props.user_id === hasura_id ?                  
                  (              <div className="addButton">
                                 <Link to = {'/addimage/' + hasura_id} >Add</Link>
                                 </div>
                  )
               :(
                   <div className="addButton">
                     not your gallery
                   </div>)
              }
                
	        {data}
	    </Card>
	);
    }
}

export default Gallery;
