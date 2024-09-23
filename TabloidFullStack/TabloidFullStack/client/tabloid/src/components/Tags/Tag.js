import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody } from 'reactstrap';

export const Tag = ({tag}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/tag/edit/${tag.id}`)
  }

  const handleDelete = () => {
    navigate(`/tag/delete/${tag.id}`)
  }

  return (
    <Card>
      <CardBody>
        <p>
        {tag.name}
        <Button color="primary" outline size="sm" onClick={handleEdit}>Edit</Button>
        <Button color="success" outline size="sm" onClick={handleDelete}>Delete</Button>
        </p>
        </CardBody>  
    </Card>
  )
}