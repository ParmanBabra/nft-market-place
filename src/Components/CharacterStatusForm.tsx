import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import Badge from "@mui/material/Badge";
import Divider from '@mui/material/Divider';
import UploadFile from "@mui/icons-material/UploadFile";

type Props = {
  title: string;
};

function StatusSlider({ title }: Props) {
  return (
    <React.Fragment>
      <Grid item sm={2}>
        <Typography component="label">{title}</Typography>
      </Grid>
      <Grid item sm={10}>
        <Slider
          aria-label="{title}"
          defaultValue={0}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />
      </Grid>
    </React.Fragment>
  );
}

export default function CharacterStatusForm() {
  return (
    <React.Fragment>
      <Box component="form" noValidate sx={{ mt: 3 }}>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Input type="file" style={{ display: "none" }} />
            <TextField
              name="normalModel"
              required
              fullWidth
              id="normalModelUpload"
              label="Normal Model"
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <UploadFile />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input type="file" style={{ display: "none" }} />
            <TextField
              name="chibiModel"
              required
              fullWidth
              id="chibiModelUpload"
              label="Chibi Model"
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <UploadFile />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Divider />
          <Grid item sm={2}>
            <Typography component="label">Stars</Typography>
          </Grid>
          <Grid item sm={10}>
            <Badge color="primary" badgeContent={10}>
              <Rating name="star" size="large" />
            </Badge>
          </Grid>

          <StatusSlider title="Strength" />
          <StatusSlider title="Agility" />
          <StatusSlider title="Vitality" />
          <StatusSlider title="Intelligence" />
          <StatusSlider title="Dexterity" />
        </Grid>
      </Box>
    </React.Fragment>
  );
}
