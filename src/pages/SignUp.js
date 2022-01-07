import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { StyledOrangeButton } from '../components/Button';
import Loader from '../components/Loader';
import { useStateValue } from '../StateProvider';
import StyledLabel from '../styled_components/StyledLabel';
import StyledInput from '../styled_components/StyledInput';

const StyledSignUp = styled.div`
  display: flex;
  flex-direction: row;
`;
const StyledPhoto = styled.img`
  height: 100vh;
  width: 60vw;
  object-fit: cover;
`;

const StyledForm = styled.form`
  background-color: ${(props) => props.theme.color.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5vw;
  width: -webkit-fill-avialable;
`;

const StyledFileInput = styled.label`
  border-radius: 2px;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  width: fit-content;
  /* align-self: center; */
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.color.white};
  color: #5f6061;
  border: 1px solid ${(props) => props.theme.color.darkGrey};
  border-radius: 3px;
`;

export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [media, setMedia] = useState();
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState('');
  const [
    Loading,
    setLoad,
    error,
    setError,
    show,
    setShow,
    user,
    setUser,
    address,
    setAddress,
    contract,
    setContract,
  ] = useStateValue();

  const captureFile = async (e) => {
    e.preventDefault();
    const _file = e.target.files[0];
    setMedia(_file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address != undefined) {
      if (contract != undefined) {
        setLoading(true);
        try {
          const user = await contract.methods.users(address).call();
          if (user.userId != 0) {
            setError('Current User already Registered!');
            setLoading(false);
          } else {
            // TODO: validate the name and email
            let photo_url = '';
            let formData = new FormData();
            formData.append('file', media);
            formData.append(
              'upload_preset',
              process.env.REACT_APP_UPLOAD_PRESET
            );
            if (media) {
              const data = await axios.post(
                process.env.REACT_APP_CLOUDINARY_URL,
                formData
              );
              photo_url = data.data.secure_url;
            }
            const receipt = await contract.methods
              .login(name, email, about, photo_url)
              .send({
                from: address,
              });
            const _user = await contract.methods.users(address).call();
            setUser(_user);

            window.ethereum.on('accountsChanged', function (accounts) {
              window.location.reload();
            });
            setEmail('');
            setName('');
            setLoading(false);
            // }
          }
        } catch (e) {
          console.log(e);
          setError('Some Error Ocuured');
          setLoading(false);
        }
      } else {
        setError('contract is not deployed to the selected blockchain network');
      }
    } else {
      setError('Blockchain account not found!');
    }
  };

  const handleChange = (e, setState) => {
    setState(e.target.value);
  };

  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <StyledSignUp>
        <div
        style={{width:'40vw'}}
        >
          <StyledForm onSubmit={handleSubmit}>
            <StyledLabel>Address</StyledLabel>
            <StyledInput type="text" value={address} readOnly />
            <StyledLabel>Name</StyledLabel>
            <StyledInput
              type="text"
              required
              placeholder="displayed as auther. Fill carefully, cannot change later"
              value={name}
              onChange={(e) => {
                handleChange(e, setName);
              }}
            />
            <StyledLabel>Email</StyledLabel>
            <StyledInput
              type="email"
              required
              pattern='^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$'
              placeholder="Email to connect with other users"
              value={email}
              onChange={(e) => {
                handleChange(e, setEmail);
              }}
            />
            <StyledLabel>About</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Anything for others to know you."
              value={about}
              onChange={(e) => {
                handleChange(e, setAbout);
              }}
            />
           
            <StyledFileInput>
              Upload Profile Photo
              <input hidden type="file" onChange={captureFile} />
            </StyledFileInput>
            <br />
            <StyledOrangeButton type="submit">Submit</StyledOrangeButton>
          </StyledForm>
          </div>
          {user && (
            <Navigate
              state={{ user: user }}
              to={`/user/${user.userId}/profile`}
            />
          )}
          <StyledPhoto src="/newss.jpg" />
        </StyledSignUp>
      )}
    </>
  );
}
