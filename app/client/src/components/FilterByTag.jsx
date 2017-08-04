import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class FilterByTag extends React.Component {        
    
    render() {
        return  (
            <Card className="container">
              <form  action = '/' onSubmit={this.props.onSubmit}>
                <h2 className="card-heading">Gallery</h2>
                <div className="field-line">
                  <TextField
                    floatingLabelText="Search Image By Tag"
                    name="name"                    
                    onChange={this.props.onChange}
                    value={this.props.filterTag}
                  />
                </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Search" primary />
      </div>
    </form>
  </Card>
        );
    }
}

export default FilterByTag;




    
    
