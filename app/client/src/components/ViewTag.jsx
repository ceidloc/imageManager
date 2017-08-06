import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class ViewTag extends React.Component {        
    
    render() {
        var handleClick = this.props.onSubmit;
        var data = this.props.data.map(function(data, i) {
            return (                                
                    <RaisedButton key = {i}>{data.tag_name}</RaisedButton>
            );
        });        

        return (
	    <Card className="container">
              <CardText><RaisedButton primary>Tags:</RaisedButton>
	        {data}
              </CardText>
	    </Card>
	);
    }
}

export default ViewTag;
