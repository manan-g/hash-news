import { useContext, useState, createContext, useEffect } from 'react';
import { loadWeb3 } from './Utils.js/web3Utils';
import DNN from './abis/DNN.json';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const StateProvider = ({ children }) => {
  const [Loading, setLoad] = useState(true);
  const [error, setError] = useState('');
  const [show, setShow] = useState(true);
  const [user, setUser] = useState('');
  const [address, setAddress] = useState(0);
  const [contract, setContract] = useState('');
  const [title, setTitle] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    let isCancelled = false;
    const init = async () => {
      try {
        if (!isCancelled) {
          let browserCompatibilty = await loadWeb3();
          console.log(browserCompatibilty);
          if (browserCompatibilty) {
            const web3 = window.web3;
            if (web3.eth) {
              const accounts = await web3.eth.getAccounts();
              const account = accounts[0];
              setAddress(account);
              const networkId = await web3.eth.net.getId();
              const networkData = DNN.networks[networkId];
              if (networkData) {
                setShow(false);
                try {
                  const _contract = new web3.eth.Contract(
                    DNN.abi,
                    networkData.address
                  );
                  setContract(_contract);

                  const _user = await _contract.methods.users(account).call();
                  window.ethereum.on('accountsChanged', function (accounts) {
                    window.location.reload();
                  });
                  if (_user.userId != 0) {
                    setUser(_user);
                  } else navigate('/signup');
                  setLoad(false);
                } catch (e) {
                  console.log(e);
                  setError('Contract not deployed');
                  setLoad(false);
                  navigate('/intro');
                }
              } else {
                setError(
                  'Block Chain Network Data not found! maybe wrong network is selected'
                );
                setLoad(false);
                navigate('/intro');
              }
            } else {
              setError(
                'User not Login to Metamask!, Login and Reload the Page'
              );
              setLoad(false);
              navigate('/intro');
            }
          } else {
            setError(
              'Browser is not Compatible. Consider installing Metamask Browser Extension'
            );
            setLoad(false);
            navigate('/intro');
          }
        }
      } catch (error) {
        if (!isCancelled) throw error;
      }
    };
    init();
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <UserContext.Provider
      value={[
        Loading,
        setLoad,
        error,
        setError,
        show,
        setShow,
        user,
        setUser,
        address,
        setAddress,
        contract,
        setContract,
        title,
        setTitle,
      ]}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useStateValue = () => useContext(UserContext);
