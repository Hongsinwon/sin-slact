import styled from '@emotion/styled';

export const CollapseButton = styled.button<{ collapse: boolean }>`
  background: transparent;
  border: none;
  width: 26px;
  height: 26px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  margin-left: 10px;
  cursor: pointer;

  ${({ collapse }) =>
    collapse &&
    `
    & i {
      transform: none;
    }
  `};

  & .c-icon--caret-right:before {
    content: '\E272';
  }

  & .c-icon--inline:after {
    content: '\200B';
  }

  & .c-icon:before {
    display: inline-block;
    font-family: Slack v2;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
  }

  & .c-icon--inline:before {
    height: 1em;
    left: 50%;
    margin-left: -0.5em;
    margin-top: -0.5em;
    position: absolute;
    top: 50%;
    width: 1em;
  }
`;
