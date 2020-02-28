import {blue, red} from '@material-ui/core/colors';
import {Color} from "@material-ui/core";

export interface IMuiPalette {
  primary: Color;
  secondary: Color;
}

export const defaultMuiPalette: IMuiPalette = {
  primary: blue,
  secondary: red
};
