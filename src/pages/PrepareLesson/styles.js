import styled from 'styled-components';

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
