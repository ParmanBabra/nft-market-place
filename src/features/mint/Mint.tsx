import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import StatusRadar from "./StatusRadar";
import CharacterStatusForm from "./CharacterStatusForm";
import Character3DView from "./Character3DView";

import "./Mint.css";
import Button from "@mui/material/Button";

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
            <StatusRadar></StatusRadar>
          </Paper>
        </div>
        <div>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <CharacterStatusForm />
          </Paper>
        </div>
        <div className="grid-buttons">
          <Button variant="contained" size="large" className="button">
            Mint
          </Button>
        </div>
      </div>
    </React.StrictMode>
  );
}
