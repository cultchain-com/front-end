//vue

import { h } from "vue";
import { ElNotification } from "element-plus";
import axios from "axios";

//pinia

import { ethers } from "ethers";
import { acceptHMRUpdate, defineStore } from "pinia";

// ABI

import randomizedCommitteeArtifacts from "../ABI/RandomizedCommittee.json";
import charityEventsArtifacts from "../ABI/CharityEvent.json";
import fundraisingArtifacts from "../ABI/Fundraising.json";
import validatorArtifacts from "../ABI/Validator.json";

export const useCryptoStore = defineStore("user", () => {
  //state

  const account = ref("");
  const loading = ref(false);
  const isNetworkValid = ref(false);
  const charityEventsContract = ref(null);

  // abi

  const randomizedCommitteeABI = randomizedCommitteeArtifacts.abi;
  const charityEventsABI = charityEventsArtifacts.abi;
  const validatorABI = validatorArtifacts.abi;
  const fundraisingABI = fundraisingArtifacts.abi;

  //addresses

  const randomizedCommitteeAddress =
    "0x3d2c8Bc8A238b4a56977cee43144594311be4005";
  const charityEventsAddress = "0x2B1bc45C1B0eCb92813B17E2F304c10F15719d0E";
  const validatorAddress = "0x3d087a20898c9658CbA6C207022Dcc06b576881a";
  const fundraisingAddress = "0xB1DCAA8d45470D17dC78BD30F3EecAB99C3d7ACf";

  // ENUMS

  const baseURL = "https://cultchain.com/api/";

  const CommitteeType: { [key: string]: any } = {
    0: "Event",
    1: "Milestone",
    2: "Validator",
  };

  const EventCategory: { [key: string]: any } = {
    Health: 0,
    Education: 1,
    Environment: 2,
    DisasterRelief: 3,
    AnimalWelfare: 4,
    Others: 5,
  };

  const CategoryList: { [key: string]: any } = {
    0: "Health",
    1: "Education",
    2: "Environment",
    3: "DisasterRelief",
    4: "AnimalWelfare",
    5: "Others",
  };

  const EventMilestoneStatus: { [key: string]: any } = {
    0: "Pending",
    1: "Approved",
    2: "Rejected",
    3: "NotStartedYet",
  };

  let validators = [
    "0x13DC81736DdE2c2b788c7634610e549d5fd0C294",
    "0x056D87A67455C9E4400FE3945c739E5f50Ec7f1E",
    "0xD05f036B42e10771Ff35F184E4A4C68B9100C836",
    "0x3da2581ad70D98a45ebE7D3A51D821ddDe640432",
    "0xa25994d6F8404aFFD42Ae5918d9e2D704e06E20A",
  ];

  let validatorsPK = [
    "c894fb33b71ebe38a0cbd56aeebf7c6a801a0704d65859b85e6ea5a89a0d4fa2",
    "ac07f4474945693decef0d29529426ca742bc190575f114ff169c0157b8e2ebb",
    "f4b41c48318225af836ee52c036ea0b9dacf5a5e183883d118e9cb73be75bc52",
    "8eb2e13f92e850fb487aa6ff5aa786818d440395115ba91baf34e33d6722ac24",
    "bc0f5af46a233e092936e051fceaa8fd4a45aeeeb7eb516a4dd295622521248d",
  ];

  // functions

  async function checkNetwork() {
    const { ethereum } = await window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const network = await provider.getNetwork();
      console.log(network.chainId);

      if (network.chainId !== 80001) {
        isNetworkValid.value = false;
      } else {
        isNetworkValid.value = true;
      }
      console.log(isNetworkValid.value);
    }
  }

  async function switchNetwork() {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const network = await provider.getNetwork();
      console.log(network.chainId);
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x13881",
            rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            chainName: "Mumbai",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            blockExplorerUrls: ["https://mumbai.polygonscan.com"],
          },
        ],
      });

      checkNetwork();
    }
  }

  async function addValidator(validatorAddress: string) {
    try {
      setLoader(true);
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        //get user from metamask

        const myAccounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected: ", myAccounts[0]);
        account.value = myAccounts[0];

        // contract

        const randomizedCommitteeContract = new ethers.Contract(
          randomizedCommitteeAddress,
          randomizedCommitteeABI,
          signer
        );

        // call addValidator function

        const tx = await randomizedCommitteeContract
          .connect(account.value)
          .addValidator(validatorAddress);
        console.log(
          "Validator added successfully. Transaction hash:",
          tx.transactionHash
        );
      }
    } catch (error) {
      ElNotification({
        title: "Error",
        message: h("i", "error: " + error),
        type: "error",
      });
      console.error("Error adding validator:", error);
    }
    setLoader(false);
  }

  async function getValidatorRequestDetail(
    requestId: any,
    validatorContract: any
  ) {
    try {
      setLoader(true);
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        //get user from metamask

        const myAccounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected: ", myAccounts[0]);
        account.value = myAccounts[0];

        // call function
        const validatorRequestDetails =
          await validatorContract.ValidatorRequest(requestId);
        return validatorRequestDetails;
      }
    } catch (error) {
      ElNotification({
        title: "Error",
        message: h("i", "error: " + error),
        type: "error",
      });
      console.error("Error geting validator request details:", error);
      throw error;
    }
    setLoader(false);
  }

  async function getAllOngoingDecisions() {
    try {
      setLoader(true);
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        //get user from metamask

        const myAccounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected: ", myAccounts[0]);
        account.value = myAccounts[0];

        // contract

        const randomizedCommitteeContract = new ethers.Contract(
          randomizedCommitteeAddress,
          randomizedCommitteeABI,
          signer
        );
        const charityEventsContract = new ethers.Contract(
          charityEventsAddress,
          charityEventsABI,
          signer
        );

        // call addValidator function

        const ongoingDecisions =
          await randomizedCommitteeContract.getAllOngoingDecisions();
        const committeesDetail = await Promise.all(
          ongoingDecisions.map(async (committeeId: number) => {
            let committeeDetail = await randomizedCommitteeContract.committees(
              committeeId
            );

            // Remove redundant numbered properties

            let newArray = { ...committeeDetail };
            delete newArray[0];
            delete newArray[1];
            delete newArray[2];
            delete newArray[3];
            delete newArray[4];
            delete newArray[5];

            if (CommitteeType[newArray.committeeType] === "Event") {
              const { eventDetails } = await getEventDetail(
                newArray.committeeTypeId,
                charityEventsContract
              );
              newArray.proposalDetail = eventDetails;
            } else if (
              CommitteeType[committeeDetail.committeeType] === "Milestone"
            ) {
              const milestoneDetail = await getMilestoneDetail(
                committeeDetail.committeeTypeId,
                charityEventsContract
              );
              committeeDetail.proposalDetail = milestoneDetail;
            }

            newArray.committeeType = CommitteeType[newArray.committeeType];
            console.log("newArray", newArray);

            return newArray;
          })
        );
        console.log("Ongoing Decisions: ", committeesDetail);
        return committeesDetail;
      }
    } catch (error) {
      ElNotification({
        title: "Error",
        message: h("i", "error: " + error),
        type: "error",
      });
      console.error("Error adding validator:", error);
    }
    setLoader(false);
  }

  async function getAllPastDecisions() {
    try {
      setLoader(true);
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        //get user from metamask

        const myAccounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected: ", myAccounts[0]);
        account.value = myAccounts[0];

        // contract

        const randomizedCommitteeContract = new ethers.Contract(
          randomizedCommitteeAddress,
          randomizedCommitteeABI,
          signer
        );
        const charityEventsContract = new ethers.Contract(
          charityEventsAddress,
          charityEventsABI,
          signer
        );

        // call addValidator function

        const pastDecisions =
          await randomizedCommitteeContract.getAllPastDecisions();
        const committeesDetail = await Promise.all(
          pastDecisions.map(async (committeeId: number) => {
            let committeeDetail = await randomizedCommitteeContract.committees(
              committeeId
            );

            // Remove redundant numbered properties

            let newArray = { ...committeeDetail };
            delete newArray[0];
            delete newArray[1];
            delete newArray[2];
            delete newArray[3];
            delete newArray[4];
            delete newArray[5];

            if (CommitteeType[newArray.committeeType] === "Event") {
              const { eventDetails } = await getEventDetail(
                newArray.committeeTypeId,
                charityEventsContract
              );
              newArray.proposalDetail = eventDetails;
            } else if (
              CommitteeType[committeeDetail.committeeType] === "Milestone"
            ) {
              const milestoneDetail = await getMilestoneDetail(
                committeeDetail.committeeTypeId,
                charityEventsContract
              );
              committeeDetail.proposalDetail = milestoneDetail;
            }

            newArray.committeeType = CommitteeType[newArray.committeeType];
            console.log("newArray", newArray);

            return newArray;
          })
        );
        console.log("past Decisions: ", committeesDetail);
        return committeesDetail;
      }
    } catch (error) {
      ElNotification({
        title: "Error",
        message: h("i", "error: " + error),
        type: "error",
      });
      console.error("Error past Decisions:", error);
    }
    setLoader(false);
  }

  async function getUserOngoingDecisions(userAddress: string) {
    try {
      setLoader(true);
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        //get user from metamask

        const myAccounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected: ", myAccounts[0]);
        account.value = myAccounts[0];

        // contract

        const randomizedCommitteeContract = new ethers.Contract(
          randomizedCommitteeAddress,
          randomizedCommitteeABI,
          signer
        );
        const charityEventsContract = new ethers.Contract(
          charityEventsAddress,
          charityEventsABI,
          signer
        );

        // call addValidator function

        const ongoingDecisions =
          await randomizedCommitteeContract.getUserOngoingDecisions(
            userAddress
          );
        const committeesDetail = await Promise.all(
          ongoingDecisions.map(async (committeeId: number) => {
            let committeeDetail = await randomizedCommitteeContract.committees(
              committeeId
            );

            // Remove redundant numbered properties

            let newArray = { ...committeeDetail };
            delete newArray[0];
            delete newArray[1];
            delete newArray[2];
            delete newArray[3];
            delete newArray[4];
            delete newArray[5];

            if (CommitteeType[newArray.committeeType] === "Event") {
              const { eventDetails } = await getEventDetail(
                newArray.committeeTypeId,
                charityEventsContract
              );
              newArray.proposalDetail = eventDetails;
            } else if (
              CommitteeType[committeeDetail.committeeType] === "Milestone"
            ) {
              const milestoneDetail = await getMilestoneDetail(
                committeeDetail.committeeTypeId,
                charityEventsContract
              );
              committeeDetail.proposalDetail = milestoneDetail;
            }

            newArray.committeeType = CommitteeType[newArray.committeeType];
            console.log("newArray", newArray);

            return newArray;
          })
        );
        console.log(
          "Ongoing Decisions for Address",
          userAddress,
          ":",
          committeesDetail
        );
        return committeesDetail;
      }
    } catch (error) {
      ElNotification({
        title: "Error",
        message: h("i", "error: " + error),
        type: "error",
      });
      console.error("Error adding validator:", error);
    }
    setLoader(false);
  }

  async function getUserPastDecisions(userAddress: string) {
    let decisions;
    await axios
      .get(`${baseURL}indexer/wallets/${userAddress}/committees`)
      .then((res) => {
        console.log(res.data);
        decisions = res.data;
      })
      .catch((err) => {
        ElNotification({
          title: "Error",
          message: h("i", "error: " + err),
          type: "error",
        });
        console.log(err);
      });
    return decisions;
  }

  async function getEventDetail(eventId: number, contract: any) {
    let event;
    await axios
      .get(`${baseURL}indexer/events/${eventId}`)
      .then((res) => {
        console.log(res.data);
        event = res.data;
      })
      .catch((err) => {
        ElNotification({
          title: "Error",
          message: h("i", "error: " + err),
          type: "error",
        });
        console.log(err);
      });
    return event;
  }

  async function getMilestoneDetail(
    eventId: number,
    charityEventsContract: any
  ) {
    try {
      const milestoneDetails =
        await charityEventsContract.getMilestonesForEvent(eventId);

      return milestoneDetails;
    } catch (error) {
      ElNotification({
        title: "Error",
        message: h("i", "error: " + error),
        type: "error",
      });
      console.error("Error fetching milestone details:", error);
      throw error;
    }
  }

  async function assignValidatorRole(address: string) {
    try {
      setLoader(true);
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        //get user from metamask

        const myAccounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected: ", myAccounts[0]);
        account.value = myAccounts[0];

        // contract

        const randomizedCommitteeContract = new ethers.Contract(
          randomizedCommitteeAddress,
          randomizedCommitteeABI,
          signer
        );

        // call addValidator function
        const tx = await randomizedCommitteeContract
          .connect(account.value)
          .grantValidatorRole(address);
        console.log(
          "Validator Access Granted successfully. Transaction hash:",
          tx.transactionHash
        );
      }
    } catch (error) {
      ElNotification({
        title: "Error",
        message: h("i", "error: " + error),
        type: "error",
      });
      console.error("Error creating event:", error);
    }
    setLoader(false);
  }

  async function createEvent(
    tokenUri: string,
    eventName: string,
    eventDescription: string,
    targetAmount: any,
    endDate: any,
    categoryString: string
  ) {
    let eventId = null;
    try {
      setLoader(true);
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        //get user from metamask

        const myAccounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected: ", myAccounts[0]);
        account.value = myAccounts[0];

        // contract

        const charityEventsContract = new ethers.Contract(
          charityEventsAddress,
          charityEventsABI,
          signer
        );

        // call addValidator function
        const category = EventCategory[categoryString];
        if (category === undefined) {
          console.error("Invalid category:", categoryString);
          return;
        }
        // Send the transaction
        const gasLimit = 2000000;
        const etherValue = ethers.utils.parseEther(targetAmount.toString()); // Convert 1 ether to wei

        const transaction = {
          from: account.value,
          gasLimit: gasLimit,
        };
        console.log(etherValue.toString());

        const tx = await charityEventsContract.createEvent(
          tokenUri,
          eventName,
          eventDescription,
          etherValue.toString(),
          endDate,
          category,
          transaction
        );
        const eventList = await charityEventsContract.listAllEvents();

        console.log("Event created successfully. Transaction hash:", tx);
        eventId = +eventList[eventList.length - 1] + 1;
      }
    } catch (error) {
      ElNotification({
        title: "Error",
        message: h("i", "error: " + error),
        type: "error",
      });
      console.error("Error: ", error);
    }
    setLoader(false);
    return eventId;
  }

  async function donateToEvent(
    eventID: number,
    message: string,
    donationAmount: any
  ) {
    try {
      setLoader(true);
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        //get user from metamask

        const myAccounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const ownerAccount = myAccounts[0];
        const etherValue = ethers.utils.parseEther(donationAmount.toString()); // Convert 1 ether to wei

        // contract

        const fundraisingContract = new ethers.Contract(
          fundraisingAddress,
          fundraisingABI,
          signer
        );

        // call function
        console.log(+etherValue.toString());

        await fundraisingContract.donateToEvent(eventID, message, {
          value: etherValue.toString(),
          from: ownerAccount,
        });
        ElNotification({
          title: "Success",
          message: h("i", "Donation to the eventID " + eventID + " done!"),
          type: "success",
        });
        return 1;
      }
    } catch (error) {
      ElNotification({
        title: "Error",
        message: h("i", "error: " + error),
        type: "error",
      });
      console.log(error);

      return 0;
    }
    setLoader(false);
  }

  async function requestWithdraw(eventID: number) {
    try {
      setLoader(true);
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        //get user from metamask

        const myAccounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const ownerAccount = myAccounts[0];

        // contract

        const fundraisingContract = new ethers.Contract(
          fundraisingAddress,
          fundraisingABI,
          signer
        );
        const charityEventsContract = new ethers.Contract(
          charityEventsAddress,
          charityEventsABI,
          signer
        );
        const amount = await charityEventsContract.possibleMilestoneAmount(
          eventID
        );

        // call function

        await fundraisingContract.methods.requestWithdraw(eventID, amount, {
          from: ownerAccount,
        });
      }
    } catch (error) {
      ElNotification({
        title: "Error",
        message: h("i", "error: " + error),
        type: "error",
      });
      console.log("WIthdraw rejected:", error);
    }
    setLoader(false);
  }

  async function getEventDonationList(eventId: number) {
    let donors;
    await axios
      .get(`${baseURL}indexer/events/${eventId}/donors`)
      .then((res) => {
        console.log(res.data);
        donors = res.data;
      })
      .catch((err) => {
        ElNotification({
          title: "Error",
          message: h("i", "error: " + err),
          type: "error",
        });
        console.log(err);
      });
    return donors;
  }

  async function getDonorsLeaderboard() {
    let donorLeaderboard;
    await axios
      .get(`${baseURL}indexer/leaderboard/donors`)
      .then((res) => {
        console.log(res.data);
        donorLeaderboard = res.data;
      })
      .catch((err) => {
        ElNotification({
          title: "Error",
          message: h("i", "error: " + err),
          type: "error",
        });
        console.log(err);
      });
    return donorLeaderboard;
  }

  async function getValidatersLeaderboard() {
    let validaterLeaderboard;
    await axios
      .get(`${baseURL}indexer/leaderboard/validators`)
      .then((res) => {
        console.log(res.data);
        validaterLeaderboard = res.data;
      })
      .catch((err) => {
        ElNotification({
          title: "Error",
          message: h("i", "error: " + err),
          type: "error",
        });
        console.log(err);
      });
    return validaterLeaderboard;
  }

  async function getCreatorsLeaderboard() {
    let creatorsLeaderboard;
    await axios
      .get(`${baseURL}indexer/leaderboard/creators`)
      .then((res) => {
        console.log(res.data);
        creatorsLeaderboard = res.data;
      })
      .catch((err) => {
        ElNotification({
          title: "Error",
          message: h("i", "error: " + err),
          type: "error",
        });
        console.log(err);
      });
    return creatorsLeaderboard;
  }

  async function listAllEvents() {
    let eventList;
    await axios
      .get(`${baseURL}indexer/events/`)
      .then((res) => {
        console.log(res.data);
        eventList = res.data;
      })
      .catch((err) => {
        ElNotification({
          title: "Error",
          message: h("i", "error: " + err),
          type: "error",
        });
        console.log(err);
      });
    return eventList;
  }

  async function searchedEvents(searchSTR: string) {
    let eventList;
    await axios
      .get(`${baseURL}indexer/search/?query=${searchSTR}`)
      .then((res) => {
        console.log(res.data);
        eventList = res.data;
      })
      .catch((err) => {
        ElNotification({
          title: "Error",
          message: h("i", "error: " + err),
          type: "error",
        });
        console.log(err);
      });
    return eventList;
  }

  async function getCommitteeDecision(committeeId: any) {
    let decisions;
    await axios
      .get(`${baseURL}indexer/committees/${committeeId}`)
      .then((res) => {
        console.log(res.data);
        decisions = res.data;
      })
      .catch((err) => {
        ElNotification({
          title: "Error",
          message: h("i", "error: " + err),
          type: "error",
        });
        console.log(err);
      });
    return decisions;
  }

  async function getRecordDecision(
    committeeId: any,
    decision: boolean,
    feedback: string
  ) {
    try {
      setLoader(true);
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        //get user from metamask

        const myAccounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected: ", myAccounts[0]);
        account.value = myAccounts[0];

        // contract

        const randomizedCommitteeContract = new ethers.Contract(
          randomizedCommitteeAddress,
          randomizedCommitteeABI,
          signer
        );

        // call function

        const recordDecision = await randomizedCommitteeContract.recordDecision(
          committeeId,
          decision,
          feedback
        );
        ElNotification({
          title: "Success",
          message: h("i", "Record Decision done!"),
          type: "success",
        });

        console.log("Committee Decision Details:", recordDecision);
        return recordDecision;
      }
    } catch (error) {
      ElNotification({
        title: "Error",
        message: h("i", "error: " + error),
        type: "error",
      });
    }
    setLoader(false);
  }

  async function addMilestone(
    eventId: number,
    milestoneName: string,
    description: string,
    targetAmount: any,
    endDate: any
  ) {
    try {
      setLoader(true);
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        //get user from metamask

        const myAccounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected: ", myAccounts[0]);
        account.value = myAccounts[0];

        // contract

        const charityEventsContract = new ethers.Contract(
          charityEventsAddress,
          charityEventsABI,
          signer
        );

        // call function

        // Send the transaction
        const gasLimit = 2000000;
        const etherValue = ethers.utils.parseEther(targetAmount.toString()); // Convert 1 ether to wei

        const transaction = {
          from: account.value,
          gasLimit: gasLimit,
        };
        const tx = await charityEventsContract.addMilestone(
          eventId,
          milestoneName,
          description,
          etherValue.toString(),
          endDate,
          transaction
        );
        console.log(
          "Milestone added successfully. Transaction hash:",
          tx,
          tx.transactionHash
        );
      }
    } catch (error) {
      ElNotification({
        title: "Error",
        message: h("i", "error: " + error),
        type: "error",
      });
      console.error("Error add mile stone:", error);
    }
    setLoader(false);
  }

  async function connectWallet() {
    try {
      const { ethereum } = await window;
      if (!ethereum) {
        alert("Must connect to MetaMask!");
        return;
      }
      const myAccounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected: ", myAccounts[0]);
      account.value = myAccounts[0];
    } catch (error) {
      ElNotification({
        title: "Error",
        message: h("i", "error: " + error),
        type: "error",
      });
      console.log(error);
    }
  }

  function setLoader(value: boolean) {
    console.log("setloader", value);
    loading.value = value;
  }

  async function getDonorDonations(userAddress: string) {
    let donations;
    await axios
      .get(`${baseURL}indexer/wallets/${userAddress}/donations`)
      .then((res) => {
        console.log(res.data);
        donations = res.data;
      })
      .catch((err) => {
        ElNotification({
          title: "Error",
          message: h("i", "error: " + err),
          type: "error",
        });
        console.log(err);
      });
    return donations;
  }

  async function userCreatedEvents(userAddress: string) {
    let events;
    await axios
      .get(`${baseURL}indexer/wallets/${userAddress}/events`)
      .then((res) => {
        console.log(res.data);
        events = res.data;
      })
      .catch((err) => {
        ElNotification({
          title: "Error",
          message: h("i", "error: " + err),
          type: "error",
        });
        console.log(err);
      });
    return events;
  }

  async function userProfile(userAddress: string) {
    let profile;
    await axios
      .get(`${baseURL}indexer/wallets/${userAddress}`)
      .then((res) => {
        console.log("userProfile", res.data);
        profile = res.data;
      })
      .catch((err) => {
        ElNotification({
          title: "Error",
          message: h("i", "error: " + err),
          type: "error",
        });
        console.log(err);
      });
    return profile;
  }

  async function getFaq() {
    let faqList;
    await axios
      .get(`${baseURL}mics/faqs/`)
      .then((res) => {
        console.log(res.data, "faqList");
        faqList = res.data;
      })
      .catch((err) => {
        ElNotification({
          title: "Error",
          message: h("i", "error: " + err),
          type: "error",
        });
        console.log(err);
      });
    return faqList;
  }

  (async () => {
    if (process.client) {
      await checkNetwork();
      // await connectWallet();
    }
  })();

  return {
    account,
    isNetworkValid,
    loading,
    validators,
    CategoryList,
    CommitteeType,
    setLoader,
    connectWallet,
    getUserOngoingDecisions,
    listAllEvents,
    getCommitteeDecision,
    createEvent,
    addMilestone,
    getEventDetail,
    getEventDonationList,
    getDonorsLeaderboard,
    getCreatorsLeaderboard,
    getValidatersLeaderboard,
    donateToEvent,
    getDonorDonations,
    getAllOngoingDecisions,
    getAllPastDecisions,
    getUserPastDecisions,
    switchNetwork,
    getRecordDecision,
    userCreatedEvents,
    userProfile,
    searchedEvents,
    getFaq,
  };
});
