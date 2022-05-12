import {
  BrowserFile,
  BrowserFileObject,
} from "@etherdata-blockchain/etherdata-sdk-file-browser";
import { 
  Stack,
  Button,
  Typography,
  CardMedia,
  Paper,
} from "@mui/material";
import { useMetaMask } from "metamask-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ETDContext } from "../models/etd_context";
import { ArrowCircleRight, ArrowRight } from "@mui/icons-material";
import NavBar from "./components/NavBar"
import { json_rpc_methods } from "@etherdata-blockchain/etherdata-sdk";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useFileStorage } from "../models/useFileStorage";
import { Config } from "../configs/config";
import Image from 'next/image'
import qs from "query-string";

interface Props {
  balance: number;
  walletAddress: string;
}

const styles = {
    paperContainer: {
        backgroundImage: `url(${'/background.jpg'})`
    },
    joinButton: {
        color: '#eceff1'
    }
};

export default function Front({ balance, walletAddress }: Props) {

  const router = useRouter();

  const files = [
       { title: "Atrium", img: '/Atrium.png'},
       { title: "fuji", img: '/fuji.jpg'},
       { title: "Mushroom", img: '/Mushroom.png'},
       { title: "island", img: '/island.jpg'},
       { title: "night", img: '/night.jpg'},
       { title: "Fire Bird", img: '/Fire Bird.png'},
       { title: "HKUST", img: '/HKUST.png'},
       { title: "Patio", img: '/Patio.png'},
       { title: "lake", img: '/lake.jpg'},
    ];

  return (
  <Paper style={styles.paperContainer}>
    <Stack spacing={2}>
      <NavBar
        walletAddress={walletAddress}
      />
      <Stack mx={5} direction="row" spacing={5} justifyContent="space-evenly">
        <Stack mx={5} alignItems="flex-start" justifyContent="center" sx={{ width: '500%', maxWidth: 5000 }}>

          <Typography variant="h3" gutterBottom component="div">
            Collect and create your unique NFTs
          </Typography>
          <Typography variant="body1" gutterBottom>
            We provide various customization services, which even a novice may begin right away.
            To get you started with NFTs, we provide well designed NFT marketplace to help you
            from zero to hero.
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            For Trader
          </Typography>
          <Button variant="contained" style={styles.joinButton} sx={{ color: '#263238', display: 'block' }}>
            Join Today
          </Button>
          <Typography mt={2} variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            For Creator
          </Typography>
          <Button variant="contained" style={styles.joinButton} sx={{mb:12, color: '#263238', display: 'block' }}>
            Join Today
          </Button>
        </Stack>
        <ImageList variant="quilted" cols={3} gap={1}>
              {files.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.title}
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${item.title}`}
                        onClick={async () => {
                          const query = qs.stringify({
                            item: item.title,
                            walletAddress: walletAddress,
                            location: item.img
                          });
                          await router.push("/item" + "?" + query);
                        }}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
            </ImageListItem>
          ))}
        </ImageList>
      </Stack>
    </Stack>
    </Paper>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { walletAddress } = ctx.query;
  const jsonRPC = new json_rpc_methods.JsonRpcMethods('https://rpc.debugchain.net'!);
  const balanceInHex = (await jsonRPC.getBalance(
    walletAddress as string,
    "latest"
  )) as any;
  const balance = parseInt(balanceInHex, 16);

  return {
    props: {
      balance,
      walletAddress: walletAddress as string,
    },
  };
};