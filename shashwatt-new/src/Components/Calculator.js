import React, { useState } from "react";
import axios from "axios";

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
//import FormControl from "@mui/material/FormControl";
//import { FormControl } from "@mui/material";
//import React, { useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
//import Paper from '@mui/material/Paper';

// function ccyFormat(num) {
//   return `${num.toFixed(2)}`;
// }

// function priceRow(qty, unit) {
//   return qty * unit;
// }

// function createRow(desc, qty, unit) {
//   const price = priceRow(qty, unit);
//   return { desc, qty, unit, price };
// }

// function subtotal(items) {
//   return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
// }

function SolarInputForm() {
  const [billAmount, setBillAmount] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [monthlyElectricityGenerated, setMonthlyElectricityGenerated] =
    useState(0);
  const [requiredRoofArea, setRequiredRoofArea] = useState(0);
  const [numberOfPanels, setsNumberOfPanels] = useState(0);
  const [pinCode, setPinCode] = useState(0);
  const [panelCapacity, setPanelCapacity] = useState(0);
  const [solarVariant, setSolarVariant] = useState(0);
  const [costWithoutGst, setCostWithoutGst] = useState(0);
  const [gstCost, setGstCost] = useState(0);
  const [costWithGst, setCostWithGst] = useState(0);
  const [costOfBattery, setCostOfBattery] = useState(0);
  const [costOfStructure, setCostOfStructure] = useState(0);
  const [costOfPanel, setCostOfPanel] = useState(0);
  const [quotationClicked, setQuotationClicked] = useState(false);

  const costOfInstallation = 20000;
  const costOfLiesening = 20000;
  const costOfMisc = 50000;
  const costOfAcdb = 3000;
  const costOfDcdb = 4800;
  const BasicSelect = () => {
    // const [panelCapacity, setPanelCapacity] = React.useState('');
    //

    // const TAX_RATE = 0.07;

    //     const rows = [
    //       createRow('Paperclips (Box)', 100, 1.15),
    //       createRow('Paper (Case)', 10, 45.99),
    //       createRow('Waste Basket', 2, 17.99),
    //     ];

    //     const invoiceSubtotal = subtotal(rows);
    //     const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    //     const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    //     //
    const handleChange = (event) => {
      setPanelCapacity(event.target.value);
    };

    return (
      <Box sx={{ minWidth: 120, width: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Select Panel Capacity :
          </InputLabel>
          <Select
            defaultValue={335}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={panelCapacity}
            label="Panel Capacity in Watts"
            onChange={handleChange}
          >
            <MenuItem value={255}>255 Watts</MenuItem>
            <MenuItem value={335}>335 Watts</MenuItem>
            <MenuItem value={445}>455 Watts</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };
  const calculateSavings = () => {
    let averagePerUnitCharges = 13;
    let unitsPerDayFrom1KWUnit = 4;

    
    let perUnitPanelCapacity = panelCapacity;
    let areaOfPanel = 25;
    let installationCapacity = 0;
    let additionalAreaRequired = 25;

    let monthlyUnitConsumption = billAmount / averagePerUnitCharges;
    
    let adjustedunitPerDay = unitsPerDayFrom1KWUnit;
    let solarVariant = 0;

    let newPanelCapacity = installationCapacity;
    setPanelCapacity(newPanelCapacity);

    if (monthlyUnitConsumption <= 45) {
      adjustedunitPerDay = 1.5;
      installationCapacity = 500;
      solarVariant = 0.5;
    } else if (monthlyUnitConsumption > 45 && monthlyUnitConsumption < 120) {
      adjustedunitPerDay = 4;
      installationCapacity = 1000;
      solarVariant = 1;
    } else if (monthlyUnitConsumption >= 120 && monthlyUnitConsumption < 165) {
      adjustedunitPerDay = 6;
      installationCapacity = 1500;
      solarVariant = 1.5;
    } else if (monthlyUnitConsumption >= 165 && monthlyUnitConsumption < 240) {
      adjustedunitPerDay = 8;
      installationCapacity = 2000;
      solarVariant = 2;
    } else if (monthlyUnitConsumption >= 240 && monthlyUnitConsumption < 285) {
      adjustedunitPerDay = 9.5;
      installationCapacity = 2500;
      solarVariant = 2.5;
    } else if (monthlyUnitConsumption >= 285 && monthlyUnitConsumption < 360) {
      adjustedunitPerDay = 12;
      installationCapacity = 3000;
      solarVariant = 3;
    } else if (monthlyUnitConsumption >= 360 && monthlyUnitConsumption < 405) {
      adjustedunitPerDay = 13.5;
      installationCapacity = 3500;
      solarVariant = 3.5;
    } else if (monthlyUnitConsumption >= 405 && monthlyUnitConsumption < 480) {
      adjustedunitPerDay = 16;
      installationCapacity = 4000;
      solarVariant = 4;
    } else if (monthlyUnitConsumption >= 480 && monthlyUnitConsumption < 525) {
      adjustedunitPerDay = 17.5;
      installationCapacity = 4500;
      solarVariant = 4.5;
    } else if (monthlyUnitConsumption >= 525 && monthlyUnitConsumption < 600) {
      adjustedunitPerDay = 20;
      installationCapacity = 5000;
      solarVariant = 5;
    } else {
      adjustedunitPerDay =0;
      installationCapacity=0;

      alert("Please Enter valid Units");
    }

    let costOfStructure = installationCapacity * 8;

    let costOfBattery = 0;

    if (solarVariant === 0.5 || solarVariant === 1) {
      costOfBattery = 18900;
    } else if (solarVariant === 1.5 || solarVariant === 2) {
      costOfBattery = 21600;
    } else if (solarVariant === 1.5 || solarVariant === 2) {
      costOfBattery = 21600;
    } else if (solarVariant === 2.5 || solarVariant === 3) {
      costOfBattery = 24500;
    } else if (solarVariant === 3.5 || solarVariant === 4) {
      costOfBattery = 28000;
    } else if (solarVariant === 4.5 || solarVariant === 5) {
      costOfBattery = 31400;
    }

    let newNumberOfPanels = installationCapacity / perUnitPanelCapacity;
    let costOfPanel = installationCapacity * 34;

    let costWithoutGst =
      costOfBattery +
      costOfPanel +
      costOfInstallation +
      costOfLiesening +
      costOfAcdb +
      costOfDcdb +
      costOfStructure +
      costOfMisc;
    let gstCost = 0.7 * costWithoutGst * 0.12 + 0.3 * costWithoutGst * 0.18;

    let costWithGst = costWithoutGst + gstCost;

    let yearlyInstallationCost = costWithGst / 25;

    let monthlyInstallationCost = yearlyInstallationCost / 12;

    let yearlySavings = billAmount * 12 - monthlyInstallationCost * 12;

    let newMonthlySavings = yearlySavings / 12;

    let newMonthlyElectricityGenerated = adjustedunitPerDay * 30;

    setMonthlyElectricityGenerated(newMonthlyElectricityGenerated);

    let requiredRoofArea =
      newNumberOfPanels * areaOfPanel + additionalAreaRequired;

    setRequiredRoofArea(Math.ceil(requiredRoofArea));

    setsNumberOfPanels(Math.ceil(newNumberOfPanels));
    //setRequiredRoofArea(requiredRoofArea);

    setMonthlySavings(Math.ceil(newMonthlySavings));

    setSolarVariant(solarVariant);
    setCostOfBattery(costOfBattery);
    setCostOfStructure(costOfStructure);
    setCostOfPanel(costOfPanel);
    setCostWithoutGst(costWithoutGst);
    setGstCost(Math.ceil(gstCost));
    setCostWithGst(costWithGst);

    /// backend code
    const calculatedData = {
      newMonthlySavings,
      yearlySavings,
      newNumberOfPanels,
      // ... other calculated values
    };
  
    // Make a POST request to your backend API
    axios.post("http://localhost:8181/save-calculated-data", calculatedData)
      .then(response => {
        // Handle success if needed
        console.log("Data sent to backend successfully");
      })
      .catch(error => {
        // Handle error if needed
        console.error("Error sending data to backend:", error);
      });
  };

  const SolarQuotation = () => {
    return (
      <Paper sx={{ m: 1, p: "2em", minHeight: "50em" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            alignContent: "center",
            justifyItems: "center",
          }}
        >
          Quotation for {solarVariant} kW Solar Unit
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
                <TableCell>Cost of Battery</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{costOfBattery}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cost of Panels</TableCell>
                <TableCell align="right">{costOfPanel}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cost of ACDB</TableCell>
                <TableCell align="right">{costOfAcdb}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cost of DCDB</TableCell>
                <TableCell align="right">{costOfDcdb}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cost of Liescening</TableCell>
                <TableCell align="right">{costOfLiesening}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cost of Structure</TableCell>
                <TableCell align="right">{costOfStructure}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cost of Installation</TableCell>

                <TableCell align="right">{costOfInstallation}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cost of Miscelleneous</TableCell>
                <TableCell align="right">{costOfMisc}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">{costWithoutGst}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">
                  70 % at 12% GST 30% at 18% GST
                </TableCell>
                <TableCell align="right">{gstCost}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{costWithGst}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  };
  return (
    <>
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
            height: 400,
          },
        }}
      >
        <Paper>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "center", mb: "1.5em", color: "#" }}
          >
            Shashwatt Solar Calculator
          </Typography>

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
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
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
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ py: "2em" }}>
            <BasicSelect />
          </Box>

          <Button
            onClick={calculateSavings}
            variant="outlined"
            sx={{
              mt: "1em",
            }}
          >
            Calculate Savings
          </Button>
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
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
            {solarVariant} kiloWatt (kW)
          </Typography>
          <Typography variant="h4" gutterBottom sx={{}}>
            <PlaceIcon />
          </Typography>

          <Grid container spacing={2}>
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
          <Button
            onClick={() => setQuotationClicked(true)}
            variant="outlined"
            href="#"
            sx={{
              mt: "1em",
            }}
          >
            Get Quotation
          </Button>
        </Paper>
        {quotationClicked && <SolarQuotation />}
      </Box>
    </>
  );

  function BasicCard1() {
    return (
      <Card sx={{ minWidth: 275, width: 300 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <SavingsIcon sx={{ color: "hotpink", fontSize: 40 }} />
          </Typography>
          <Typography variant="h5" component="div">
            ₹ {monthlySavings}
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
            {requiredRoofArea} Sqaure Feet
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
            {monthlyElectricityGenerated} kWh
          </Typography>

          <Typography variant="body2">Solar units per month</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default SolarInputForm;