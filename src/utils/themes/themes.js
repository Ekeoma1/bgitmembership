import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
.card-body{
   color: ${({ theme }) => theme.card_body_color} !important;
   background-color: ${({ theme }) => theme.card_body_bg_color} !important;
}
.text-color{
   color: ${({ theme }) => theme.card_body_color} !important;
}
.icon-color{
    filter: ${({ theme }) => theme.icon_color} !important;
}
.icon-color2{
    filter: ${({ theme }) => theme.icon_color} !important;
}
`;
export const lightTheme = {
  card_body_color: '#1C2127',
  card_body_bg_color: '#ffffff',
  icon_color:
    'brightness(0) saturate(100%) invert(11%) sepia(6%) saturate(1772%) hue-rotate(173deg) brightness(94%) contrast(95%)',
  icon_color2:
    'invert(100%) sepia(96%) saturate(15%) hue-rotate(212deg) brightness(104%) contrast(104%)',
};
export const darkTheme = {
  card_body_color: '#ffffff',
  card_body_bg_color: '#2b3452',
  icon_color:
    'invert(100%) sepia(96%) saturate(15%) hue-rotate(212deg) brightness(104%) contrast(104%)',
  icon_color2:
    'brightness(0) saturate(100%) invert(11%) sepia(6%) saturate(1772%) hue-rotate(173deg) brightness(94%) contrast(95%)',
};
