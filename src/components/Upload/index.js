import React from 'react';
import Dropzone from 'react-dropzone';
import { MdAdd, MdError, MdCheckCircle } from 'react-icons/md';
import { CircularProgressbar } from 'react-circular-progressbar';

import { DropContainer, UploadMessage } from './styles';

export default function Upload({ onUpload, video }) {
  function renderDragMessage(isActive, isReject) {
    if (!isActive) {
      return (
        <UploadMessage>
          {!video.progress && <MdAdd fill="#0434C4" size={50} />}
        </UploadMessage>
      );
    }
    if (isReject) {
      return <UploadMessage>Arquivo não suportado</UploadMessage>;
    }
    return <UploadMessage>Solte o vídeo aqui</UploadMessage>;
  }

  return (
    <Dropzone accept="video/*" onDropAccepted={onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}

          <div>
            {!video.uploaded && !video.error && !video && (
              <CircularProgressbar
                styles={{
                  root: { width: 40 },
                  path: { stroke: '#032791' },
                }}
                strokeWidth={10}
                value={video.progress}
              />
            )}

            {video.uploaded && <MdCheckCircle size={48} cor="#75ff75" />}
            {video.error && <MdError size={48} cor="#ff7575" />}
          </div>
        </DropContainer>
      )}
    </Dropzone>
  );
}
