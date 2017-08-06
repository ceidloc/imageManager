import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';



class ViewTag extends React.Component {        
    
    render() {
        var handleClick = this.props.onSubmit;
        var data = this.props.data.map(function(data, i) {
            return (                                
                    <button key = {i}>{data.tag_name}</button>
            );
        });        

        return (
	    <Card className="container">
	      {data}	      
	    </Card>
	);
    }
}

export default ViewTag;
