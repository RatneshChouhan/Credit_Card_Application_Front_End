import { Button, Grid, Typography } from "@material-ui/core";
import { TextField } from "@mui/material";
import { useState } from "react";
import { CreditCardList } from "./CreditCardList";

export const AddCreditCard = () => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardLimit, setCardLimit] = useState("");
  const [message, setMessage] = useState("");
  const [reLoad, setReLoad] = useState(false);
  const handleClick = async () => {
    await fetch("http://localhost:9091/v1/cards", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        cardNumber,
        cardLimit,
      }),
    })
      .then(() => {
        setMessage("User created successfully");
        setName('');
        setCardLimit('');
        setCardNumber('');
        setReLoad(true);
      })
      .catch(() => {
        setMessage("Some error ocurred");
        setName('');
        setCardLimit('');
        setCardNumber('');
      });
  };
  return (
    <>
      <Grid style={{ padding: 5 }}>
        <Typography variant="body1">Add Card Details</Typography>
      </Grid>
      <Grid container justify="center" direction="column">
        <Grid item>
          <TextField
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            type="text"
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            type="text"
            label="Card Limit"
            value={cardLimit}
            onChange={(e) => setCardLimit(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container style={{ padding: 5 }}>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleClick}
        >
          Add
        </Button>
      </Grid>
      <Grid style={{ padding: 5 }}>
        <Typography variant="body1">{message}</Typography>
      </Grid>
      <CreditCardList reLoad={reLoad}/>
    </>
  );
};
