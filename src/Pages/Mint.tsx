import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import StatusRadar from "./../Components/StatusRadar";
import CharacterStatusForm from "./../Components/CharacterStatusForm";
import Character3DView from "../Components/Character3DView";

import "./Mint.css";
import Button from "@mui/material/Button";

const data: any = [
  {
    status: "Strength",
    value: 7,
  },
  {
    status: "Agility",
    value: 10,
  },
  {
    status: "Vitality",
    value: 6,
  },
  {
    status: "Intelligence",
    value: 5,
  },
  {
    status: "Dexterity",
    value: 2,
  },
];

export default function Maketplace() {
  return (
    <React.StrictMode>
      <Typography component="h1" variant="h2" align="center" gutterBottom>
        Character Infomation
      </Typography>
      <div className="container">
        <div className="model-view">
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Character3DView />
          </Paper>
        </div>
        <div>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 500,
            }}
          >
            <StatusRadar data={data} />
          </Paper>
        </div>
        <div>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <CharacterStatusForm />
          </Paper>
        </div>
        <div className="grid-buttons">
          <Button variant="contained" size="large" className="button">Mint</Button>
        </div>
      </div>
    </React.StrictMode>
  );
}
