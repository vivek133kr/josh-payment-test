import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import image from "../../Images/PaymentBox.png";
import { useNavigate } from "react-router-dom";
import "@fontsource/montserrat";
import Arrow from "../../Images/UpDownArrow.png";

import JtColor from "../../Images/jt-logo-color.png";
import razorpay from "../../Images/razorpay.png";
import PaymentModal from "../PaymentModal/PaymentModal";
import { DataContext } from "../../context/dataContext";
function PaymentPage() {

  const [openFirst, setOpenFirst] = useState(false);
   
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false)


  let [login, setLogin] = useState(localStorage.getItem(`formIdpayment_login`));
  let [mainToken, setMainToken] = useState(
    localStorage.getItem(`formIdpayment_token`)
  );
  let [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { paymentJoshLogin} = useContext(DataContext);

  // https://upsc.joshtalks.org/api/v1/forms/${id}
  const [data, setData] = useState("");
  let [fieldList, setFieldList] = useState([]);
  useEffect(()=>{

     if (
       paymentJoshLogin == false
     ) {
   
       navigate(`/login`);
     }
  }, [])
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#F4F6F8",
        display: "flex",
        flexDirection: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",

          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: "60%",

            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",

              backgroundColor: "white",
              height: "fit-content",
              width: "80%",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                paddingLeft: "2%",
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "22px",
                lineHeight: "38px",
              }}
            >
              Create a Payment Link
            </p>
            <Button
              onClick={() => {
                setOpenFirst(!openFirst);
              }}
              style={{ marginRight: "2%" }}
            >
              <img src={Arrow} alt="." />
            </Button>
          </div>
          {openFirst ? (
            <div
              style={{
                width: "80%",
                height: "400px",
                backgroundColor: "white",
                marginTop: "0.1%",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "238px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "228.95px",
                  boxShadow: " 0px 0px 35px rgba(154, 161, 171, 0.15)",

                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                    height: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Montserrat",
                      fontStyle: "normal",

                      fontWeight: "600",
                      fontSize: "18px",
                      lineHeight: "38px",
                    }}
                  >
                    Razorpay
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",

                    alignItems: "center",
                    justifyContent: "center",
                    height: "50%",
                  }}
                >
                  <div>
                    <img src={razorpay} alt="." />
                  </div>
                  <Button
                    onClick={() => {
                      // navigate("/paymentportal");
                      handleOpen();
                    }}
                    style={{
                      position: "absolute",
                      bottom: 20,
                      textTransform: "none",
                      backgroundColor: "#727CF5",
                      width: "84px",
                      height: "31.95px",
                    }}
                    variant="contained"
                  >
                    Pay
                  </Button>
                </div>
              </div>
              {/* <img
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // navigate("/paymentportal");
                  handleOpen();
                }}
                src={image}
                alt="."
              /> */}
            </div>
          ) : (
            " "
          )}
        </div>
        <PaymentModal
          handleSecondOpen={handleOpen}
          handleSecondClose={handleClose}
          secondOpen={openModal}
        />
      </div>
    </div>
  );
}

export default PaymentPage;
