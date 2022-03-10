import { css, styled } from "goober";

export const WithNavLayout = css`
  display: grid;
  grid-template-columns: 140px 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 0px;
`;

export const WithoutNav = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 16px;
  place-items: left;
`;
