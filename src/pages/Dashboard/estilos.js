import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 250px;
  grid-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 576px) {
    font-size: 12pt;
  }
`;

export const Video = styled.div`
  width: 100%;

  video {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }

  > button {
    height: auto;
  }
`;

export const ListVideos = styled.div`
  background: #ebf2ff44;

  ul {
    list-style: none;
    padding: 15px 0px;

    li {
      padding: 5px 10px;
    }
    li:hover {
      background: #ebf2ff;
      color: #01103b;
      cursor: pointer;
    }
  }

  border-radius: 4px;
`;
