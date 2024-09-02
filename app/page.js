'use client'

import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Typography, Modal, Stack, TextField, Button, Paper, AppBar, Toolbar, IconButton, InputBase } from "@mui/material";
import { collection, getDoc, getDocs, query, doc, setDoc, deleteDoc } from "firebase/firestore";
import { Search as SearchIcon, Add as AddIcon, AddCircleOutline } from '@mui/icons-material';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
    setFilteredInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredItems = inventory.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setFilteredInventory(filteredItems);
  };

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column">
      <AppBar position="fixed" sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pantry Inventory
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Paper component="form" sx={{ display: 'flex', alignItems: 'center', p: '2px 4px', mr: 2 }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search items..."
                inputProps={{ 'aria-label': 'search items' }}
                value={searchTerm}
                onChange={handleSearch}
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddCircleOutline />}
              onClick={handleOpen}
              sx={{ padding: '6px 16px', fontSize: '16px' }}
            >
              Add Item
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box width="100vw" height="calc(100vh - 64px)" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2} p={2} mt={8}>
        <Modal open={open} onClose={handleClose}>
          <Box position="absolute" top="50%" left="50%" width={400} bgcolor="white" border="2px solid #000"
            boxShadow={24} p={4} display="flex" flexDirection={"column"} gap={3} sx={{ transform: "translate(-50%,-50%)" }}>
            <Typography variant="h6">Add Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField variant="outlined" fullWidth value={itemName} onChange={(e) => { setItemName(e.target.value) }} />
              <Button variant="contained" onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}>Add</Button>
            </Stack>
          </Box>
        </Modal>
        
        <Box width="100%" maxWidth="800px" border='1px solid #333' borderRadius={2} overflow="hidden">
          <Box width='100%' height='100px' bgcolor='#ADD8E6' display='flex' alignItems="center" justifyContent="center">
            <Typography variant='h4' color='#333'>Inventory Items</Typography>
          </Box>
          <Stack width="100%" maxHeight="300px" spacing={2} overflow="auto" p={2}>
            {filteredInventory.map(({ name, quantity }) => (
              <Paper key={name} elevation={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                <Typography variant="h6" color='#333'>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant="h6" color='#333'>
                  {quantity}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={() => { addItem(name); }}>Add</Button>
                  <Button variant="contained" onClick={() => { removeItem(name); }}>Remove</Button>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

