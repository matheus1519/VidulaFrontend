import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { MdAdd, MdError, MdCheckCircle } from 'react-icons/md';
import { CircularProgressbar } from 'react-circular-progressbar';

import { DropContainer, Container, UploadMessage } from './styles';

export default function Upload({
  nome,
  progresso,
  uploaded,
  error,
  handleFile,
}) {
  function renderDragMessage(isActive, isReject) {
    if (!isActive) {
      return (
        <UploadMessage>
          {!progresso && !error && !uploaded && (
            <MdAdd fill="#0434C4" size={50} />
          )}
        </UploadMessage>
      );
    }
    if (isReject) {
      return <UploadMessage>Arquivo não suportado</UploadMessage>;
    }
    return <UploadMessage>Solte o vídeo aqui</UploadMessage>;
  }

  return (
    <Dropzone accept="video/*" multiple={false} onDropAccepted={handleFile}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
          uploaded={uploaded}
          error={error}
        >
          <input
            disabled={uploaded || error || !!progresso}
            {...getInputProps()}
          />
          {renderDragMessage(isDragActive, isDragReject)}

          {!uploaded && !error && !!progresso && (
            <CircularProgressbar
              styles={{
                root: { width: 40 },
                path: { stroke: '#032791' },
              }}
              strokeWidth={10}
              value={progresso}
            />
          )}
          {uploaded && <MdCheckCircle fill="#EBF2FF" size={48} />}
          {error && <MdError fill="#EBF2FF" size={48} />}
        </DropContainer>
      )}
    </Dropzone>
  );
}
