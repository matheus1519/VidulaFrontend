import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: 20px;
`;

export const Video = styled.div`
  width: 100%;

  > video {
    max-width: 700px;
  }
`;

export const ListVideos = styled.div`
  background: rgba(255, 255, 255, 0.2);

  ul {
    list-style: none;
    padding: 15px 10px;
  }

  border-radius: 4px;
`;
