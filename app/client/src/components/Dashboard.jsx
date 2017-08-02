import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';


class Dashboard extends React.Component {        
    
    render() {
        var data = this.props.usersData.map(function(data) {
            return (<Card className="userRow" key={data.user_id}>
                     <CardTitle title= {data.name}/>
              
                <CardText style={{ fontSize: '16px', color: 'green' }}>Images:{data.no_of_images}</CardText>
                    </Card> );
        });

        return (
	    <Card className="container">	      
	      {data}	      
	    </Card>
	);
    }
}

export default Dashboard;
