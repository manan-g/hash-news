import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import Loader from './Loader';
import UserSummary from './UserSummary';

export default function UserSummaryList() {
  const params = useParams();
  const _address = params.address;
  const [loading, setLoading] = useState(false);
  const [summaries, setSummaries] = useState([]);
  const [
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
  ] = useStateValue();

  useEffect(() => {
    if (contract && _address) {
      const runAsync = async () => {
        try {
          setLoading(true);
          const _summary = await contract.methods.getSummaries(_address).call();
          // console.log(_summary);
          setSummaries(_summary);
          setLoading(false);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      };
      runAsync();
    }
    return () => {};
  }, [contract, _address]);

  return (
    <div>
      <Loader loading={loading} />
      {summaries &&
        summaries.map((summary) => (
          <UserSummary key={summary.summaryId} summary={summary} />
        ))}
    </div>
  );
}
