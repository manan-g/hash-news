import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledDarkButton } from '../components/Button';
import Loader from '../components/Loader';
import { useStateValue } from '../StateProvider';
import StyledInput from '../styled_components/StyledInput';
import StyledLabel from '../styled_components/StyledLabel';

const { create } = require('ipfs-http-client');
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const StyledFileInput = styled.label`
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.darkBlue};
  display: inline-block;
  border: 1px solid;
  border-radius: 2px;
  border-color: ${(props) => props.theme.color.darkBlue};
  padding: 8px;
  cursor: pointer;
  margin: 2px 5px 2px 0px;
  :disabled {
    background-color: ${(props) => props.theme.color.lightBlue};
    border-color: ${(props) => props.theme.color.background};
    cursor: default;
  }
`;

const StyledForm = styled.form`
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  box-shadow: 1px 2px 3px rgb(0 0 0 / 25%);
`;


export default function UploadMedia({ action, _Id, setReload }) {
  const [media, setMedia] = useState();
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(false);
  const [mediaLoading, setMediaLoading] = useState(false);
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
    setMediaLoading(true);
    const file = e.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setMedia({
        buffer: Buffer(reader.result),
        type: file.type !== '' ? file.type : 'none',
        name: file.name,
      });
      setMediaLoading(false);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let _articleCount;
    if (action == 0) {
      _articleCount = await contract.methods.articleCount().call();
    } else {
      _articleCount = await contract.methods.summaryCount().call();
    }

    if (media && _Id >= 0 && _Id < _articleCount) {
      try {
        const uploaded_media = await ipfs.add(media.buffer);
        console.log(uploaded_media.path);
        const _event = await contract.methods
          .uploadMedia(
            action,
            parseInt(_Id),
            uploaded_media.path,
            uploaded_media.size,
            media.type,
            media.name,
            description
          )
          .send({ from: address });
          setReload(prev=>!prev)
        setMedia();
        setDescription();
      } catch (e) {
        setError(e);
      }
    }
    setLoading(false);
  };

  const handleChange = (e, setState) => {
    e.preventDefault();
    setState(e.target.value);
  };

  return (
    <>
      <Loader loading={loading}></Loader>
      {!loading && (
          <StyledForm onSubmit={handleSubmit}>
            <StyledLabel>File Description</StyledLabel>
            <StyledInput
              required
              type="text"
              value={description}
              onChange={(e) => {
                handleChange(e, setDescription);
              }}
            />
            <div
            style={{display:'flex', flexDirection:'row'}}>
            <StyledFileInput>
              Choose File
              <input required hidden type="file" onChange={captureFile} />
          </StyledFileInput>
            <Loader loading={mediaLoading}></Loader>
            <StyledDarkButton disabled={!media} type="submit">
              Submit
            </StyledDarkButton>
            </div>
          </StyledForm>
      )}
    </>
  );
}