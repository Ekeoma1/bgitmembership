import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
.text-color{
   color: ${({ theme }) => theme.text_color} !important;
}
.text-color-secondary-bold{
   color: ${({ theme }) => theme.text_color_secondary_bold} !important;
}
.text-color-secondary-normal{
   color: ${({ theme }) => theme.text_color_secondary_normal} !important;
}
.bg-color{
   background-color: ${({ theme }) => theme.bg_color} !important;
}
.bg-color2{
   background-color: ${({ theme }) => theme.bg_color2} !important;
}
.bg-color-card{
   background-color: ${({ theme }) => theme.bg_color_card} !important;
}
.icon-color{
    filter: ${({ theme }) => theme.icon_color} !important;
}
.icon-color2{
    filter: ${({ theme }) => theme.icon_color} !important;
}
`;
export const lightTheme = {
  text_color: '#000',
  text_color_secondary_bold: '#170F49',
  text_color_secondary_normal: '#33246A',
  bg_color: '#FFFFFF',
  bg_color2: '#FBFBFC',
  bg_color_card: '#FFFFFF',
  icon_color:
    'brightness(0) saturate(100%) invert(11%) sepia(6%) saturate(1772%) hue-rotate(173deg) brightness(94%) contrast(95%)',
  icon_color2:
    'invert(100%) sepia(96%) saturate(15%) hue-rotate(212deg) brightness(104%) contrast(104%)',
};
export const darkTheme = {
  text_color: '#FFFFFF',
  text_color_secondary_bold: '#FFFFFF',
  text_color_secondary_normal: '#FFFFFF',
  bg_color: '#1C2127',
  bg_color2: '#0c1421',
  bg_color_card: '#181a1f',
  icon_color:
    'invert(100%) sepia(96%) saturate(15%) hue-rotate(212deg) brightness(104%) contrast(104%)',
  icon_color2:
    'brightness(0) saturate(100%) invert(11%) sepia(6%) saturate(1772%) hue-rotate(173deg) brightness(94%) contrast(95%)',
};
