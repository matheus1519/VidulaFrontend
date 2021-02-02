import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 64px;

  h3 {
    margin-bottom: 16px;
  }
`;

export const Doubt = styled.div`
  display: flex;

  b + & {
    margin-top: 8px;
  }

  & + & {
    margin-top: 16px;
  }

  > div {
    margin-left: 8px;

    h6 {
      margin-bottom: 8px;
      position: relative;

      small {
        position: absolute;
        right: 8px;
        color: ${({ theme }) => theme.disabled};
      }
    }
  }
`;

export const DoubtBody = styled.div`
  display: grid;
  grid-template-columns: ${({ teacher }) => (teacher ? '1fr' : '1fr 100px')};
  position: relative;

  b {
    position: absolute;
    right: -8px;
    top: -8px;
  }

  > div {
    position: relative;
    margin-left: auto;

    > div {
      position: absolute;
      right: -8px;
      top: -8px;
    }
  }
`;

export const TakeDoubt = styled.div`
  display: flex;
  width: 100%;
  margin-top: 16px;

  div {
    margin-left: 8px;
    width: 100%;
    display: flex;
    flex-direction: column;

    button {
      margin-top: 8px;
    }
  }
`;
