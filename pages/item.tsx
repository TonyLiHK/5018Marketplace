import * as React from 'react';
import { useCallback, useState } from "react";
import {
  Box,
  Paper,
  } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NavBar from "./components/NavBar"
import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";

interface Props {
  item: string;
  walletAddress: string;
  location: string;
}

const styles = {
    paperContainer: {
        backgroundImage: `url(${'/background.jpg'})`
    },
};

export default function Item({ walletAddress,item, location }: Props) {

  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const [values, setValues] = React.useState<State>({
    amount: '',
  });

  const [bid, setBid] = React.useState(0);

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const send = useCallback(async () => {
    setBid(values.amount)
    const transactionParameters = {
      to: '0xf7Ce0875b3fF906837Dd136eA7d7FED7181880CE',
      from: ethereum.selectedAddress,
      value: (values.amount* 10 ** 18).toString(16),
    };
    try {
      const txId = await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
    } catch (err) {
      window.alert(`${(err as any).message}`);
    }
  }, [ethereum, values]);


  return (
  <Paper style={styles.paperContainer} >
    <Stack spacing={2} alignItems="center">
      <NavBar
            walletAddress={walletAddress}
          />
      <Card
          sx={{width:'50%'}}
      >
        <CardMedia
          component="img"
          sx={{
            pt: '10.25%',
          }}
          image={location}
        />
          <CardContent sx={{flexGrow: 1 }}>
            <Stack spacing={5} direction='row' justifyContent="space-between">
              <Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {item}
                </Typography>
                <Typography>
                  This is the details of the NFT.
                </Typography>
              </Box>
              <Box>
                <Typography gutterBottom variant="h5" component="h2">
                    Current Bid
                </Typography>
                <Typography>
                    ETD {bid}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
          <CardActions sx={{mb:10,  m: 1 }}>
            <Button size="small" onClick={() => send()}>Bid</Button>
            <FormControl fullWidth sx={{mb:10,  m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  value={values.amount}
                  onChange={handleChange('amount')}
                  startAdornment={<InputAdornment position="start">ETD</InputAdornment>}
                />
          </FormControl>
          </CardActions>
      </Card>
    </Stack>
  </Paper>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { item, walletAddress, location } = ctx.query;

  return {
    props: {
      item: item as string,
      walletAddress: walletAddress as string,
      location: location as string,
    },
  };
};