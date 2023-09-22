import HomeIcon from "@mui/icons-material/Home";
import "@fontsource/sora";
import JtColor from "../../Images/jt-logo-color.png";
export default function PayNavbar() {
  return (
    <nav
      style={{
        width: "100%",
        height: "87px",
        position: "fixed",
        backgroundColor: "#383D6E",
        display: "flex",

        alignItems: "center",
      }}
    >
      <img
        style={{
          width: "100.17px",
          marginLeft: "2%",
          height: "63.97px",
         
        }}
        src={JtColor}
        alt="."
      />

      <div
        style={{
        
          width: "20%",
          marginLeft: "1%",
          color: "white",
          justifyContent: "flex-start",
          display: "flex",
        }}
      >
        <p
          style={{
            fontFamily: "Sora",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "19.3103px",
            lineHeight: "100%",
          }}
        >
          Payments
        </p>
      </div>
      <div
        style={{
          display: "flex",
          width: "30%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      ></div>
    </nav>
  );
}
