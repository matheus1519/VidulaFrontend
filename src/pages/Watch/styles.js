import styled from 'styled-components';
import hexToRgba from '~/util/hexToRgba';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  h1 {
    color: ${({ theme }) => theme.disabled};
  }
`;

export const Divider = styled.hr`
  margin: 24px 0;
`;

export const Subject = styled.h2`
  margin-bottom: 16px;
`;
export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 376px;
  grid-gap: 64px;
`;

export const MainContent = styled.div``;

export const Video = styled.div`
  video {
    width: 100%;
    border-radius: 4px;
  }
  /* s */
`;

export const Teacher = styled.div`
  display: flex;
  margin: 16px 0 32px;

  div {
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      margin-bottom: 4px;
    }

    small {
      color: ${({ theme }) => theme.disabled};
    }
  }
`;

export const Avatar = styled.img`
  height: 56px;
  border-radius: 50%;
  box-shadow: 0px 0px 4px ${({ theme }) => theme.disabled});
`;

export const Doubts = styled.div`
  h3 {
    margin-bottom: 16px;
  }
`;

export const Doubt = styled.div`
  display: flex;

  > div {
    margin-left: 8px;

    h6 {
      margin-bottom: 8px;
    }
  }
`;

export const DoubtBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px;
  position: relative;

  a {
    height: fit-content;
    position: absolute;
    right: -8px;
    top: -8px;
  }
`;

export const Subjects = styled.div`
  background: ${({ theme }) => theme.backgrounds.secondary};
  box-shadow: inset 0px 0px 5px
    ${({ theme }) => hexToRgba(theme.texts.primary, 0.2)};
  border-radius: 4px;

  height: fit-content;
`;
