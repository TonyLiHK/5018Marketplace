import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ETDContext } from "../models/etd_context";
import { useMetaMask } from "metamask-react";
import qs from "query-string";
import { json_rpc_methods } from "@etherdata-blockchain/etherdata-sdk";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import Image from 'next/image'
import { createTheme, ThemeProvider } from '@mui/material/styles';

function classNames(...classes) {
   return classes.filter(Boolean).join(" ");
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#dce775',
      main: '#dce775',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default function Navbar({ walletAddress }: Props) {
    const router = useRouter();

    const query = qs.stringify({
            walletAddress: walletAddress,
          });

    const navigation = [
       { name: "Home", href: "/home?"+query, current: true },
       { name: "Exhib", href: "/exhib?"+query, current: false },
       { name: "Storage", href: "/storage?"+query, current: false },
    ];

    const pages = ['Home', 'Upload', 'Storage'];


   return (
    <ThemeProvider theme={theme}>
     <AppBar position="static">
      <Container maxWidth="xl"> 
        <Toolbar disableGutters>
          <Image
              src="/Logo.jpg"
              alt="Logo"
              width={50}
              height={50}
            />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ ml: 2, mr: 2, color: '#263238', display: { xs: 'none', md: 'flex' } }}
          >
            ATY Marketplace
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navigation.map((page) => (
              <Button
                key={page.name}
                onClick={async () => {
                  await router.push(page.href);
                }}
                sx={{ my: 2, color: '#263238', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
    );
  }

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { walletAddress } = ctx.query;

  return {
    props: {
      walletAddress: walletAddress as string,
    },
  };
};