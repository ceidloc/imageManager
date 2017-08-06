import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';
import RaisedButton from 'material-ui/RaisedButton';

class Dashboard extends React.Component {        
    
    render() {
        var data = this.props.data.map(function(data) {
            return (
                <Card className="userRow" key={data.user_id}>
                    <CardTitle title= {data.name}/>
                    <CardText style={{ fontSize: '16px', color: 'green' }}>
                    <Link to = {'/gallery/' + data.user_id} >Images:{data.no_of_images}</Link>
                    </CardText>
                </Card>
            );
        });

        var token = Auth.getToken();
        var hasura_id  = token.split(' ')[1];
        return (
	    <Card className="dashboardContainer">
                <Link to = {'/addimage/' + hasura_id} >
                  Add a new image
                </Link>                  
	      {data}              
	    </Card>
	);
    }
}

export default Dashboard;
