import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const AddImage = ({
  onSubmit,
  onChange,
  errors,
    image
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Add Image</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="ImageUrl"
          name="url"
          errorText={errors.url}
          onChange={onChange}
          value={image.url}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Caption"
          name="caption"
          errorText={errors.email}
          onChange={onChange}
          value={image.caption}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Description"
          name="description"
          onChange={onChange}
          errorText={errors.description}
          value={image.description}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Create New Image" primary />
      </div>

    </form>
  </Card>
);

AddImage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired
};

export default AddImage;
