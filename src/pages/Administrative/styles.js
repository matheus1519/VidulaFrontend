import styled from 'styled-components';

export const ModalContent = styled.div`
  video {
    width: 500px;
    border-radius: 4px;
  }

  > div {
    padding: 16px 0 32px;
    display: flex;
    align-items: center;

    div {
      margin-left: 16px;

      h3 {
        margin-bottom: 8px;
      }
    }
  }

  ul {
    display: flex;
    justify-content: space-between;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    button:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    button + button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    button[type='primary'] {
      cursor: default;

      :hover {
        background: ${({ theme }) => theme.primary};
        box-shadow: unset;
      }
      :active {
        background: ${({ theme }) => theme.primary};
        border-color: ${({ theme }) => theme.primary};
      }
    }
  }
`;

export const Divider = styled.hr`
  margin: 24px 0 16px;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
