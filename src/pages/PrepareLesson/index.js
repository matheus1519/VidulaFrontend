import React, { useCallback, useState } from 'react';
import { Button, MainLayout, Upload } from '~/components';
import history from '~/services/history';

import { Header, Divider, UploadContainer } from './styles';

function PrepareLesson() {
  const [step, setStep] = useState(1);

  const handleUploaded = useCallback(file => {
    console.log(file);
  }, []);

  return (
    <MainLayout>
      <Header>
        <h1>Insira os vídeos</h1>
        <div>
          <Button type="secondary" onClick={() => {}}>
            Preciso de ajuda
          </Button>
          <Button onClick={() => history.push('/detalhes-dos-videos')}>
            Continuar
          </Button>
        </div>
      </Header>
      <Divider />
      {step === 1 && (
        <UploadContainer>
          <Upload
            progress={0}
            error={false}
            uploaded={false}
            // onUpload={file => handleUploaded(file, row, column)}
          />
          <Upload
            progress={0}
            error={false}
            uploaded={false}
            // onUpload={file => handleUploaded(file, row, column)}
          />
          <Upload
            progress={0}
            error={false}
            uploaded={false}
            // onUpload={file => handleUploaded(file, row, column)}
          />
          <Upload
            progress={0}
            error={false}
            uploaded={false}
            // onUpload={file => handleUploaded(file, row, column)}
          />
          <Upload
            progress={0}
            error={false}
            uploaded={false}
            // onUpload={file => handleUploaded(file, row, column)}
          />
          <Upload
            progress={0}
            error={false}
            uploaded={false}
            // onUpload={file => handleUploaded(file, row, column)}
          />
          <Upload
            progress={0}
            error={false}
            uploaded={false}
            // onUpload={file => handleUploaded(file, row, column)}
          />
          <Upload
            progress={0}
            error={false}
            uploaded={false}
            // onUpload={file => handleUploaded(file, row, column)}
          />
          <Upload
            progress={0}
            error={false}
            uploaded={false}
            // onUpload={file => handleUploaded(file, row, column)}
          />
        </UploadContainer>
      )}
      {/* {videos.map((nivel, linha) => (
        <Container key={nivel}>
          {nivel.map((vid, coluna) =>
            vid.valueOf().id === undefined ? (
              <div />
            ) : (
              <ContainerInput key={vid.id}>
                <Upload
                  key={vid.id}
                  progresso={vid.progresso}
                  error={vid.error}
                  uploaded={vid.uploaded}
                  handleFile={file => handleFile(file, linha, coluna)}
                />
              </ContainerInput>
            )
          )}
        </Container>
      ))} */}
    </MainLayout>
  );
}

export default PrepareLesson;
