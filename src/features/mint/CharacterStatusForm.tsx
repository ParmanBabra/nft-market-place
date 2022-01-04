import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { UploadFile, Add, Remove } from "@mui/icons-material";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  incrementStrength,
  decrementStrength,
  decrementAgility,
  incrementAgility,
  decrementDexterity,
  incrementDexterity,
  decrementIntelligence,
  incrementIntelligence,
  decrementVitality,
  incrementVitality,
  updateStar,
  updateImageFile,
  updateNormalFile,
  updateChibiFile,
  updateDescription,
  updateName,
  getStatus,
  getStatusPoint,
  getStar,
} from "./MintSlice";

type Props = {
  title: string;
  value?: number;
  onAdd?: () => {};
  onRemove?: () => {};
};

function StatusAttribute({
  title,
  value = undefined,
  onAdd = undefined,
  onRemove = undefined,
}: Props) {
  return (
    <React.Fragment>
      <Grid item sm={2}>
        <Typography component="label" align="center">
          {title}
        </Typography>
      </Grid>
      <Grid item sm={4}>
        <Box
          component="div"
          style={{ border: "1px solid grey", display: "inline-flex" }}
        >
          <Stack direction="row" spacing="1">
            <IconButton aria-label="add" color="primary" onClick={onRemove}>
              <Remove />
            </IconButton>
            <Box component="span" sx={{ p: 1 }}>
              {value}
            </Box>
            <IconButton aria-label="add" color="primary" onClick={onAdd}>
              <Add />
            </IconButton>
          </Stack>
        </Box>
      </Grid>
    </React.Fragment>
  );
}

export default function CharacterStatusForm() {
  const imageInputRef = React.useRef<any>();
  const normalInputRef = React.useRef<any>();
  const chibiInputRef = React.useRef<any>();

  const [imageName, setImageName] = React.useState<string>();
  const [normalName, setNormalName] = React.useState<string>();
  const [chibiName, setChibiName] = React.useState<string>();

  const status = useAppSelector(getStatus);
  const statusPoint = useAppSelector(getStatusPoint);
  const star = useAppSelector(getStar);

  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              onChange={(e) => dispatch(updateName(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              variant="outlined"
              onChange={(e) => dispatch(updateDescription(e.target.value))}
            />
          </Grid>
          <Grid item sm={12}>
            <Input
              inputRef={imageInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={(event) => {
                const target = event.currentTarget as HTMLInputElement;

                if (!target.files) return;

                const file = target.files?.item(0) as File;
                const content = URL.createObjectURL(file);
                dispatch(updateImageFile({ content, fileName: file.name }));
                setImageName(file.name);
              }}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ p: 1, border: "1px solid grey", borderRadius: "3px" }}
            >
              <Typography variant="body2" sx={{ p: 1 }}>
                {imageName ? imageName : "Image"}
              </Typography>
              <IconButton
                edge="end"
                onClick={() => imageInputRef.current.click()}
              >
                <UploadFile />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              inputRef={normalInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={(event) => {
                const target = event.currentTarget as HTMLInputElement;

                if (!target.files) return;

                const file = target.files?.item(0) as File;
                const content = URL.createObjectURL(file);
                dispatch(updateNormalFile({ content, fileName: file.name }));
                setNormalName(file.name);
              }}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ p: 1, border: "1px solid grey", borderRadius: "3px" }}
            >
              <Typography variant="body2" sx={{ p: 1 }}>
                {normalName ? normalName : "Normal Model"}
              </Typography>
              <IconButton
                edge="end"
                onClick={() => normalInputRef.current.click()}
              >
                <UploadFile />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              inputRef={chibiInputRef}
              type="file"
              style={{ display: "none" }}
              onClick={() => chibiInputRef.current.click()}
              onChange={(event) => {
                const target = event.currentTarget as HTMLInputElement;

                if (!target.files) return;

                const file = target.files?.item(0) as File;
                const content = URL.createObjectURL(file);
                dispatch(updateChibiFile({ content, fileName: file.name }));
                setChibiName(file.name);
              }}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ p: 1, border: "1px solid grey", borderRadius: "3px" }}
            >
              <Typography variant="body2" sx={{ p: 1 }}>
                {chibiName ? chibiName : "Chibi Model"}
              </Typography>
              <IconButton
                edge="end"
                onClick={() => chibiInputRef.current.click()}
              >
                <UploadFile />
              </IconButton>
            </Stack>
          </Grid>
          <Divider />
          <Grid item sm={2}>
            <Typography component="label">Stars</Typography>
          </Grid>
          <Grid item sm={10}>
            <Badge color="primary" badgeContent={statusPoint}>
              <Rating
                name="star"
                size="large"
                value={star}
                onChange={(event, value) => {
                  const newValue = value as number;
                  dispatch(updateStar(newValue));
                }}
              />
            </Badge>
          </Grid>

          <StatusAttribute
            title="Strength"
            value={status.strength}
            onAdd={() => dispatch(incrementStrength())}
            onRemove={() => dispatch(decrementStrength())}
          />
          <StatusAttribute
            title="Agility"
            value={status.agility}
            onAdd={() => dispatch(incrementAgility())}
            onRemove={() => dispatch(decrementAgility())}
          />
          <StatusAttribute
            title="Vitality"
            value={status.vitality}
            onAdd={() => dispatch(incrementVitality())}
            onRemove={() => dispatch(decrementVitality())}
          />
          <StatusAttribute
            title="Intelligence"
            value={status.intelligence}
            onAdd={() => dispatch(incrementIntelligence())}
            onRemove={() => dispatch(decrementIntelligence())}
          />
          <StatusAttribute
            title="Dexterity"
            value={status.dexterity}
            onAdd={() => dispatch(incrementDexterity())}
            onRemove={() => dispatch(decrementDexterity())}
          />
        </Grid>
      </Box>
    </React.Fragment>
  );
}
