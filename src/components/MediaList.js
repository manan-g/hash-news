import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import Files from './Files';
import Chevron from './Chevron';
import { Link } from 'react-router-dom';
import { StyledDarkButton } from './Button';
import UploadMedia from '../pages/UploadMedia';

const StyledAccordion = styled.div`
  margin: 10px 0px;
  width: 98%;
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.p`
  font-size: 14px;
  text-align: left;
`;

const StyledContent = styled.div`
  overflow: hidden;
  transition: max-height 0.6s ease;
`;
const StyledAccordionButton = styled.div`
  color: ${(props) => props.theme.color.dullBlue};
  background-color: ${(props) => props.theme.color.lightBlue};
  border-color: ${(props) => props.theme.color.dullBlue};
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
  /* padding: 18px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 18px;
  align-items: center;
  transition: background-color 0.6s ease;
`;

export default function MediaList({ id, action, auther }) {
  const [files, setFiles] = useState();
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState('0px');
  const [uploadActive, setUploadActive] = useState(false);
  const [uploadHeight, setUploadHeight] = useState('0px');
  const [reload, setReload] = useState(false);
  const content = useRef(null);
  const uploadContent = useRef(null);
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

  function toggleAccordion() {
    setActive(!active);
  }
  function toggleUpload() {
    setUploadActive(!uploadActive);
  }

  useEffect(() => {
    setHeight(!active ? '0px' : `${content.current.scrollHeight}px`);
  }, [active]);

  useEffect(() => {
    setUploadHeight(
      !uploadActive ? '0px' : `${uploadContent.current.scrollHeight}px`
    );
  }, [uploadActive]);

  useEffect(() => {
    if (contract) {
      const runAsync = async () => {
        try {
          const _files = await contract.methods.getFiles(action, id).call();
          setFiles(_files);
          if (active) setHeight(`${content.current.scrollHeight}px`);
        } catch (e) {
          setError(e);
        }
      };
      runAsync();
    }
    return () => {};
  }, [contract, reload]);

  return (
    <>
      <StyledAccordion>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <StyledAccordionButton active={active} onClick={toggleAccordion}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Chevron rotate={active} width={10} fill={'#777'} />
              <StyledTitle>Media Files</StyledTitle>
            </div>
          </StyledAccordionButton>
          {/* {user && auther == address && ( */}
          <StyledDarkButton
            disabled={!(auther == address)}
            onClick={toggleUpload}
          >
            Upload Media
          </StyledDarkButton>
          {/* )} */}
        </div>
        <StyledContent ref={content} style={{ maxHeight: `${height}` }}>
          <div style={{ margin: '10px' }}>
            {files &&
              files.map((file, index) => (
                <Files
                  key={index}
                  fileHash={file.fileHash}
                  fileType={file.fileType}
                  fileName={file.fileName}
                  fileDescription={file.fileDescription}
                  uploadTime={file.uploadTime}
                  uploader={file.uploader}
                ></Files>
              ))}
          </div>
        </StyledContent>
      </StyledAccordion>
      <div
        ref={uploadContent}
        style={{
          width: '98%',
          maxHeight: `${uploadHeight}`,
          overflow: 'hidden',
          transition: 'max-height 0.6s ease',
        }}
      >
        <UploadMedia _Id={id} action={action} setReload={setReload} />
      </div>
    </>
  );
}
