import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


class ImageTagAdd extends React.Component {        
    
    render() {
        var handleClick = this.props.onSubmit;
        var data = this.props.data.map(function(data, i) {
            return (                                
                    <RaisedButton onClick = {(e)=>handleClick(data.tag_name)} key = {i}>{data.tag_name}</RaisedButton>
            );
        });        

        return (
	    <Card className="container">
	      {data}	      
	    </Card>
	);
    }
}

export default ImageTagAdd;
