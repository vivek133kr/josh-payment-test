import { createContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const DataContext = createContext({
 paymentJoshLogin: false,

  handleLoginSuccess: () => {},

});
export const DataContextProvider = ({ children }) => {

  let [paymentJoshLogin, setPaymentJoshLogin] = useState(false)

 
  let handleLoginSuccess = () =>{
    setPaymentJoshLogin(true)
  }
  return (
    <DataContext.Provider
      value={{
       paymentJoshLogin,
       handleLoginSuccess
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
