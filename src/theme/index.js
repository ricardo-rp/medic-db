import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme(
  {
    palette: {
      background: {
        dark: colors.grey[200],
        default: colors.common.white,
        paper: colors.common.white
      },
      primary: {
        main: colors.pink[300]
      },
      secondary: {
        main: colors.red.A400
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600]
      }
    },
    shadows,
    typography
  },
  ptBR
);

export default theme;
