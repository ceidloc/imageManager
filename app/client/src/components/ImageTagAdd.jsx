import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';



class ImageTagAdd extends React.Component {        


    
    render() {
         function changeTags(tag_name){
                this.props.onSubmit(tag_name);
         };
        
        var data = this.props.data.map(function(data, i) {
            return (
                <Card className="userRow" key={i}>
                    <CardText style={{ fontSize: '16px', color: 'green' }}>
                      <button onClick = {changeTags(data.tag_name)}>{data.tag_name}</button>
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

export default ImageTagAdd;
