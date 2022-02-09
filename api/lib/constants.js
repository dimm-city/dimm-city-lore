exports.ErrorCodes = Object.freeze({
  credits: {
    key: "100",
    message: "Not on the presale list or out of credits",
  },
  cost: "200",
  supply: "400",
  too_many: "500",
  zero_address: "800",
  denied: "900",
  not_owner: "910",
  already_claimed: "920",
  withdraw_failed: "999",
});

exports.CharcaterStates = {
  Annihilated: -128,
  Unminted: -1,
  Unopened: 1,
  Alive: 10,
  Ethereal: 20,
  Lost: 127,
};

exports.ReleasePhases = {
  Disabled: 1,
  PreSaleRegistration: 2,
  PrivatePresale: 3,
  PublicPresale: 4,
  Released: 5,
  Closed: 6,
};
