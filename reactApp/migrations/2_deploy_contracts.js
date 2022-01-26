const getDNN = artifacts.require("getDNN");
const setDNN = artifacts.require("setDNN");
const DNN = artifacts.require("DNN");

async function customDeploy(deployer)
{
  await deployer.deploy(getDNN);
  await deployer.deploy(setDNN);
  await deployer.link(getDNN,DNN);
  await deployer.link(setDNN,DNN);
  await deployer.deploy(DNN);
}

module.exports = function(deployer) {
  deployer.then(async () => {
    await customDeploy(deployer);
});
  //Deploy Contract
};
