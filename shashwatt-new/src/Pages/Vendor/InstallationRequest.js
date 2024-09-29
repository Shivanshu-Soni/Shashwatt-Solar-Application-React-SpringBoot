import React, { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { padding } from "@mui/system";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import SavingsIcon from "@mui/icons-material/Savings";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import LightModeIcon from "@mui/icons-material/LightMode";
import PlaceIcon from "@mui/icons-material/Place";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
function InstallationDetails() {
  const [installationDetails, setInstallationDetails] = useState(null);
  const id = sessionStorage.getItem("installationId");
  const [confirmationStatusUpdated, setConfirmationStatusUpdated] = useState(false);

  useEffect(() => {
    // Fetch data from the backend API and set it to the state
    // Replace this with your actual data fetching logic
    let url = `http://localhost:8181/installations/${id}`;
    axios.get(url).then((response) => {
      setInstallationDetails(response.data);
    });
  }, []);

  if (!installationDetails) {
    return <p>Loading...</p>;
  }
  function BasicCard1() {
    return (
      <Card sx={{ minWidth: 275, width: 300 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <SavingsIcon sx={{ color: "hotpink", fontSize: 40 }} />
          </Typography>
          <Typography variant="h5" component="div">
            ₹ {installationDetails.monthlySavings}
          </Typography>

          <Typography variant="body2">Monthly Savings</Typography>
        </CardContent>
      </Card>
    );
  }
  function BasicCard2() {
    return (
      <Card sx={{ minWidth: 275, width: 300 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <SolarPowerIcon sx={{ color: "chocolate", fontSize: 40 }} />
          </Typography>
          <Typography variant="h5" component="div">
            ≈ {installationDetails.requiredRoofArea} Sqaure Feet
          </Typography>

          <Typography variant="body2">Roof Area Required</Typography>
        </CardContent>
      </Card>
    );
  }

  function BasicCard3() {
    return (
      <Card sx={{ minWidth: 275, width: 300 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <LightModeIcon sx={{ color: "gold", fontSize: 40 }} />
          </Typography>
          <Typography variant="h5" component="div">
            {installationDetails.monthlyElectricityGenerated} kWh
          </Typography>

          <Typography variant="body2">Solar units per month</Typography>
        </CardContent>
      </Card>
    );
  }

  const acceptClicked = async() =>{
    try {
        const installationId = 1; // Replace with the actual installation ID
        const response = await axios.patch(`http://localhost:8181/installation/${id}/confirm`);
        
        if (response.status === 200) {
          setConfirmationStatusUpdated(true);
        } else {
          console.log('Failed to update confirmation status');
        }
      } catch (error) {
        console.error('Error updating confirmation status:', error);
      }
  }
  return (
    <div>
      {/* <h2>Installation Details</h2> */}

      <div className=" row justify-content-center">
        <>
          <div className="col-sm-9">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                    Installation Details
                    </TableCell>
                    {/* <TableCell align="right">Price</TableCell> */}
                  </TableRow>
                  
                  {/* <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Qty.</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Sum</TableCell>
                  </TableRow> */}
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Booking ID</TableCell>
                    {/* <TableCell align="right">1</TableCell> */}
                    <TableCell align="right">
                      {installationDetails.id}
                    </TableCell>
                    {/* <TableCell align="right">
                      {installationDetails.costOfBattery}
                    </TableCell> */}
                  </TableRow>
                  <TableRow>
                    <TableCell>Customer Name</TableCell>
                    <TableCell align="right">
                      {installationDetails.customer.firstName}{" "}
                      {installationDetails.customer.lastName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email</TableCell>

                    {/* <TableCell align="right">1</TableCell> */}
                    <TableCell align="right">
                      {installationDetails.customer.email}
                    </TableCell>
                    {/* <TableCell align="right">
                      {installationDetails.costOfAcdb}
                    </TableCell> */}
                  </TableRow>
                  <TableRow>
                    <TableCell>Contact Number</TableCell>

                    {/* <TableCell align="right">1</TableCell> */}
                    <TableCell align="right">
                      {installationDetails.customer.phone}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address</TableCell>

                    {/* <TableCell align="right">NA</TableCell> */}
                    <TableCell align="right">
                      {installationDetails.customer.address.streetAddress},{" "}
                      {installationDetails.customer.address.city},{" "}
                      {installationDetails.customer.address.state},{" "}
                      {installationDetails.customer.address.country},{" "}
                      {installationDetails.customer.address.postalCode}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              // border:"solid black",
              justifyContent: "center",
              "& > :not(style)": {
                m: 1,
                p: "2em",
                width: 900,
                height: 200,
              },
            }}
          >
            <Paper>
              {/* <Typography
                variant="h4"
                gutterBottom
                sx={{ textAlign: "center", mb: "1.5em", color: "#" }}
              >
                Shashwatt Solar Calculator
              </Typography> */}

              <Grid
                container
                spacing={2}
                sx={{
                  mb: "1em",
                }}
              >
                <Grid item xs={6}>
                  <FormControl variant="standard">
                    <InputLabel
                      htmlFor="component-simple"
                      sx={{
                        required: "true",
                      }}
                    >
                      Enter Electricity Bill(in ₹)
                    </InputLabel>
                    <Input
                      type="number"
                      value={installationDetails.billAmount}
                      //   onChange={(e) => setBillAmount(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">
                      Enter Pin Code
                    </InputLabel>
                    <Input
                      type="number"
                      value={installationDetails.customer.address.postalCode}
                      //   onChange={(e) => setPinCode(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box sx={{ py: "2em" }}>{/* <BasicSelect /> */}</Box>
              {/* <div>
            <label htmlFor="dropdown">Select a Vendor:</label>
            <select
              id="dropdown"
            //   onChange={(e) => setSelectedVendor(e.target.value)}
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.vendorName} {option.address.streetAddress}
                </option>
              ))}
            </select>
          </div> */}
              {/* <Button
                onClick={installationDetails.calculateSavings}
                variant="outlined"
                sx={{
                  mt: "1em",
                }}
              >
                Calculate Savings
              </Button> */}
            </Paper>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
              "& > :not(style)": {
                m: 1,
                p: "2em",
                width: 900,
                height: 400,
              },
            }}
          >
            <Paper sx={{ m: 1, p: "2em" }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                {/* {solarVariant} kiloWatt (kW) */}
              </Typography>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                <PlaceIcon />
              </Typography>

              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={4}>
                  <BasicCard1 />
                </Grid>
                <Grid item xs={4}>
                  <BasicCard2 />
                </Grid>
                <Grid item xs={4}>
                  <BasicCard3 />
                </Grid>
              </Grid>
              {/* <Button
                variant="outlined"
                href="#"
                sx={{
                  mt: "1em",
                }}
              >
                Get Quotation
              </Button> */}
            </Paper>
            {/* {quotationClicked && <SolarQuotation />} */}
          </Box>
        </>
      </div>

      <div className=" row justify-content-center">
        <div className="col-sm-9">
          <Paper sx={{ m: "1em", p: "2em", minHeight: "60em" }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                alignContent: "center",
                justifyItems: "center",
                textAlign: "center",
              }}
            >
              {/* Quotation for {solarVariant} kW Solar Unit */}
            </Typography>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Details
                    </TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Qty.</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Battery</TableCell>
                    <TableCell align="right">1</TableCell>
                    <TableCell align="right">
                      {installationDetails.costOfBattery}
                    </TableCell>
                    <TableCell align="right">
                      {installationDetails.costOfBattery}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Solar Panels</TableCell>
                    <TableCell align="right">
                      {installationDetails.newNumberOfPanels}
                    </TableCell>
                    <TableCell align="right">
                      {installationDetails.pricePerPanel}
                    </TableCell>
                    <TableCell align="right">
                      {installationDetails.pricePerPanel *
                        installationDetails.newNumberOfPanels}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ACDB</TableCell>

                    <TableCell align="right">1</TableCell>
                    <TableCell align="right">
                      {installationDetails.costOfAcdb}
                    </TableCell>
                    <TableCell align="right">
                      {installationDetails.costOfAcdb}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>DCDB</TableCell>

                    <TableCell align="right">1</TableCell>
                    <TableCell align="right">
                      {installationDetails.costOfDcdb}
                    </TableCell>
                    <TableCell align="right">
                      {installationDetails.costOfDcdb}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Liaisoning</TableCell>

                    <TableCell align="right">NA</TableCell>
                    <TableCell align="right">
                      {installationDetails.costOfLiaisoning}
                    </TableCell>

                    <TableCell align="right">
                      {installationDetails.costOfLiaisoning}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cost of Structure</TableCell>

                    <TableCell align="right">
                      {installationDetails.installationCapacity}
                    </TableCell>
                    <TableCell align="right">8</TableCell>
                    <TableCell align="right">
                      {installationDetails.costOfStructure}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cost of Installation</TableCell>

                    <TableCell align="right">NA</TableCell>
                    <TableCell align="right">
                      {installationDetails.costOfInstallation}
                    </TableCell>

                    <TableCell align="right">
                      {installationDetails.costOfInstallation}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cost of Miscelleneous</TableCell>

                    <TableCell align="right">NA</TableCell>
                    <TableCell align="right">
                      {installationDetails.costOfMisc}
                    </TableCell>

                    <TableCell align="right">
                      {installationDetails.costOfMisc}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">
                      {installationDetails.costWithoutGst}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">
                      70 % at 12% GST 30% at 18% GST
                    </TableCell>
                    <TableCell align="right">
                      {installationDetails.gstCost}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">
                      {installationDetails.costWithGst}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Typography>
                Cost for installation of system is ₹{" "}
                {installationDetails.perWattCost} per Watt.
              </Typography>
            </TableContainer>
            <Button
                onClick={() => acceptClicked()}
              variant="outlined"
              sx={{
                mt: "1em",
              }}
            >
              Accept
            </Button>
            {/* {confirmClicked && <PrintButton />} */}
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default InstallationDetails;
