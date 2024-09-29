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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function Quotation() {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);

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
  const [newNumberOfPanels, setNewNumberOfPanels] = useState(0);
  const [perWattCost, setPerWattCost] = useState(0);
  const [quotationClicked, setQuotationClicked] = useState(false);
  const [installationCapacity, setInstallationCapacity] = useState(0);
  const [pricePerPanel, setPricePerPanel] = useState(0);
  const [priceOfPanels, setPriceOfPanels] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState(""); // Initialize with an empty string
  const [confirmClicked, setConfirmClicked] = useState(false);
  const costOfInstallation = 20000;
  const costOfLiaisoning = 20000;
  const costOfMisc = 50000;
  const costOfAcdb = 3000;
  const costOfDcdb = 4800;

  useEffect(() => {
    if (pinCode && /^\d{6}$/.test(pinCode)) {
      // Fetch options from the backend API
      axios
        .get(
          `http://localhost:8181/vendors-authenticated-listByPostalCode?postalCode=${pinCode}`
        ) // Replace with your API endpoint
        .then((response) => {
          setOptions(response.data);
          console.log(options); // Assuming the API response is an array of options
        })
        .catch((error) => {
          console.error("Error fetching options:", error);
        });
    }
  }, [pinCode]);

  const BasicSelect = () => {
    // const [panelCapacity, setPanelCapacity] = React.useState('');

    const handleChange = (event) => {
      event.preventDefault();
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

    //let adjustedunitPerDay = unitsPerDayFrom1KWUnit;
    //let solarVariant = 0;

    let newPanelCapacity = installationCapacity;
    setPanelCapacity(newPanelCapacity);

    const consumptionRanges = [
      { min: 0, max: 45, unitPerDay: 1.5, capacity: 500, solarVariant: 0.5 },
      { min: 45, max: 120, unitPerDay: 4, capacity: 1000, solarVariant: 1 },
      { min: 120, max: 165, unitPerDay: 6, capacity: 1500, solarVariant: 1.5 },
      { min: 165, max: 240, unitPerDay: 8, capacity: 2000, solarVariant: 2 },
      {
        min: 240,
        max: 285,
        unitPerDay: 9.5,
        capacity: 2500,
        solarVariant: 2.5,
      },
      { min: 285, max: 360, unitPerDay: 12, capacity: 3000, solarVariant: 3 },
      {
        min: 360,
        max: 405,
        unitPerDay: 13.5,
        capacity: 3500,
        solarVariant: 3.5,
      },
      { min: 405, max: 480, unitPerDay: 16, capacity: 4000, solarVariant: 4 },
      {
        min: 480,
        max: 525,
        unitPerDay: 17.5,
        capacity: 4500,
        solarVariant: 4.5,
      },
      { min: 525, max: 600, unitPerDay: 20, capacity: 5000, solarVariant: 5 },
      // {
      //   min: 600,
      //   max: 645,
      //   unitPerDay: 21.5,
      //   capacity: 5500,
      //   solarVariant: 5.5,
      // },
      // { min: 645, max: 720, unitPerDay: 24, capacity: 6000, solarVariant: 6 },
      // {
      //   min: 720,
      //   max: 765,
      //   unitPerDay: 25.5,
      //   capacity: 6500,
      //   solarVariant: 6.5,
      // },
      // { min: 765, max: 840, unitPerDay: 28, capacity: 7000, solarVariant: 7 },
      // {
      //   min: 840,
      //   max: 885,
      //   unitPerDay: 29.5,
      //   capacity: 7500,
      //   solarVariant: 7.5,
      // },
      // { min: 885, max: 960, unitPerDay: 32, capacity: 8000, solarVariant: 8 },
      // {
      //   min: 960,
      //   max: 1005,
      //   unitPerDay: 33.5,
      //   capacity: 8500,
      //   solarVariant: 8.5,
      // },
      // { min: 1005, max: 1080, unitPerDay: 36, capacity: 9000, solarVariant: 9 },
      // {
      //   min: 1080,
      //   max: 1125,
      //   unitPerDay: 37.5,
      //   capacity: 9500,
      //   solarVariant: 9.5,
      // },
      // {
      //   min: 1125,
      //   max: 1200,
      //   unitPerDay: 40,
      //   capacity: 10000,
      //   solarVariant: 10,
      // }
    ];

    let adjustedunitPerDay = 0;
    //  let installationCapacity = 0;
    let solarVariant = 0;

    for (const range of consumptionRanges) {
      if (
        monthlyUnitConsumption >= range.min &&
        monthlyUnitConsumption < range.max
      ) {
        adjustedunitPerDay = range.unitPerDay;
        installationCapacity = range.capacity;
        solarVariant = range.solarVariant;
        break;
      }
    }

    if (adjustedunitPerDay === 0 && installationCapacity === 0) {
      alert("Please Enter valid Units");
    }

    let costOfStructure = installationCapacity * 8;

    let costOfBattery = 0;

    if (solarVariant == 0.5 || solarVariant == 1) {
      costOfBattery = 18900;
    } else if (solarVariant == 1.5 || solarVariant == 2) {
      costOfBattery = 21600;
    } else if (solarVariant == 1.5 || solarVariant == 2) {
      costOfBattery = 21600;
    } else if (solarVariant == 2.5 || solarVariant == 3) {
      costOfBattery = 24500;
    } else if (solarVariant == 3.5 || solarVariant == 4) {
      costOfBattery = 28000;
    } else if (solarVariant == 4.5 || solarVariant == 5) {
      costOfBattery = 31400;
    }
    let pricePerPanel = 0;
    if (perUnitPanelCapacity == 255) {
      pricePerPanel = 8670;
    } else if (perUnitPanelCapacity == 335) {
      pricePerPanel = 11390;
    } else {
      pricePerPanel = 15470;
    }
    setPricePerPanel(pricePerPanel);
    //     8,670 11390 15470
    let newNumberOfPanels = installationCapacity / perUnitPanelCapacity;
    let costOfPanel = newNumberOfPanels * pricePerPanel;

    let costWithoutGst =
      costOfBattery +
      costOfPanel +
      costOfInstallation +
      costOfLiaisoning +
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
    let perWattCost = costWithGst / installationCapacity;

    setMonthlyElectricityGenerated(newMonthlyElectricityGenerated);

    let requiredRoofArea =
      newNumberOfPanels * areaOfPanel + additionalAreaRequired;

    setRequiredRoofArea(Math.ceil(requiredRoofArea));

    setNewNumberOfPanels(Math.ceil(newNumberOfPanels));

    setMonthlySavings(Math.ceil(newMonthlySavings));

    setSolarVariant(solarVariant);
    setCostOfBattery(costOfBattery);
    setCostOfStructure(costOfStructure);
    setCostOfPanel(costOfPanel);
    setCostWithoutGst(costWithoutGst);
    setGstCost(Math.ceil(gstCost));
    setCostWithGst(costWithGst);
    setPerWattCost(Math.ceil(perWattCost));
    setInstallationCapacity(installationCapacity);
    setPriceOfPanels(newNumberOfPanels * pricePerPanel);
  };

  const SolarQuotation = () => {
    return (
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
                <TableCell>Battery</TableCell>
                <TableCell align="right">1</TableCell>
                <TableCell align="right">{costOfBattery}</TableCell>
                <TableCell align="right">{costOfBattery}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Solar Panels</TableCell>
                <TableCell align="right">{newNumberOfPanels}</TableCell>
                <TableCell align="right">{pricePerPanel}</TableCell>
                <TableCell align="right">
                  {pricePerPanel * newNumberOfPanels}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ACDB</TableCell>

                <TableCell align="right">1</TableCell>
                <TableCell align="right">{costOfAcdb}</TableCell>
                <TableCell align="right">{costOfAcdb}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>DCDB</TableCell>

                <TableCell align="right">1</TableCell>
                <TableCell align="right">{costOfDcdb}</TableCell>
                <TableCell align="right">{costOfDcdb}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Liaisoning</TableCell>

                <TableCell align="right">NA</TableCell>
                <TableCell align="right">{costOfLiaisoning}</TableCell>

                <TableCell align="right">{costOfLiaisoning}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cost of Structure</TableCell>

                <TableCell align="right">{installationCapacity}</TableCell>
                <TableCell align="right">8</TableCell>
                <TableCell align="right">{costOfStructure}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cost of Installation</TableCell>

                <TableCell align="right">NA</TableCell>
                <TableCell align="right">{costOfInstallation}</TableCell>

                <TableCell align="right">{costOfInstallation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cost of Miscelleneous</TableCell>

                <TableCell align="right">NA</TableCell>
                <TableCell align="right">{costOfMisc}</TableCell>

                <TableCell align="right">{costOfMisc}</TableCell>
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
          <Typography>
            Hello Solars,Cost for installation of system is ₹ {perWattCost} per
            Watt.
          </Typography>
        </TableContainer>
        <Button
          onClick={() => {setConfirmClicked(true);confirm();}}
          variant="outlined"
          sx={{
            mt: "1em",
          }}
        >
          Confirm
        </Button>
        {confirmClicked && <PrintButton />}
      </Paper>
    );
  };

  const PrintButton = () => {
    return (
      <Button
        onClick={HandlePdf}
        variant="outlined"
        sx={{
          mt: "1em",
          ml: "2em",
        }}
      >
        Generate Invoice
      </Button>
    );
  };

  const confirm = () => {
    // window.print();
    //  {/* ta to Upload
    const calculatedData = {
      installationCapacity,

      requiredRoofArea,
      monthlyElectricityGenerated,
      monthlySavings,
      billAmount,
      panelCapacity,
      costOfBattery,

      newNumberOfPanels,
      pricePerPanel,
      priceOfPanels,

      costOfAcdb,
      costOfDcdb,
      costOfLiaisoning,
      costOfStructure,
      costOfInstallation,
      costOfMisc,
      costWithoutGst,
      gstCost,
      costWithGst,
      perWattCost,
      vendor: {
        id: selectedVendor, // Replace with the actual vendor ID
      },
      // ... other calculated values
    };
    console.log(selectedVendor);
    let email = sessionStorage.getItem("userEmail");
    // Make a POST request to your backend API
    axios
      //   .post("http://localhost:8181/save-calculated-data", calculatedData)
      .post(
        `http://localhost:8181/installation/${email}/installation-details`,
        calculatedData
      )
      .then((response) => {
        // Handle success if needed

        console.log("Data sent to backend successfully");
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error sending data to backend:", error);
      });
  };

  const HandlePdf = () => {
    navigate("/pdf");
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
          <div>
            <label htmlFor="dropdown">Select a Vendor:</label>
            <select
              id="dropdown"
              onChange={(e) => setSelectedVendor(e.target.value)}
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.vendorName} {option.address.streetAddress}
                </option>
              ))}
            </select>
          </div>
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
          <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
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
            ≈ {requiredRoofArea} Sqaure Feet
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

export default Quotation;
