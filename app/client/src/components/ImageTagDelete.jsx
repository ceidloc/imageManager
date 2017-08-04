import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';



class ImageTagDelete extends React.Component {        
    
    render() {
        var data = this.props.data.map(function(data, i) {
            return (
                <Card className="userRow" key={i}>
                    <CardText style={{ fontSize: '16px', color: 'green' }}>
                      <button onClick = {this.props.onSubmit(data)}>{data}</button>
                    </CardText>
                </Card>
            );
        });

        return (
	    <Card className="container">	      
	      {data}	      
	    </Card>
	);
    }
}

export default ImageTagDelete;
