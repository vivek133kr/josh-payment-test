import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import copy from "copy-to-clipboard";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import Frame from "../../Images/Frame.png";
import Modal from "@mui/material/Modal";
import LinkImg from "../../Images/link.png";
import CloseIcon from "../../Images/close.png";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import "./PaymentModal.css";
import {
  Alert,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import JtColor from "../../Images/jt-logo-color.png";
import "@fontsource/sora";
import axios from "axios";
import { InputLabel } from "@mui/material";

const style = {};

export default function PaymentModal({
  handleSecondOpen,
  handleSecondClose,
  secondOpen,
  handleOpen,
}) {
  const [error, setError] = useState(false);
  const [widthTotal, setWidth] = useState(window.innerWidth);
  let [copied, setCopied] = useState(false);
  let [loading, setLoading] = useState(false);
  let [form, setForm] = useState({
    name: "",
    course: "Select Course",
    contact: "",
    expire_by: "Select Link Duration",
    email: "",
    amount: "",
  });
  let [link, setLink] = useState("");
  console.log(form, " checking form");

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleNewClick = () => {
    setForm({
      name: "",
      course: "Select Course",
      contact: "",
      expire_by: "Select Link Duration",
      email: "",
      amount: "",
    });
    setLink("");
    setCopied(false);
    setLoading(false)
  };
  const handleSubmit = () => {
       setLoading(true);
         

    fetch("https://smoggy-gold-betta.cyclic.app/api/paymentlink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.err) {
           setLoading(false);
          setError(true);
          setForm({
            name: "",
            course: "Select Course",
            contact: "",
            expire_by: "Select Link Duration",
            email: "",
            amount: "",
          });
          setLink("");
          setCopied(false);
          await new Promise((resolve) =>
            setTimeout(() => {
              setError(false);
              resolve();
            }, 3000)
          );
           setLoading(false);
       
          return;
        }
        setLink(data);
        setLoading(false);
      });
  };
  console.log(link, " link checking");
  const handleChange = ({ name, value }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const copyLink = () => {
    copy(link.data);
    setCopied(true);
  };
  console.log(form);
  return (
    <div>
      <Modal
        open={secondOpen}
        onClose={handleSecondClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="BoxStyle">
          <div
            style={{
              width: "100%",

              height: "100%",
              display: "flex",
              flexDirection: "column",

              alignItems: "center",

              position: "relative",
            }}
          >
            <div id="navbarr">
              <img id="navimg" src={JtColor} alt="." />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",

                  alignItems: "center",
                }}
              >
                <p className="navp">Generate New Payment Link</p>
                <div
                  style={{
                    marginTop: "2%",
                    paddingTop: "0px",
                    borderTop: "2px solid black",
                    width: "130%",
                  }}
                ></div>
              </div>
              <div
                style={{
                  marginRight: "5%",
                  width: "50px",
                }}
              >
                {/* <CloseIcon
                  onClick={handleSecondClose}
                  style={{
                    color: "blue",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                /> */}
                <img
                  id="cross"
                  onClick={handleSecondClose}
                  src={CloseIcon}
                  alt=""
                />
              </div>
            </div>
            <div id="secondmainDiv">
              <div
                style={{
                  width: widthTotal > 600 ? "50%" : "90%",

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: widthTotal < 600 ? "100%" : "",
                  }}
                >
                  <InputLabel
                    style={{
                      fontFamily: "Sora",
                      fontStyle: "normal",
                      fontWeight: 600,
                      marginBottom: "5%",
                      fontSize: "16px",
                      lineHeight: "16px",
                    }}
                  >
                    Name
                  </InputLabel>
                  <OutlinedInput
                    placeholder="Enter The Name"
                    style={{
                      background: "#F4F4F4",

                      width: widthTotal > 600 ? "320px" : "100%",
                      color: "#2D3648",
                      fontFamily: "Inter",
                      fontStyle: "normal",

                      fontSize: "16px",
                    }}
                    onChange={(e) => {
                      handleChange(e.target);
                    }}
                    type="text"
                    name="name"
                    value={form.name}
                  />
                </div>
                <div
                  style={{
                    paddingTop: "20px",
                    width: widthTotal < 600 ? "100%" : "",
                  }}
                >
                  <InputLabel
                    style={{
                      fontFamily: "Sora",
                      fontStyle: "normal",
                      fontWeight: 600,
                      marginBottom: "5%",
                      fontSize: "16px",
                      lineHeight: "16px",
                    }}
                  >
                    Contact
                  </InputLabel>
                  <OutlinedInput
                    placeholder="Enter Contact Number"
                    style={{
                      background: "#F4F4F4",

                      width: widthTotal > 600 ? "320px" : "100%",
                      color: "black",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                    onChange={(e) => {
                      handleChange(e.target);
                    }}
                    type="number"
                    name="contact"
                    value={form.contact}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                        >
                          <CallOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </div>
                <div
                  style={{
                    paddingTop: "20px",
                    width: widthTotal < 600 ? "100%" : "",
                  }}
                >
                  <InputLabel
                    style={{
                      fontFamily: "Sora",
                      fontStyle: "normal",
                      fontWeight: 600,
                      marginBottom: "5%",
                      fontSize: "16px",
                      lineHeight: "16px",
                    }}
                  >
                    Email
                  </InputLabel>
                  <OutlinedInput
                    placeholder="Enter your email address"
                    style={{
                      background: "#F4F4F4",

                      width: widthTotal > 600 ? "320px" : "100%",
                      color: "black",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                    onChange={(e) => {
                      handleChange(e.target);
                    }}
                    type="text"
                    name="email"
                    value={form.email}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                        >
                          <EmailOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </div>
                {widthTotal > 600 ? (
                  <div
                    style={{
                      paddingTop: "20px",
                      flexDirection: "column",
                      display: "flex",
                      float: "right",

                      justifyContent: "right",
                    }}
                  >
                    <div id="createLink">
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        id="linkbtn"
                      >
                        Create Link
                      </Button>

                      <input
                        type="text"
                        style={{
                          color: loading ? "green" : "",
                        }}
                        value={
                          link.data
                            ? link.data
                            : loading
                            ? "Generating... Please Wait"
                            : "Generate Link"
                        }
                        id="linkInput"
                      />

                      <button id="linkCopy" onClick={copyLink}>
                        {!copied ? (
                          <ContentCopyIcon style={{ color: "white" }} />
                        ) : (
                          <CheckIcon style={{ color: "white" }} />
                        )}
                      </button>
                    </div>
                    {link.data ? (
                      <img
                        src={Frame}
                        style={{
                          height: "13px",
                          width: "43px",
                          marginTop: "1%",
                          marginLeft: "20px",
                        }}
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                style={{
                  width: widthTotal > 600 ? "50%" : "90%",
                  paddingTop: widthTotal < 600 ? "20px" : "",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ width: widthTotal < 600 ? "100%" : "" }}>
                  <InputLabel
                    style={{
                      fontFamily: "Sora",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "16px",
                    }}
                  >
                    Course
                  </InputLabel>
                  <select
                    name="course"
                    id="cars"
                    value={form.course}
                    onChange={(e) => {
                      handleChange(e.target);
                    }}
                    style={{
                      height: "48px",
                      background: "#F4F4F4",

                      width: widthTotal > 600 ? "320px" : "100%",
                      color: "black",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "16px",
                      marginTop: "5%",
                    }}
                  >
                    <option value="">Select Course</option>

                    <option value="Advance Foundation Course (AFC)">
                      Advance Foundation Course (AFC)
                    </option>
                    <option value="Foundation Online Course (KOL)">
                      Foundation Online Course (KOL)
                    </option>
                    <option value="AFC Offline">AFC Offline</option>
                    <option value="Sociology Optional Subject Online">
                      Sociology Optional Subject Online
                    </option>
                    <option value="PSIR Optional Subject Online">
                      PSIR Optional Subject Online
                    </option>
                    <option value="KSG Offline Classroom (other than Delhi)">
                      KSG Offline Classroom (other than Delhi)
                    </option>
                    <option value="Weekend Batch Offline Delhi">
                      Weekend Batch Offline Delhi
                    </option>
                    <option value="KSG Offline Classroom (Delhi center)">
                      KSG Offline Classroom (Delhi center)
                    </option>
                    <option value="PSIR Optional Subject Offline">
                      PSIR Optional Subject Offline
                    </option>
                    <option value="Sociology Optional Subject Offline">
                      Sociology Optional Subject Offline
                    </option>
                    <option value="Weekend Batch Online">
                      Weekend Batch Online
                    </option>
                    <option value="History Optional Subject">
                      History Optional Subject
                    </option>
                  </select>
                </div>
                <div
                  style={{
                    paddingTop: "30px",
                    width: widthTotal < 600 ? "100%" : "",
                  }}
                >
                  <InputLabel
                    style={{
                      fontFamily: "Sora",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "16px",
                    }}
                  >
                    Valid Duration
                  </InputLabel>
                  <select
                    onChange={(e) => {
                      handleChange(e.target);
                    }}
                    name="expire_by"
                    value={form.expire_by}
                    style={{
                      height: "48px",
                      background: "#F4F4F4",

                      width: widthTotal > 600 ? "320px" : "100%",
                      color: "black",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "16px",
                      marginTop: "5%",
                    }}
                  >
                    <option value="">Select Link Duration</option>
                    <option value="1hr">1 Hr</option>
                    <option value="6hr">6 Hr</option>
                    <option value="1day">1 Days</option>
                    <option value="2day">2 Days</option>
                    <option value="10day">10 Days</option>
                  </select>
                </div>
                <div
                  style={{
                    paddingTop: "25px",
                    width: widthTotal < 600 ? "100%" : "",
                  }}
                >
                  <InputLabel
                    style={{
                      fontFamily: "Sora",
                      fontStyle: "normal",
                      fontWeight: 600,
                      marginBottom: "5%",
                      fontSize: "16px",
                      lineHeight: "16px",
                    }}
                  >
                    Amount
                  </InputLabel>
                  <OutlinedInput
                    placeholder="Enter Amount"
                    style={{
                      background: "#F4F4F4",
                      border: "1px solid #73A0EC",
                      width: widthTotal > 600 ? "320px" : "100%",
                      color: "black",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "16px",
                      paddingLeft: "0px",
                      marginLeft: "0px",
                    }}
                    onChange={(e) => {
                      handleChange(e.target);
                    }}
                    type="text"
                    name="amount"
                    value={form.amount}
                    startAdornment={
                      <InputAdornment
                        position="start"
                        style={{
                          paddingLeft: "0px",
                          marginLeft: "0px",
                        }}
                      >
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          style={{
                            paddingLeft: "0px",
                            marginLeft: "0px",
                          }}
                        >
                          <CurrencyRupeeIcon
                            style={{
                              width: "50px",
                              height: "55px",
                              backgroundColor: "#73A0EC",
                              color: "white",
                              paddingLeft: "0px",
                              marginLeft: "0px",
                              border: "1px solid #73A0EC",
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </div>
                {widthTotal < 600 ? (
                  <div
                    style={{
                      paddingTop: "20px",
                      flexDirection: "column",
                      display: "flex",
                      float: "right",
                      width: widthTotal < 600 ? "100%" : "",
                      justifyContent: "right",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        float: "right",
                        paddingTop: "10px",

                        width: widthTotal > 600 ? "320px" : "100%",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        id="linkbtn"
                      >
                        Create Link
                      </Button>

                      <input
                        type="text"
                        value={link.data ? link.data : "Generate Link"}
                        id="linkInput"
                      />
                      <button
                        style={{
                          width: "70px",
                          height: "60px",
                          backgroundColor: "#73a0ec",
                          display: "flex",
                          justifyContent: "center",
                          cursor: "pointer",
                          border: "none",
                          alignItems: "center",
                        }}
                        onClick={copyLink}
                      >
                        {!copied ? (
                          <ContentCopyIcon style={{ color: "white" }} />
                        ) : (
                          <CheckIcon style={{ color: "white" }} />
                        )}
                      </button>
                    </div>
                    {link.data ? (
                      <img
                        src={Frame}
                        style={{
                          height: "13px",
                          width: "43px",
                          marginTop: "1%",
                          marginLeft: "20px",
                        }}
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
                {error && widthTotal < 600 ? (
                  <Alert
                    severity="error"
                    style={{
                      display: "flex",
                      marginTop: "20px",
                      width: "300px",
                      justifyContent: "center",
                    }}
                  >
                    Invalid Input! Try Again
                  </Alert>
                ) : (
                  ""
                )}
                <div
                  style={{
                    paddingTop: "20px",

                    width: widthTotal > 600 ? "320px" : "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{
                      height: "50px",
                      marginTop: widthTotal < 600 ? "10px" : "",
                      width: widthTotal > 600 ? "190px" : "100%",
                      backgroundColor: "#FFC846",
                      color: "black",
                      textTransform: "none",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 700,
                      fontSize: "18px",
                      lineHeight: "24px",
                    }}
                    onClick={handleNewClick}
                  >
                    Create New Link
                  </Button>
                  {widthTotal > 600 ? (
                    <div
                      style={{
                        position: "absolute",
                        bottom: -5,
                        right: 0,
                        zIndex: -1,
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      <img src={LinkImg} alt="." />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {error && widthTotal > 600 ? (
              <Alert
                severity="error"
                style={{
                  display: "flex",
                  width: "50%",
                  justifyContent: "center",
                }}
              >
                Invalid Input! Try Again
              </Alert>
            ) : (
              ""
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
