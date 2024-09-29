package com.shaswatt.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class InstallationDetails {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;	
	private double installationCapacity;
	private boolean confirmationStatus;	
	private boolean completionStatus;
	private double requiredRoofArea;
	private double monthlyElectricityGenerated;
	private double monthlySavings;
	private double billAmount;
	private double panelCapacity;
	private double costOfBattery;	
	private int newNumberOfPanels;
	private double pricePerPanel;
	private double priceOfPanels;	
	private double costOfAcdb;
	private double costOfDcdb;
	private double costOfLiaisoning;
	private double costOfStructure;
	private double costOfInstallation;
	private double costOfMisc;
	private double costWithoutGst;
	private double gstCost;
	private double costWithGst;
	private double perWattCost;
	    
    @ManyToOne
    @JsonBackReference
    private Vendor  vendor;
    
    @OneToOne
    @JsonManagedReference
    private Customer customer;

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isCompletionStatus() {
		return completionStatus;
	}

	public void setCompletionStatus(boolean completionStatus) {
		this.completionStatus = completionStatus;
	}

	public boolean isConfirmationStatus() {
		return confirmationStatus;
	}

	public void setConfirmationStatus(boolean confirmationStatus) {
		this.confirmationStatus = confirmationStatus;
	}

	@JsonIgnore
	public Vendor getVendor() {
		return vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}

	public double getInstallationCapacity() {
		return installationCapacity;
	}

	public void setInstallationCapacity(double installationCapacity) {
		this.installationCapacity = installationCapacity;
	}

	public double getRequiredRoofArea() {
		return requiredRoofArea;
	}

	public void setRequiredRoofArea(double requiredRoofArea) {
		this.requiredRoofArea = requiredRoofArea;
	}

	public double getMonthlyElectricityGenerated() {
		return monthlyElectricityGenerated;
	}

	public void setMonthlyElectricityGenerated(double monthlyElectricityGenerated) {
		this.monthlyElectricityGenerated = monthlyElectricityGenerated;
	}

	public double getMonthlySavings() {
		return monthlySavings;
	}

	public void setMonthlySavings(double monthlySavings) {
		this.monthlySavings = monthlySavings;
	}

	public double getBillAmount() {
		return billAmount;
	}

	public void setBillAmount(double billAmount) {
		this.billAmount = billAmount;
	}

	public double getPanelCapacity() {
		return panelCapacity;
	}

	public void setPanelCapacity(double panelCapacity) {
		this.panelCapacity = panelCapacity;
	}

	public double getCostOfBattery() {
		return costOfBattery;
	}

	public void setCostOfBattery(double costOfBattery) {
		this.costOfBattery = costOfBattery;
	}

	public int getNewNumberOfPanels() {
		return newNumberOfPanels;
	}

	public void setNewNumberOfPanels(int newNumberOfPanels) {
		this.newNumberOfPanels = newNumberOfPanels;
	}

	public double getPricePerPanel() {
		return pricePerPanel;
	}

	public void setPricePerPanel(double pricePerPanel) {
		this.pricePerPanel = pricePerPanel;
	}

	public double getPriceOfPanels() {
		return priceOfPanels;
	}

	public void setPriceOfPanels(double priceOfPanels) {
		this.priceOfPanels = priceOfPanels;
	}

	public double getCostOfAcdb() {
		return costOfAcdb;
	}

	public void setCostOfAcdb(double costOfAcdb) {
		this.costOfAcdb = costOfAcdb;
	}

	public double getCostOfDcdb() {
		return costOfDcdb;
	}

	public void setCostOfDcdb(double costOfDcdb) {
		this.costOfDcdb = costOfDcdb;
	}

	public double getCostOfLiaisoning() {
		return costOfLiaisoning;
	}

	public void setCostOfLiaisoning(double costOfLiaisoning) {
		this.costOfLiaisoning = costOfLiaisoning;
	}

	public double getCostOfStructure() {
		return costOfStructure;
	}

	public void setCostOfStructure(double costOfStructure) {
		this.costOfStructure = costOfStructure;
	}

	public double getCostOfInstallation() {
		return costOfInstallation;
	}

	public void setCostOfInstallation(double costOfInstallation) {
		this.costOfInstallation = costOfInstallation;
	}

	public double getCostOfMisc() {
		return costOfMisc;
	}

	public void setCostOfMisc(double costOfMisc) {
		this.costOfMisc = costOfMisc;
	}

	public double getCostWithoutGst() {
		return costWithoutGst;
	}

	public void setCostWithoutGst(double costWithoutGst) {
		this.costWithoutGst = costWithoutGst;
	}

	public double getGstCost() {
		return gstCost;
	}

	public void setGstCost(double gstCost) {
		this.gstCost = gstCost;
	}

	public double getCostWithGst() {
		return costWithGst;
	}

	public void setCostWithGst(double costWithGst) {
		this.costWithGst = costWithGst;
	}

	public double getPerWattCost() {
		return perWattCost;
	}

	public void setPerWattCost(double perWattCost) {
		this.perWattCost = perWattCost;
	}
	        
	    
}
