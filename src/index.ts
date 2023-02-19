import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

interface IWalletConnector {
  type: "metamask" | "walletConnect" | "walletLink";
  supportedChainIds: number[];
}

const walletConnector = async ({
  type,
  supportedChainIds,
}: IWalletConnector) => {
  let connector: AbstractConnector | null = null;

  switch (type) {
    case "metamask":
      connector = new InjectedConnector({ supportedChainIds });
      break;
    case "walletConnect":
      connector = new WalletConnectConnector({ supportedChainIds });
      break;
    case "walletLink":
      connector = new WalletLinkConnector({
        url: "",
        appName: "",
        supportedChainIds,
      });
      break;
  }

  const provider = await connector?.getProvider();
  const account = await connector?.getAccount();
  const chainId = await connector?.getChainId();

  return { provider, account, chainId };
};

export default walletConnector;

(async () => {
  const { provider, account, chainId } = await walletConnector({
    type: "walletLink",
    supportedChainIds: [96],
  });
})();
