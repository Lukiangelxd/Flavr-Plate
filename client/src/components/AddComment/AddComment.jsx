import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, TextField, Box } from '@mui/material';
import { AddComment } from '../../utils/mutations';
import './AddComment.css';
import Auth from '../../utils/auth';

const Add_Comment = ({recipeId}) => {
  const [comment, setComment] = useState({ 
    recipeId: '',
    commentText: '' 
  });

  const [newComment, { error, data }] = useMutation(AddComment);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await newComment({
        variables: { ...comment},
      });

      setComment({
        recipeId: '',
        commentText: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>We love hear from you. Please share your thoughts below!</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >

          <div className="col-12 col-lg-3">
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Comment"
                  multiline
                  maxRows={4}
                  onChange={(event) => setComment({ ...comment, commentText: event.target.value })}
                />

              </div>
            </Box>
            <Button>
              Add Comment
            </Button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
          {data && (
            <p>
              Comment successfully added!
          </p>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to add comment. Please{' '}
          <Button href="/login">login</Button> or <Button to="/signup">signup.</Button>
        </p>
      )}
    </div>
  );
};

export default Add_Comment;
