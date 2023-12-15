import styled from "styled-components";

export const AvatarContainer = styled.span<{
  src?: string;
  bigAvatar: boolean;
}>`
  height: 1rem;
  width: ${(props) => (props.bigAvatar ? "3.2rem" : "1.6rem")};
  display: inline-block;
  position: relative;
  &:after {
    content: "";
    display: block;

    position: absolute !important;
    ${(props) =>
      props.bigAvatar
        ? `
      top: -0.9rem;
      width: 3rem !important;
      height: 3rem !important;
    `
        : `
      top: -1px;
      width: 1.5rem !important;
      height: 1.5rem !important;
    `}
    border-radius: 50%;
    background: #e9e9e9 url("${(props) => props.src}");
    background-size: cover;
    background-position: center;
  }
`;

export const PronounContainer = styled.span`
  font-size: small;
  font-weight: normal;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: auto;
  gap: 0px 0px;
  grid-template-areas: "avatar body";
`;

export const Avatar = styled.div<{ src?: string }>`
  grid-area: avatar;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  width: 7rem;
  height: 7rem;
`;

export const Header = styled.div`
  font-size: medium;
  font-weight: bolder;
  margin-bottom: 0.5rem;
`;

export const Body = styled.div`
  grid-area: body;
  margin-left: 1rem;
`;

export const CrewAreas = styled.div`
  font-size: small;
  font-weight: normal;
`;

export const NameWrapper = styled.div<{ inline?: boolean }>`
  white-space: nowrap;
  display: ${(props) => (props.inline ? "inline" : "block")};
`;
