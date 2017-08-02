
import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';


class Gallery extends React.Component {        
    
    render() {
        var data = this.props.data.map(function(data) {
            return (<Card className="imageRow" key={data.image_id}>
                     <CardTitle title= {data.url}/>
              
                <CardText style={{ fontSize: '16px', color: 'yellow' }}>Caption:{data.caption}</CardText>
                    </Card> );
        });

        return (
	    <Card className="container">	      
	      {data}	      
	    </Card>
	);
    }
}

export default Gallery;
