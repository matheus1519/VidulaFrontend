import React, { useCallback } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useDropzone } from 'react-dropzone';
import { BiCheckCircle } from 'react-icons/bi';
import { MdAddCircleOutline, MdErrorOutline } from 'react-icons/md';

import { Container, Message } from './styles';

function Upload({ progress, uploaded, error, onUpload, style }) {
  const onDrop = useCallback(acceptedFiles => {
    return onUpload(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDropAccepted: onDrop, accept: 'video/*' });

  // onDropAccepted: handleFile,

  function renderDragInfo() {
    if (isDragReject) {
      return <Message>Formato não suportado</Message>;
    }

    if (isDragActive) {
      return <Message>Solte o vídeo aqui</Message>;
    }

    if (uploaded) {
      return <BiCheckCircle size={64} />;
    }

    if (progress) {
      return (
        <CircularProgressbar
          styles={{
            root: { width: 54 },
            path: { stroke: '#032791' },
          }}
          strokeWidth={10}
          value={progress}
        />
      );
    }

    if (error) {
      return <MdErrorOutline size={64} />;
    }

    return <MdAddCircleOutline size={64} />;
  }

  return (
    <Container
      isDragActive={isDragActive}
      isDragReject={isDragReject}
      uploaded={uploaded}
      error={error}
      multiple={false}
      {...getRootProps({ className: 'dropzone' })}
      style={style}
    >
      <input
        disabled={uploaded || error || !!progress}
        {...getInputProps({ multiple: false })}
      />
      {renderDragInfo()}
    </Container>
  );
}

export default Upload;
