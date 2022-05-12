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
  walletAddress: string;
}

const styles = {
    paperContainer: {
        backgroundImage: `url(${'/xihib.png'})`
    },
    joinButton: {
        color: '#eceff1'
    }
};

export default function Exhib({ walletAddress }: Props) {

  const router = useRouter();

  return (
  <Paper style={styles.paperContainer}>
    <Stack spacing={2}>
      <NavBar
        walletAddress={walletAddress}
      />
    </Stack>
    <Image
              src="/xibits.png"
              alt="exhibit"
              height={1000}
              width={1500}
            />
    </Paper>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { walletAddress } = ctx.query;

  return {
    props: {
      walletAddress: walletAddress as string,
    },
  };
};