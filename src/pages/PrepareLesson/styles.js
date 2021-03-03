import styled from 'styled-components';

export const ModalContent = styled.div`
  div {
    background: ${({ theme }) => theme.texts.primary};
    padding: 24px 24px 24px 16px;
    margin: 16px 0;
    border-radius: 4px;
    box-shadow: inset 0px 0px 10px 1px rgba(0, 0, 64, 1);

    img {
      width: 100%;
    }
  }

  p + p {
    margin-top: 16px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
  }

  button + button {
    margin-left: 16px;
  }
`;

export const Divider = styled.hr`
  margin: 24px 0 16px;
`;

export const UploadContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 32px;
  justify-items: center;
  margin-bottom: 64px;
`;
