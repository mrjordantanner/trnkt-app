import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, IconButton, Avatar } from '@mui/material';
import { UpdateUserRequestBody }  from '../models/updateUserRequestBody';
import { useUserService } from '../contexts/UserServiceContext';
//import { User } from '../models/user';

import EditableLabel from '../components/text/EditableLabel';

export default function Profile() {
  const { currentUser, updateUserInfoAsync, getToken } = useUserService();
  const [updatedUserInfoBody, setUpdatedUserInfoBody] = useState<UpdateUserRequestBody>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (currentUser && token) {
      const updatedUserInfo : UpdateUserRequestBody = {
        email: currentUser.email,
        newEmail: undefined,
        newUserName: undefined,
        newPassword: undefined
      }
      setUpdatedUserInfoBody(updatedUserInfo);
      console.log('Profile UpdateUserRequestBody:')
      console.log(updatedUserInfo);
    }
    else {
      navigate('/user/login');
    }
  }, []);

  const handleAvatarClick = () => {
    // TODO Change profile photo
  }

  const onSaveEmail = (newEmail: string) => {
    if (currentUser && newEmail != currentUser.email) {
      const updatedUserInfo : UpdateUserRequestBody = {
        email: currentUser.email,
        newEmail: newEmail
      }
      setUpdatedUserInfoBody(updatedUserInfo);
      console.log('OnSaveEmail: Updated temp user info:', updatedUserInfo);
    }
  };

  const onSaveUserName = (newUserName: string) => {
    if (currentUser && newUserName != currentUser.userName) {
      const updatedUserInfo : UpdateUserRequestBody = {
        email: currentUser.email,
        newUserName: newUserName
      }
      setUpdatedUserInfoBody(updatedUserInfo);
      console.log('OnSaveUserName: Updated temp user info:', updatedUserInfo);
    }
  };

  // const onSavePassword = (newPassword: string) => {
  //   if (currentUser && newPassword != currentUser.password) {
  //     const updatedUserInfo : UpdateUserRequestBody = {
  //       email: currentUser.email,
  //       newPassword: newPassword
  //     }
  //     setUpdatedUserInfoBody(updatedUserInfo);
  //     console.log('OnSavePassword: Updated temp user info:', updatedUserInfo);
  //   }
  // };

  const onApplyChanges = () => {
    if (updatedUserInfoBody) {
      console.log('Applying changes...', updatedUserInfoBody);
      updateUserInfoAsync(updatedUserInfoBody);
    }
  }

  return (
		<Box sx={{ height: '100vh', width: '100vw' }}>
      <Box className='container'>
      <Box className='flex-column-center' 
          sx={{ justifyContent: 'center', height: '100%', bgcolor: 'white' }} >

        <IconButton onClick={handleAvatarClick} sx={{ width: '200px', height: '200px'  }}>
          <Avatar alt="User Profile" src="/"
          sx={{ width: '100%', height: '100%', fontSize: '70px' }}></Avatar>
        </IconButton>

        <Typography variant="h4" sx={{ margin: '15px', color: 'black' }}>{currentUser?.userName}</Typography>

        {/* <Typography sx={{ color: 'gray' }}>{`UserId: ${currentUser?.userId || ''}`}</Typography> */}

        <Box sx={{ p: 4 }}>
          <EditableLabel onSave={onSaveEmail} initialValue={currentUser?.email}>{currentUser?.email}</EditableLabel>
          <EditableLabel onSave={onSaveUserName} initialValue={currentUser?.userName}>{currentUser?.userName}</EditableLabel>
          {/* <EditableLabel onSave={onSavePassword} initialValue={currentUser?.password}>{currentUser?.password}</EditableLabel> */}
        </Box>

        <Button variant='outlined' onClick={onApplyChanges}>
          Save Changes
        </Button>

        </Box>
          {/* <Box>
            <Button onClick={onDeleteAccount}>
              Delete Account
            </Button>
          </Box> */}
        </Box>
      </Box>
	);
}
