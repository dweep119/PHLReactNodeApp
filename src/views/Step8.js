import React, { useContext, useState } from 'react';
import { AppContext } from "../store/app";
import logoPath from "../assets/img/logo-home@2x.png"
import qrCodePath from "../assets/img/qrCode.svg";
import travelPack from "../assets/img/COVID-19 Travel Pack.jpg";
import vaccination from "../assets/img/COVID-19 Vaccination.jpg";
import ICalendarLink from "react-icalendar-link";
const ics = require('ics');

function Step8() {

  const event = {
    title: "My Title",
    description: "My Description",
    startTime: "2018-10-07T10:30:00+10:00",
    endTime: "2018-10-07T12:00:00+10:00",
    location: "10 Carlotta St, Artarmon NSW 2064, Australia"
  }

  const [state, dispatch] = useContext(AppContext);
  const { formData } = state;
  console.log('formData: ', formData);
  const signatureImage = formData.ConsentForms.Signature;
  const DateOfService = formData.DateOfService;
  const TimeOfService = formData.TimeOfService;
  const FirstName = formData.Contact.FirstName;
  const LastName = formData.Contact.LastName;
  const DateOfBirth = formData.Contact.DateOfBirth;
  const StreetAddress1 = formData.Contact.StreetAddress1;
  const StreetAddress2 = formData.Contact.StreetAddress2;
  const Zipcode = formData.Contact.Zipcode;
  const City = formData.Contact.City;
  const State = formData.Contact.State;
  const PhoneNumber = formData.Contact.PhoneNumber;
  const EmailAddress = formData.Contact.EmailAddress;
  const ContactName = formData.Contact.EmergencyContact.ContactName;
  const ContactPhone = formData.Contact.EmergencyContact.ContactPhone;
  const ContactRelation = formData.Contact.EmergencyContact.ContactRelation.label;
  const PreferredLanguage = formData.Demographics.PreferredLanguage;
  const Race = formData.Demographics.Race;
  const Ethnicity = formData.Demographics.Ethnicity;
  const Gender = formData.Demographics.Gender;
  const HasInsurance = formData.Insurance.HasInsurance;
  const PhotoFront = !HasInsurance ? 'NA' : formData.Insurance.PhotoFront;
  const PhotoBack = !HasInsurance ? 'NA' : formData.Insurance.PhotoBack;
  const PrimaryInsurance = !HasInsurance ? 'NA' : formData.Insurance.PrimaryInsurance.label;
  const InsuranceId = !HasInsurance ? 'NA' : formData.Insurance.InsuranceId;
  const GroupNumber = !HasInsurance ? 'NA' : formData.Insurance.GroupNumber;
  const PlanName = !HasInsurance ? 'NA' : formData.Insurance.PlanName;
  const SameInsuredPerson = formData.Insurance.SameInsuredPerson;
  const InsuredPersonRelation = HasInsurance ? SameInsuredPerson ? 'NA' : formData.Insurance.InsuredPersonRelation.label : 'NA';
  const InsuredPersonDOB = HasInsurance ? SameInsuredPerson ? 'NA' : formData.Insurance.InsuredPersonDOB : 'NA';
  const InsuredPersonFirstName = HasInsurance ? SameInsuredPerson ? 'NA' : formData.Insurance.InsuredPersonFirstName : 'NA';
  const InsuredPersonLastName = HasInsurance ? SameInsuredPerson ? 'NA' : formData.Insurance.InsuredPersonLastName : 'NA';
  const InsuredPersonMiddleName = HasInsurance ? SameInsuredPerson ? 'NA' : formData.Insurance.InsuredPersonMiddleName : 'NA';
  const InsuredPersonSuffix = HasInsurance ? SameInsuredPerson ? 'NA' : formData.Insurance.InsuredPersonSuffix : 'NA';

  const [selectedTab, setselectedTab] = useState('Appointment');

  const serviceList = [
    {
      serviceImage: travelPack,
      serviceName: "COVID-19 Travel Pack",
      serviceDate: DateOfService,
      serviceTime: TimeOfService.time_12hr,
      serviceAddress: "6301 N. Western Ave Chicago, IL 60659"
    },
    {
      serviceImage: vaccination,
      serviceName: "COVID - 19 Pfizer Vaccination",
      serviceDate: DateOfService,
      serviceTime: TimeOfService.time_12hr,
      serviceAddress: "6301 N. Western Ave Chicago, IL 60659"
    }
  ];

  const addToCalendarClick = () => {
    ics.createEvent(event, (error, value) => {
      if (error) {
        console.log(error)
        return
      }
      console.log('value: ', value);
    })
  }

  const handleNext = () => {
    dispatch({
      type: "SET_STEP",
      step: state.step + 1
    });
    return;
  };

  const handleBack = () => {
    dispatch({
      type: "SET_STEP",
      step: state.step - 1
    });
    return;
  };

  const onEditIconClick = (stepNo) => {
    dispatch({
      type: "SET_STEP",
      step: stepNo
    });
    return;
  }

  return (
    <div className="App">
      <div className="p-5">
        <div className="row mb-5 w-100 justify-content-between">
          <div className="col-lg-5 col-md-6 col-12">
            <div className="roboto-normal-dark-tan-24px">
              We'll See You There!
            </div>
            <div className="mt-3">
              <label className="roboto-medium-black-24px">
                This is your express pass to Check-in once you arrive at Prism.
              </label>
            </div>
            <div className="mt-3">
              <label className="roboto-medium-black-24px">
                This is QR Code will also be sent to you in your confirmation email.
              </label>
            </div>
          </div>
          <div className="col-lg-5 col-md-6 col-12">
            <div className="text-center">
              <img className="summaryQRCode" src={qrCodePath} alt="img" />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        {
          serviceList.map((item, index) => (
            <div className="col-lg-6 col-md-12 col-12" key={index}>
              <div className="card summaryCard">
                <div className="card-header summaryCardHeader">
                  <div className="roboto-bold-white-20px">
                    My Services
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-12">
                    <div className="col-lg-5 col-md-5 col-12">
                      <div className="row">
                        <div className="d-flex">
                          <img src={item.serviceImage} alt="img" style={{ height: 70 }} />
                          <label className="ml-2 roboto-normal-black-18px-22">{item.serviceName}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 col-12">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-12">
                        <i className="fa fa-calendar-o fa-lg" aria-hidden="true"></i>
                        <label className="ml-2 roboto-normal-black-18px-22">{item.serviceDate}</label>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <i className="fa fa-clock-o fa-lg" aria-hidden="true"></i>
                        <label className="ml-2 roboto-normal-black-18px-22"> {item.serviceTime}</label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 col-12">
                    <div className="row">
                      <div className="col-12">
                        <i className="fa fa-map-marker fa-lg" aria-hidden="true"></i>
                        <label className="ml-2 roboto-normal-black-18px-22">{item.serviceAddress}</label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 col-12">
                    <div className="row">
                      <div className="col-12">
                        <button className="summaryBodyBtn roboto-bold-white-20-3px" onClick={handleBack}>GET DIRECTIONS</button>
                        {/* <button className="summaryBodyBtn roboto-bold-white-20-3px ml-3" onClick={addToCalendarClick}>ADD TO CALENDAR</button> */}
                        <ICalendarLink className="btn icsCalendar summaryBodyBtn roboto-bold-white-20-3px ml-3" event={event}>
                          ADD TO CALENDAR
                        </ICalendarLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          ))
        }
        {/* <div className="col-lg-6 col-md-12 col-12">
          <div className="card summaryCard">
            <div className="card-header summaryCardHeader">
              <div className="roboto-bold-white-20px">
                My Services
              </div>
            </div>
            <div className="card-body">
              <div className="col-12">
                <div className="col-lg-7 col-md-7 col-12">
                  <div className="row">
                    <div className="d-flex">
                      <img src={vaccination} alt="img" style={{ height: 70 }} />
                      <label className="ml-2 roboto-normal-black-18px-22">COVID-19 Pfizer Vaccination</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 col-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <i className="fa fa-calendar-o fa-lg" aria-hidden="true"></i>
                    <label className="ml-2 roboto-normal-black-18px-22">{DateOfService}</label>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <i className="fa fa-clock-o fa-lg" aria-hidden="true"></i>
                    <label className="ml-2 roboto-normal-black-18px-22">{TimeOfService.time_12hr}</label>
                  </div>
                </div>
              </div>
              <div className="mt-3 col-12">
                <div className="row">
                  <div className="col-12">
                    <i className="fa fa-map-marker fa-lg" aria-hidden="true"></i>
                    <label className="ml-2 roboto-normal-black-18px-22">6301 N. Western Ave Chicago, IL 60659</label>
                  </div>
                </div>
              </div>
              <div className="mt-3 col-12">
                <div className="row">
                  <div className="col-12">
                    <button className="summaryBodyBtn roboto-bold-white-20-3px" onClick={handleBack}>GET DIRECTIONS</button>
                    <button className="summaryBodyBtn roboto-bold-white-20-3px ml-3" onClick={handleBack}>ADD TO CALENDAR</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="mt-5" id="myGroup">
        <div className="summaryCard p-3 d-flex">
          <div className="col-lg-3 col-md-3 col-12">
            <div className="summarySidebar">
              <div className={"sidebarDiv mb-2 " + (selectedTab === "Appointment" ? "activeTab" : "")} data-toggle="collapse" data-target="#collapseExample1" onClick={() => setselectedTab('Appointment')}>
                <label className={"cursor-pointer " + (selectedTab === "Appointment" ? "roboto-medium-midnight-blue-24px" : "roboto-medium-black-24px")}>Appointment</label>
              </div>
              <div className={"sidebarDiv mb-2 " + (selectedTab === "Contact" ? "activeTab" : "")} data-toggle="collapse" data-target="#collapseExample2" onClick={() => setselectedTab('Contact')}>
                <label className={"cursor-pointer " + (selectedTab === "Contact" ? "roboto-medium-midnight-blue-24px" : "roboto-medium-black-24px")}>Contact</label>
              </div>
              <div className={"sidebarDiv mb-2 " + (selectedTab === "Demographics" ? "activeTab" : "")} data-toggle="collapse" data-target="#collapseExample3" onClick={() => setselectedTab('Demographics')}>
                <label className={"cursor-pointer " + (selectedTab === "Demographics" ? "roboto-medium-midnight-blue-24px" : "roboto-medium-black-24px")}>Demographics</label>
              </div>
              <div className={"sidebarDiv mb-2 " + (selectedTab === "Insurance" ? "activeTab" : "")} data-toggle="collapse" data-target="#collapseExample4" onClick={() => setselectedTab('Insurance')}>
                <label className={"cursor-pointer " + (selectedTab === "Insurance" ? "roboto-medium-midnight-blue-24px" : "roboto-medium-black-24px")}>Insurance</label>
              </div>
              <div className={"sidebarDiv mb-2 " + (selectedTab === "Questionnaire" ? "activeTab" : "")} data-toggle="collapse" data-target="#collapseExample5" onClick={() => setselectedTab('Questionnaire')}>
                <label className={"cursor-pointer " + (selectedTab === "Questionnaire" ? "roboto-medium-midnight-blue-24px" : "roboto-medium-black-24px")}>Questionnaire</label>
              </div>
              <div className={"sidebarDiv mb-2 " + (selectedTab === "Consent Forms" ? "activeTab" : "")} data-toggle="collapse" data-target="#collapseExample6" onClick={() => setselectedTab('Consent Forms')}>
                <label className={"cursor-pointer " + (selectedTab === "Consent Forms" ? "roboto-medium-midnight-blue-24px" : "roboto-medium-black-24px")}>Consent Forms</label>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-9 col-12">
            <div className="appointment show" id="collapseExample1" data-parent="#myGroup">
              <div className="row">
                <div className="mb-3 overlap-group2 col-11">
                  <label className="roboto-medium-black-24px w-100">Appointment
                  </label>
                </div>
                <div className="col-1 d-flex pl-0 pr-0">
                  <div className="summaryChevronIcon">
                    <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(1)}></i>
                  </div>
                </div>
              </div>
              <div className="border-1px-mercury mb-3"></div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Date/Time</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {DateOfService} {TimeOfService.time_12hr}</label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Office Phone Number</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> (800)-325-1812</label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Office Location</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> 6301 N. Western Ave Chicago, IL 60659</label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Office Email</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> info@prism.org</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact collapse" id="collapseExample2" data-parent="#myGroup">
              <div className="row">
                <div className="mb-3 overlap-group2 col-11">
                  <label className="roboto-medium-black-24px w-100">Contact
                  </label>
                </div>
                <div className="col-1 d-flex pl-0 pr-0">
                  <div className="summaryChevronIcon">
                    <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(2)}></i>
                  </div>
                </div>
              </div>
              <div className="border-1px-mercury mb-3"></div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Name</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {FirstName} {LastName}</label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Address</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {StreetAddress1} {City}, {State} {Zipcode}</label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Email</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {EmailAddress}</label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Emergency Contact Phone Number</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {ContactPhone}</label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Date of Birth</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> 09/11/1995</label>
                      {/* <label className="roboto-normal-dark-silver-18px w-100"> {DateOfBirth}</label> */}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Phone Number</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {PhoneNumber}</label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Emergency Contact Name</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {ContactName}</label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Emergency Contact Relation</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {ContactRelation}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="demographics collapse" id="collapseExample3" data-parent="#myGroup">
              <div className="row">
                <div className="mb-3 overlap-group2 col-11">
                  <label className="roboto-medium-black-24px w-100">Demographics
                  </label>
                </div>
                <div className="col-1 d-flex pl-0 pr-0">
                  <div className="summaryChevronIcon">
                    <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(3)}></i>
                  </div>
                </div>
              </div>
              <div className="border-1px-mercury mb-3"></div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Preferred Language</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {PreferredLanguage}</label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Ethnicity</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {Ethnicity}</label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Race</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {Race}</label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Gender</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {Gender}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="insurance collapse" id="collapseExample4" data-parent="#myGroup">
              <div className="row">
                <div className="mb-3 overlap-group2 col-11">
                  <label className="roboto-medium-black-24px w-100">Insurance
                  </label>
                </div>
                <div className="col-1 d-flex pl-0 pr-0">
                  <div className="summaryChevronIcon">
                    <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(4)}></i>
                  </div>
                </div>
              </div>
              <div className="border-1px-mercury mb-3"></div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Insurance Company</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {PrimaryInsurance}</label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Group Number</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {GroupNumber}</label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Insured Person Name</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {InsuredPersonFirstName} {InsuredPersonLastName}</label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Insured Person DOB</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> 08/30/1964</label>
                      {/* <label className="roboto-normal-dark-silver-18px w-100"> {InsuredPersonDOB}</label> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Insurance ID</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {InsuranceId}</label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Plan Name</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {PlanName}</label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> Insured Relationship to Patient</label>
                      <label className="roboto-normal-dark-silver-18px w-100"> {InsuredPersonRelation}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="medical-questionnarie collapse" id="collapseExample5" data-parent="#myGroup">
              <div className="row">
                <div className="mb-3 overlap-group2 col-11">
                  <label className="roboto-medium-black-24px w-100">Medical Questionnaire
                  </label>
                </div>
                <div className="col-1 d-flex pl-0 pr-0">
                  <div className="summaryChevronIcon">
                    <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(5)}></i>
                  </div>
                </div>
              </div>
              <div className="border-1px-mercury mb-3"></div>
              <div className="row">
                <div className="roboto-normal-dark-tan-22px col-12 mb-3">
                  COVID-19 Testing
                </div>
                <div className="col-12">
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Are you currently experiencing COVID-19 symptoms or have you been exposed to COVID-19?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Have you been in any public gatherings(i.e prayer hall, protests, parties/events/restaurant, etc)?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Are you a health care worker‚ nursing home worker‚ first responder?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Have you experienced any symptoms in the last 14 days?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Do you have any pre-existing medical conditions?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Do you smoke cigarettes or use other tobacco?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Do you use vaping products?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Have you experienced any of these symptoms</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> Cough, Rash, Fever above 100 degrees</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> How long have you been experiencing these symptoms (in days)</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> 5</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="roboto-normal-dark-tan-22px col-12 mb-3">
                  COVID-19 Vaccine
                </div>
                <div className="col-12">
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Are you currently experiencing COVID-19 symptoms or have you been exposed to COVID-19?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Have you received any vaccinations in the past 2 weeks?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Have you receiveed a COVID-19 vaccine from different manufacturer at any time, or did you participate in a COVID-19 vaccine trial?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Have you ever had a serious reaction or fainted after receiving any vaccination?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Have you been diagnosed with COVID-19 infection in the last 90 days?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Have you ever had an anaphylactic reaction or had other severe symptoms after receiving another vaccination?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Do you have a medical condition or take medication(s) that may weaken your immune system?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="roboto-normal-dark-tan-22px col-12 mb-3">
                  Additional Info
                </div>
                <div className="col-12">
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Are you disabled?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> Any additional personal health information you would like us to be aware of?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> No</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> How did you here about us?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> Facebook</label>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <label className="roboto-normal-black-18px-22 w-100"> In the future, what other services would you like Prism Health lab to provide?</label>
                        <label className="roboto-normal-dark-silver-18px w-100"> Immigration</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="consent collapse" id="collapseExample6" data-parent="#myGroup">
              <div className="row">
                <div className="mb-3 overlap-group2 col-11">
                  <label className="roboto-medium-black-24px w-100">Consent Form
                  </label>
                </div>
                <div className="col-1 d-flex pl-0 pr-0">
                  <div className="summaryChevronIcon">
                    <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => onEditIconClick(6)}></i>
                  </div>
                </div>
              </div>
              <div className="border-1px-mercury mb-3"></div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="roboto-normal-black-18px-22 w-100"> e-Signature</label>
                      <img src={signatureImage ? signatureImage : logoPath} alt="img"
                        style={{ width: "100%", height: "100%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-100 d-flex justify-content-end mt-5 mb-5 pb-5">
        <button className="overlap-group101 roboto-bold-white-20-3px" onClick={handleBack}>PREVIOUS</button>
        <button className="overlap-group13 border-1-4px-mercury roboto-bold-white-20-3px ml-3" onClick={handleNext}>SUBMIT</button>
      </div>
    </div>
  );
}

export default Step8;
