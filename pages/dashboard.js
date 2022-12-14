import { useMoralis, useWeb3Contract } from "react-moralis";
import { ABI, chainIdToAsset, contractAddress } from "../constants";
import { useState, useEffect } from "react";
import styles from "../styles/Dashboard.module.css";
import { chainIdToName, truncateStr } from "../utils";
import { useRouter } from "next/router";

export default function Dashboard() {
  // HOOKS
  const {
    isWeb3Enabled,
    enableWeb3,
    account,
    chainId: chainIdHex,
    Moralis,
  } = useMoralis();
  const [userSavingDetails, setUserSavingDetails] = useState();
  const [balance, setBalance] = useState();
  const [startTime, setStartTime] = useState();
  const [stopTime, setStopTime] = useState();
  const [status, setStatus] = useState();
  const [interest, setInterest] = useState();
  const [goal, setGoal] = useState();
  const [totalTimeSaved, setTotalTimeSaved] = useState();
  const [totalSavers, setTotalSavers] = useState();
  const [glmrPoolBalance, setGlmrPoolBalance] = useState();
  const [ftmPoolBalance, setFtmPoolBalance] = useState();
  const [timeStamp, setTimeStamp] = useState();
  const [saveAmount, setSaveAmount] = useState();
  const [savingTime, setSavingTime] = useState();
  const [userGoal, setUserGoal] = useState();

  // variables
  let chainId = parseInt(chainIdHex);
  const sdkEstimatedGasCostFromMoonbeam = "142000000000000000";
  const sdkEstimatedGasCostFromFantom = "390000000000000000";
  const router = useRouter();

  Moralis.onAccountChanged(() => {
    router.reload();
  });

  Moralis.onChainChanged(() => {
    router.reload();
  });

  // MORALIS
  const { runContractFunction: getUserSavingDetails } = useWeb3Contract({
    abi: ABI,
    contractAddress: contractAddress[chainId],
    functionName: "getUserSavingDetails",
    params: {
      _user: account,
    },
  });

  const { runContractFunction: getTotalTimeSaved } = useWeb3Contract({
    abi: ABI,
    contractAddress: contractAddress[chainId],
    functionName: "getTotalTimeSaved",
    params: {},
  });

  const { runContractFunction: getTotalSavers } = useWeb3Contract({
    abi: ABI,
    contractAddress: contractAddress[chainId],
    functionName: "getTotalSavers",
    params: {},
  });

  const { runContractFunction: getTotalCrossChainDefaultPoolBalance } =
    useWeb3Contract({
      abi: ABI,
      contractAddress: contractAddress[chainId],
      functionName: "getTotalCrossChainDefaultPoolBalance",
      params: {},
    });

  const { runContractFunction: getCurrenTimeStamp } = useWeb3Contract({
    abi: ABI,
    contractAddress: contractAddress[chainId],
    functionName: "getTotalCrossChainDefaultPoolBalance",
    params: {},
  });

  const { runContractFunction: getBlockTimeStamp } = useWeb3Contract({
    abi: ABI,
    contractAddress: contractAddress[chainId],
    functionName: "getBlockTimeStamp",
    params: {},
  });

  const { runContractFunction: save, error: saveError } = useWeb3Contract({
    abi: ABI,
    contractAddress: contractAddress[chainId],
    functionName: "save",
    params: {
      _savingTime: savingTime,
      _sdkEstimatedGasCostFromMoonbase: sdkEstimatedGasCostFromMoonbeam,
      _sdkEstimatedGasCostFromFantom: sdkEstimatedGasCostFromFantom,
      _goal: userGoal,
    },
    msgValue: saveAmount,
  });

  const { runContractFunction: unlockSavings, error: unlockError } =
    useWeb3Contract({
      abi: ABI,
      contractAddress: contractAddress[chainId],
      functionName: "unlockSavings",
      params: {
        _sdkEstimatedGasCostFromMoonbase: sdkEstimatedGasCostFromMoonbeam,
        _sdkEstimatedGasCostFromFantom: sdkEstimatedGasCostFromFantom,
      },
    });

  const { runContractFunction: withdrawSavings, error: withdrawError } =
    useWeb3Contract({
      abi: ABI,
      contractAddress: contractAddress[chainId],
      functionName: "withdrawSavings",
      params: {},
    });

  const { runContractFunction: defaultOnSave, error: defaultError } =
    useWeb3Contract({
      abi: ABI,
      contractAddress: contractAddress[chainId],
      functionName: "defaultOnSave",
      params: {
        _sdkEstimatedGasCostFromMoonbase: sdkEstimatedGasCostFromMoonbeam,
        _sdkEstimatedGasCostFromFantom: sdkEstimatedGasCostFromFantom,
      },
    });

  // MY FUNCTIONS

  async function updateUIValues() {
    const connectedUserSavingDetails = await getUserSavingDetails();
    const totalTimeSavedAcrossChains = await getTotalTimeSaved();
    const totalSaversAcrossChains = await getTotalSavers();
    const crossChainBalance = await getTotalCrossChainDefaultPoolBalance();
    const currentTimeStamp = await getBlockTimeStamp();
    setUserSavingDetails(connectedUserSavingDetails);
    setBalance(connectedUserSavingDetails[0].toString());
    setStartTime(connectedUserSavingDetails[1].toString());
    setStopTime(connectedUserSavingDetails[2].toString());
    setStatus(connectedUserSavingDetails[3].toString());
    setInterest(connectedUserSavingDetails[4].toString());
    setGoal(connectedUserSavingDetails[5]);
    setTotalTimeSaved(totalTimeSavedAcrossChains.toString());
    setTotalSavers(totalSaversAcrossChains.toString());

    setGlmrPoolBalance(crossChainBalance[0].toString());
    setFtmPoolBalance(crossChainBalance[1].toString());
    setTimeStamp(currentTimeStamp.toString());
  }

  // USEFEFCT
  useEffect(() => {
    if (isWeb3Enabled) {
      updateUIValues();
    } else {
      enableWeb3();
    }
  }, [isWeb3Enabled]);

  return (
    <div className={styles.container}>
      {isWeb3Enabled && (
        <>
          <div className={styles.welcomeBar}>
            Welcome{" "}
            <span
              style={{ color: "white", fontWeight: "bold", marginLeft: "3px" }}
            >
              {truncateStr(account, 13)}
            </span>
            You Are Connected To
            <span
              style={{ color: "white", fontWeight: "bold", marginLeft: "3px" }}
            >
              {chainIdToName[chainId]}
            </span>
          </div>

          <div className={styles.userDetailsConatiner}>
            <h2>
              <span
                style={{
                  color: "#EB5E28",
                  fontWeight: "400",
                  marginRight: "4px",
                }}
              >
                Goal:
              </span>
              {goal ? goal : "No goal sepcified"}
            </h2>

            <div className={styles.majorContainer}>
              {/* ONE */}
              <div className={styles.userDetailsBoxesContainer}>
                <h2 style={{ fontWeight: "700" }}>Cross Save Details</h2>

                <div className={styles.boxContainer1}>
                  <div>
                    <div>
                      <div className={styles.box}>
                        <h4>Total Time Saved</h4>
                        <p>
                          {totalTimeSaved ? (
                            <>
                              <span
                                style={{ fontSize: "20px", marginRight: "3px" }}
                              >
                                {(totalTimeSaved / 3600).toFixed(4)}
                              </span>
                              <span
                                style={{ color: "#EB5E28", fontWeight: "500" }}
                              >
                                hours
                              </span>
                            </>
                          ) : (
                            "Zeroo!"
                          )}
                        </p>
                      </div>
                      <div className={styles.box}>
                        <h4>Total Savers</h4>
                        <p>{totalSavers ? totalSavers : "Zerooo"}</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.longBox}>
                    <h4>Default Pool Balance</h4>
                    {glmrPoolBalance ? (
                      <p>
                        {(glmrPoolBalance / 10 ** 18).toFixed(4)}{" "}
                        <span style={{ color: "yellow" }}>GLMR</span>
                      </p>
                    ) : (
                      <p>Zero GLMR</p>
                    )}
                    {ftmPoolBalance ? (
                      <p>
                        {(ftmPoolBalance / 10 ** 18).toFixed(4)}{" "}
                        <span style={{ color: "blue" }}>FTM</span>
                      </p>
                    ) : (
                      <p>Zero FTM</p>
                    )}
                  </div>
                </div>
              </div>
              {/*  TWO*/}
              <div className={styles.userDetailsBoxesContainer}>
                <h2 style={{ fontWeight: "700" }}>User Saving Details</h2>

                <div className={styles.boxContainer1}>
                  <div>
                    <div>
                      <div
                        className={styles.box}
                        style={{ backgroundColor: "#403D39" }}
                      >
                        <h4 style={{ color: "#CCC5B9" }}>
                          Hours Left For Savings
                        </h4>
                        <p style={{ color: "white" }}>
                          {timeStamp && stopTime ? (
                            <>
                              <span
                                style={{ fontSize: "24px", marginRight: "3px" }}
                              >
                                {stopTime - timeStamp > 0
                                  ? stopTime - timeStamp
                                  : 0}
                              </span>
                              <span
                                style={{
                                  color: "#EB5E28",
                                  fontWeight: "500",
                                  fontSize: "20px",
                                }}
                              >
                                seconds
                              </span>
                            </>
                          ) : (
                            "Zeroo!"
                          )}
                        </p>
                      </div>
                      <div
                        className={styles.box}
                        style={{ backgroundColor: "#403D39" }}
                      >
                        <h4 style={{ color: "#CCC5B9" }}>Saving Status</h4>
                        <p style={{ color: "white" }}>
                          {status == 0 ? "Locked" : "Unlocked"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={styles.box}
                    style={{ backgroundColor: "#403D39" }}
                  >
                    <h4 style={{ color: "#CCC5B9" }}>Saving Balance</h4>
                    {balance ? (
                      <p style={{ color: "white" }}>
                        {(balance / 10 ** 18).toFixed(4)}{" "}
                        <span style={{ color: "#EB5E28" }}>
                          {chainIdToAsset[chainId]}
                        </span>
                      </p>
                    ) : (
                      <p>Zero {chainIdToName[chainId]}</p>
                    )}
                  </div>
                </div>
              </div>
              {/* THREE */}
              <div className={styles.userDetailsBoxesContainer}>
                <h2 style={{ fontWeight: "700" }}>Withdrawable</h2>

                <div className={styles.boxContainer1}>
                  <div>
                    <div>
                      <div className={styles.box}>
                        <h4>Interest Earned</h4>
                        <p>
                          {interest
                            ? (interest / 10 ** 18).toFixed(4)
                            : "Zerooo"}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* END */}
                </div>
              </div>{" "}
              {/*  */}
            </div>

            {/* SAVE SECTION */}
            <div className={styles.saveSection}>
              <div className={styles.saveWritingSection}>
                <h2>Save</h2>
                <p>
                  Start your savings journey or top up your savings or period of
                  savings from the chain of your choice and begin to earn from a
                  pool of defaulters accross different chains to withdraw your
                  savings with additional passive interest.
                </p>
                <p>
                  <b>Min saving amount: 0.0001 {chainIdToAsset[chainId]}</b>
                </p>
                <p>
                  <b>Min time: 300 seconds</b>
                </p>
                <div className={styles.inputContainer}>
                  <div>
                    <p>Amount</p>

                    <input
                      onChange={(e) => setSaveAmount(e.target.value * 10 ** 18)}
                    />
                  </div>

                  <div>
                    <p>Goal</p>
                    <input onChange={(e) => setUserGoal(e.target.value)} />
                  </div>

                  <div>
                    <p>Time</p>

                    <input onChange={(e) => setSavingTime(e.target.value)} />
                  </div>
                </div>
                <button onClick={save}>Save</button>
              </div>

              <div className={styles.illustrationSection}>
                <img src="/saveIllustration.png" />
              </div>
            </div>

            {/* UNLOCK AND WITHDRAW */}
            <div
              className={styles.saveSection}
              style={{ backgroundColor: "#fff" }}
            >
              <div className={styles.illustrationSection2}>
                <img src="/secondIllustration.png" />
              </div>

              <div className={styles.saveWritingSection}>
                <h2>Unlock/Withdraw Savings</h2>
                <p>
                  Withdraw all your savings balance and earn the interest from
                  the pool of defaulters across all supported chains.
                </p>
                <button onClick={withdrawSavings}>Withdraw</button>
                <button onClick={unlockSavings}>Unlock</button>
              </div>
            </div>

            {/* BREAK SAVE EARLY */}
            <div className={styles.saveSection}>
              <div className={styles.saveWritingSection}>
                <h2>Break Save Early</h2>
                <p>
                  NOTE: Breaking your save early attracts a 50% fee on your
                  total savings. This fee is to discourage users from breaking
                  their savings early. So be sure you know what you are doing
                  before breaking your savings to withdraw.
                </p>

                <button onClick={defaultOnSave}>Default On Save</button>
              </div>

              <div className={styles.illustrationSection}>
                <img src="/thirdIllustration.png" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
