import React, { useState,useRef } from 'react';
import { useStateValue } from '../StateProvider';
import StyledInput from '../styled_components/StyledInput';
import { StyledDarkButton } from './Button';
import CrossIcon from './CrossIcon';
import EditIcon from './EditIcon';

export default function AdditionalInfo({ id, auther, additionalNewInfo }) {
  const [newInfo, setNewInfo] = useState(additionalNewInfo);
  const [updateInfo, setUpdateInfo] = useState(true);
  let ref = useRef(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract) {
      try {
        await contract.methods.additionalNewInfo(newInfo, id).send({
          from: address,
        });
        setUpdateInfo(true);
      } catch (e) {
        setError(e);
      }
    }
  };

  const handleClick = (e) => {
    setUpdateInfo((prev) => !prev)
    if(updateInfo)
    {
      ref.current.focus();
    }
  };

  return (
    <div>
      <div style={{ marginTop: '10px', marginBottom: '2px' }}>
        Additional Info {}
        {user && auther == address && (
          <div style={{display:'inline'}}>
            {updateInfo ? (
              <EditIcon height="15px" width="15px" handleClick={handleClick} />
            ) : (
              <CrossIcon height="15px" width="15px" handleClick={handleClick} />
            )}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          value={newInfo}
          readOnly={updateInfo}
          onChange={(e) => setNewInfo(e.target.value)}
          ref={ref}
        />
        {!updateInfo && (
          <StyledDarkButton type="submit">Submit</StyledDarkButton>
        )}
      </form>
    </div>
  );
}
